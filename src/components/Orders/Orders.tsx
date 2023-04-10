import { ActionIcon, Badge, Box, Button, Group, Modal, Stack, Text, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { IconCheck, IconInfoCircle, IconPlus, IconTrash } from '@tabler/icons-react';
import { DataTable } from 'mantine-datatable';
import { DataTableColumn } from 'mantine-datatable/dist/types';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { orderActions } from '../../reducers/order/order.action';
import { RootState } from '../../redux/reducer';
import { Order, OrderStatus } from '../../types/models/order';
import AddOrderModal from './AddOrderModal';
import AddFoodToOrderModal from './AddFoodToOrderModal/AddFoodToOrderModal';
import { useState } from 'react';
import OrderFoodDetailModal from './OrderFoodDetailModal/OrderFoodDetailModal';

const Orders = () => {
  const dispatch = useAppDispatch();
  const [opened, { open, close }] = useDisclosure(false);
  const [openedAddFoodToOrder, { open: openAddFoodToOrder, close: closeAddFoodToOrder }] = useDisclosure(false);
  const [openedOrderFoodDetail, { open: openOrderFoodDetail, close: closeOrderFoodDetail }] = useDisclosure(false);
  const { isFetching, orders } = useSelector((state: RootState) => state.order);
  const [selectedOrderId, setSelectedOrderId] = useState(0);

  const columns: DataTableColumn<Order>[] = [
    { accessor: 'id', title: 'Mã Đơn' },
    { accessor: 'customerName', title: 'Tên Khách Hàng' },
    { accessor: 'staffName', title: 'Nhân Viên Xác Nhận' },
    { accessor: 'status', title: 'Trạng Thái' },
    {
      accessor: 'orderTables',
      title: 'Danh Sách Bàn Đặt',
      width: 200,
      render: (record) => {
        return (
          <Group>
            {record.orderTables.map((table, index) => (
              <Badge key={`order-${record.id}-table-${index}`}>{table.name}</Badge>
            ))}
          </Group>
        );
      },
    },
    {
      accessor: 'actions',
      title: <Text mr="xs">Hành động</Text>,
      render: (record) => {
        if (record.status === OrderStatus.cancelled) return <Box h={28} />;
        return (
          <Group spacing={0} position="left" noWrap>
            <Tooltip label="Xem chi tiết">
              <ActionIcon
                color="orange"
                onClick={() => {
                  openOrderFoodDetail();
                  setSelectedOrderId(record.id);
                }}
              >
                <IconInfoCircle size={16} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Thêm món">
              <ActionIcon
                color="blue"
                onClick={() => {
                  setSelectedOrderId(record.id);
                  openAddFoodToOrder();
                }}
              >
                <IconPlus size={16} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Thanh toán">
              <ActionIcon color="green" onClick={() => {}}>
                <IconCheck size={16} />
              </ActionIcon>
            </Tooltip>
            <ActionIcon
              color="red"
              onClick={() =>
                modals.openConfirmModal({
                  title: 'Xác Nhận Xoá Món Ăn',
                  centered: true,
                  children: <Text size="sm">Bạn có chắc muốn xoá đơn hàng này không?</Text>,
                  labels: { confirm: 'Đồng ý', cancel: 'Huỷ bỏ' },
                  confirmProps: { color: 'red' },
                  onCancel: () => {},
                  onConfirm: () => {
                    dispatch(
                      orderActions.cancelOrder(record.id, {
                        onSuccess: () => dispatch(orderActions.getAllOrders()),
                      })
                    );
                  },
                })
              }
            >
              <IconTrash size={16} />
            </ActionIcon>
          </Group>
        );
      },
    },
  ];

  return (
    <>
      <Stack>
        <Group position="apart">
          <Text fw={700} fz="xl">
            Danh sách đơn
          </Text>
          <Button leftIcon={<IconPlus />} onClick={open}>
            Thêm đơn hàng
          </Button>
        </Group>
        <DataTable
          minHeight={110}
          withBorder
          withColumnBorders
          striped
          highlightOnHover
          columns={columns}
          records={orders}
        />
      </Stack>
      <Modal zIndex={100} centered opened={opened} onClose={close} title="Thêm Đơn Hàng Mới">
        <AddOrderModal close={close} />
      </Modal>
      <Modal
        size="xl"
        zIndex={100}
        centered
        opened={openedAddFoodToOrder}
        onClose={closeAddFoodToOrder}
        title="Gọi Món"
      >
        <AddFoodToOrderModal selectedOrderId={selectedOrderId} close={closeAddFoodToOrder} />
      </Modal>
      <Modal
        size="lg"
        zIndex={100}
        centered
        opened={openedOrderFoodDetail}
        onClose={closeOrderFoodDetail}
        title="Danh Sách Đồ Ăn Trong Đơn Hàng"
      >
        <OrderFoodDetailModal selectedOrderId={selectedOrderId} />
      </Modal>
    </>
  );
};

export default Orders;
