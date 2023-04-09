import { DataTable } from 'mantine-datatable';
import { DataTableColumn } from 'mantine-datatable/dist/types';
import { ActionIcon, Badge, Button, Group, Modal, Stack, Text, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Order, OrderStatus } from '../../types/models/order';
import { IconCheck, IconEdit, IconPlus, IconTrash } from '@tabler/icons-react';
import AddOrderModal from './AddOrderModal';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducer';
import { IconEye } from '@tabler/icons-react';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { orderActions } from '../../reducers/order/order.action';

const Orders = () => {
  const dispatch = useAppDispatch();
  const [opened, { open, close }] = useDisclosure(false);
  const { isFetching, orders } = useSelector((state: RootState) => state.order);

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
        return (
          <Group spacing={0} position="left" noWrap>
            <Tooltip label="Thêm món">
              <ActionIcon color="blue" onClick={() => {}}>
                <IconPlus size={16} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Thanh toán">
              <ActionIcon color="green" onClick={() => {}}>
                <IconCheck size={16} />
              </ActionIcon>
            </Tooltip>

            {record.status !== OrderStatus.cancelled ? (
              <ActionIcon
                color="red"
                onClick={() =>
                  dispatch(
                    orderActions.cancelOrder(record.id, {
                      onSuccess: () => dispatch(orderActions.getAllOrders()),
                    })
                  )
                }
              >
                <IconTrash size={16} />
              </ActionIcon>
            ) : null}
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
    </>
  );
};

export default Orders;
