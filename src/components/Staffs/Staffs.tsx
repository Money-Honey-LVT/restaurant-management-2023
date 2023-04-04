import { Button, Grid, Group, Modal, Stack, Text } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { randomArray } from '../../utils/helpers';
import StaffCard from './StaffCard';
import { useDisclosure } from '@mantine/hooks';
import { Staff } from '../../types/models/staff';
import { faker } from '@faker-js/faker';

const Staffs = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const [fake, setFake] = useState<Staff | null>(null);

  useEffect(() => {
    const fakeProduct: Staff = {
      name: faker.helpers.fake('{{name.firstName}} {{name.lastName}}'),
      imgSrc: faker.image.people(),
      salary: faker.datatype.number({ max: 50000000, min: 3000000, precision: 5000 }),
    };
    setFake(fakeProduct);
  }, []);

  return (
    <>
      <Stack>
        <Group position="apart">
          <Text fw={700} fz="xl">
            Quản lý nhân viên
          </Text>
          <Button leftIcon={<IconPlus />} onClick={open}>
            Thêm
          </Button>
        </Group>
        <Grid>
          {randomArray(5).map((_, index) => (
            <Grid.Col key={`product-card-${index}`} span={4}>
              <StaffCard item={fake} />
            </Grid.Col>
          ))}
        </Grid>
      </Stack>
      <Modal centered opened={opened} onClose={close} title="Thêm Nhân Viên"></Modal>
    </>
  );
};

export default Staffs;
