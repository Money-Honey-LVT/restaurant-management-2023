import { DataTable } from 'mantine-datatable';
import { DataTableColumn } from 'mantine-datatable/dist/types';

import { Group, Modal, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Order } from '../../types/models/order';

const Orders = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const columns: DataTableColumn<Order>[] = [
    { accessor: 'id', title: 'Mã Đơn' },
    { accessor: 'customerId', title: 'Tên Khách Hàng' },
    { accessor: 'staffId', title: 'Nhân Viên Xác Nhận' },
    { accessor: 'status', title: 'Trạng Thái' },
    { accessor: 'isVoucher', title: 'Mã Giảm Giá' },
  ];

  return (
    <>
      <Stack>
        <Group position="apart">
          <Text fw={700} fz="xl">
            Danh sách đơn
          </Text>
        </Group>
        <DataTable minHeight={200} withBorder withColumnBorders striped highlightOnHover columns={columns} records={[]} />
      </Stack>
      <Modal centered opened={opened} onClose={close} title="Lên Đơn"></Modal>
    </>
  );
};

export default Orders;
