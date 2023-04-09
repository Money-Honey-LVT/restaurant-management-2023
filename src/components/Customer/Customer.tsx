import { Button, Group, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import { DataTable } from 'mantine-datatable';
import { DataTableColumn } from 'mantine-datatable/dist/types';
import { Customer } from '../../types/models/customer';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducer';

const Customers = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { customers, isFetching } = useSelector((state: RootState) => state.customer);

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
          minHeight={110}
          withBorder
          withColumnBorders
          striped
          highlightOnHover
          columns={columns}
          records={customers}
        />
      </Stack>
    </>
  );
};

export default Customers;
