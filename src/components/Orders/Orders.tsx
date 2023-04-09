import { DataTable } from 'mantine-datatable';
import { DataTableColumn } from 'mantine-datatable/dist/types';

import { Button, Group, Modal, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Order } from '../../types/models/order';
import { IconPlus } from '@tabler/icons-react';
import AddOrderModal from './AddOrderModal';

const Orders = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const columns: DataTableColumn<Order>[] = [
    { accessor: 'id', title: 'Mã Đơn' },
    { accessor: 'customerId', title: 'Tên Khách Hàng' },
    { accessor: 'staffId', title: 'Nhân Viên Xác Nhận' },
    { accessor: 'status', title: 'Trạng Thái' },
    { accessor: 'isVoucher', title: 'Mã Giảm Giá' },
    { accessor: 'orderTables', title: 'Danh Sách Bàn Đặt' },
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
          minHeight={200}
          withBorder
          withColumnBorders
          striped
          highlightOnHover
          columns={columns}
          records={[]}
        />
      </Stack>
      <Modal zIndex={100} centered opened={opened} onClose={close} title="Thêm Đơn Hàng Mới">
        <AddOrderModal close={close} />
      </Modal>
    </>
  );
};

export default Orders;
