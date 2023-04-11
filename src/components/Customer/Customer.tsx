import { Group, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { DataTable } from 'mantine-datatable';
import { DataTableColumn } from 'mantine-datatable/dist/types';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducer';
import { Customer } from '../../types/models/customer';
import { useEffect, useState } from 'react';

const PAGE_SIZE = 15;

const Customers = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { customers, isFetching } = useSelector((state: RootState) => state.customer);

  const [page, setPage] = useState(1);
  const [records, setRecords] = useState(customers.slice(0, PAGE_SIZE));

  useEffect(() => {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    setRecords(customers.slice(from, to));
  }, [page, customers]);

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
          records={records}
          totalRecords={customers.length}
          recordsPerPage={PAGE_SIZE}
          page={page}
          onPageChange={(p) => setPage(p)}
        />
      </Stack>
    </>
  );
};

export default Customers;
