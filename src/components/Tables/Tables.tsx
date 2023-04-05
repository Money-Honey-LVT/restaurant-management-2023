import { useDisclosure } from '@mantine/hooks';
import React, { useEffect, useState } from 'react';
import { Table, TableStatus } from '../../types/models/table';
import { faker } from '@faker-js/faker';
import { Button, Grid, Group, Modal, Stack, Text } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { randomArray } from '../../utils/helpers';
import TableCard from './TableCard/TableCard';

const Tables = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const [fake, setFake] = useState<Table | null>(null);

  useEffect(() => {
    const fakeTable: Table = {
      name: faker.commerce.productName(),
      capacity: faker.datatype.number({ min: 2, max: 12, precision: 1 }),
      status: TableStatus.booked,
    };
    setFake(fakeTable);
  }, []);

  return (
    <>
      <Stack>
        <Group position="apart">
          <Text fw={700} fz="xl">
            Danh sách bàn
          </Text>
          <Button leftIcon={<IconPlus />} onClick={open}>
            Thêm
          </Button>
        </Group>
        <Grid>
          {randomArray(5).map((_, index) => (
            <Grid.Col key={`food-card-${index}`} span={4}>
              <TableCard item={fake} />
            </Grid.Col>
          ))}
        </Grid>
      </Stack>
      <Modal centered opened={opened} onClose={close} title="Thêm Bàn"></Modal>
    </>
  );
};

export default Tables;
