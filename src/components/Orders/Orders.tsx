import { DataTable } from 'mantine-datatable';
import { DataTableColumn } from 'mantine-datatable/dist/types';
import { Badge, Button, Group, Modal, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Order } from '../../types/models/order';
import { IconPlus } from '@tabler/icons-react';
import AddOrderModal from './AddOrderModal';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducer';

const Orders = () => {
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
        console.log(record);
        return (
          <Group>
            {record.orderTables.map((table) => (
              <Badge>{table.name}</Badge>
            ))}
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
