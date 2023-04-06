import { Button, Grid, Group, Modal, Stack, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { randomArray } from "../../utils/helpers";
import StaffCard from "./StaffCard";
import { useDisclosure } from "@mantine/hooks";
import { Staff } from "../../types/models/staff";
import { faker } from "@faker-js/faker";
import { StaffRole } from "../../types/models/staff";
import AddStaffModal from "./AddStaffModal/AddStaffModal";

const Staffs = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const [fake, setFake] = useState<Staff | null>(null);

  useEffect(() => {
    const fakeFood: Staff = {
      fullName: faker.helpers.fake("{{name.firstName}} {{name.lastName}}"),
      role: StaffRole.EMPLOYEE,
      imgSrc: faker.image.people(),
      salary: faker.datatype.number({
        max: 50000000,
        min: 3000000,
        precision: 5000,
      }),
      hiredDate: "2020-01-01T00:00:00.000Z",
    };
    setFake(fakeFood);
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
            <Grid.Col key={`food-card-${index}`} span={6}>
              <StaffCard staff={fake} />
            </Grid.Col>
          ))}
        </Grid>
      </Stack>
      <Modal centered opened={opened} onClose={close} title="Thêm Nhân Viên">
        <AddStaffModal close={close} />
      </Modal>
    </>
  );
};

export default Staffs;
