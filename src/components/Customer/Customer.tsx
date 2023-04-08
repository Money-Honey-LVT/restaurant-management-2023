import { Button, Group, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import { DataTable } from 'mantine-datatable';
import { DataTableColumn } from 'mantine-datatable/dist/types';
import { Customer } from '../../types/models/customer';

const Customers = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const columns: DataTableColumn<Customer>[] = [
    { accessor: 'id', title: 'Mã Khách Hàng' },
    { accessor: 'name', title: 'Tên Khách Hàng' },
    { accessor: 'phone', title: 'Số Điện Thoại' },
    { accessor: 'address', title: 'Địa Chỉ' },
  ];

  return (
    <>
      <Stack>
        <Group position="apart">
          <Text fw={700} fz="xl">
            Danh sách khách hàng
          </Text>
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
    </>
  );
};

export default Customers;
