import { ActionIcon, Badge, Box, Button, Group, Modal, Stack, Text, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { IconCheck, IconInfoCircle, IconPlus, IconTrash } from '@tabler/icons-react';
import { DataTable } from 'mantine-datatable';
import { DataTableColumn } from 'mantine-datatable/dist/types';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { orderActions } from '../../reducers/order/order.action';
import { RootState } from '../../redux/reducer';
import { Order, OrderStatus } from '../../types/models/order';
import AddFoodToOrderModal from './AddFoodToOrderModal/AddFoodToOrderModal';
import AddOrderModal from './AddOrderModal';
import OrderFoodDetailModal from './OrderFoodDetailModal/OrderFoodDetailModal';
import PaymentModal from './PaymentModal/PaymentModal';

const PAGE_SIZE = 10;

const Orders = () => {
  const dispatch = useAppDispatch();
  const [opened, { open, close }] = useDisclosure(false);
  const [openedAddFoodToOrder, { open: openAddFoodToOrder, close: closeAddFoodToOrder }] = useDisclosure(false);
  const [openedOrderFoodDetail, { open: openOrderFoodDetail, close: closeOrderFoodDetail }] = useDisclosure(false);
  const [openedPayment, { open: openPayment, close: closePayment }] = useDisclosure(false);
  const { isFetching, orders } = useSelector((state: RootState) => state.order);
  const [selectedOrderId, setSelectedOrderId] = useState(0);

  const [page, setPage] = useState(1);
  const [records, setRecords] = useState(orders.slice(0, PAGE_SIZE));

  useEffect(() => {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    setRecords(orders.slice(from, to));
  }, [page, orders]);

  const columns: DataTableColumn<Order>[] = [
    {
      accessor: 'index',
      title: '#',
      textAlignment: 'center',
      render: (record) => records.indexOf(record) + 1,
    },
    { accessor: 'id', title: 'Mã Đơn', textAlignment: 'right', titleStyle: { textAlign: 'center' } },
    { accessor: 'customerName', title: 'Tên Khách Hàng' },
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
      accessor: 'voucher',
      title: 'Voucher (%)',
      render: (record) => {
        return <Group>{record.vouchers[0]?.value || ''}</Group>;
      },
    },
    { accessor: 'staffName', title: 'Nhân Viên Xác Nhận' },
    { accessor: 'status', title: 'Trạng Thái' },
    {
      accessor: 'actions',
      title: <Text mr="xs">Hành động</Text>,
      render: (record) => {
        if (record.status !== OrderStatus.pending)
          return (
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
          );
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
              <ActionIcon
                color="green"
                onClick={() => {
                  setSelectedOrderId(record.id);
                  openPayment();
                }}
              >
                <IconCheck size={16} />
              </ActionIcon>
            </Tooltip>
            <ActionIcon
              color="red"
              onClick={() =>
                modals.openConfirmModal({
                  title: 'Xác Nhận Xoá Đơn Hàng',
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
          records={records}
          totalRecords={orders.length}
          recordsPerPage={PAGE_SIZE}
          page={page}
          onPageChange={(p) => setPage(p)}
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
        size="xl"
        zIndex={100}
        centered
        opened={openedOrderFoodDetail}
        onClose={closeOrderFoodDetail}
        title="Chi Tiết Đơn Hàng"
      >
        <OrderFoodDetailModal selectedOrderId={selectedOrderId} />
      </Modal>

      <Modal size="xl" zIndex={100} centered opened={openedPayment} onClose={closePayment} title="Thanh Toán">
        <PaymentModal close={closePayment} selectedOrderId={selectedOrderId} />
      </Modal>
    </>
  );
};

export default Orders;
