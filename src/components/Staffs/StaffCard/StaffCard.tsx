import {
  ActionIcon,
  Avatar,
  Badge,
  Card,
  Container,
  Grid,
  Group,
  Menu,
  Text,
  rem,
  Space,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconDots, IconEdit, IconTrash } from "@tabler/icons-react";
import React from "react";
import { Staff } from "../../../types/models/staff";
import {
  formatCurrency,
  formatDateFromISOString,
  getColorByRole,
} from "../../../utils/helpers";

interface Props {
  staff: Staff | null;
}

const StaffCard: React.FC<Props> = ({ staff }) => {
  const handleClickDeleteStaff = () =>
    modals.openConfirmModal({
      title: `Xác nhận xoá nhân viên`,
      centered: true,
      children: <Text c={"red"}>Xác nhận xoá nhân viên {staff?.fullName}</Text>,
      labels: { confirm: "Đồng ý", cancel: "Huỷ bỏ" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => console.log("Xoa nhan vien", staff?.id),
    });

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section withBorder inheritPadding py="xs">
        <Group position="apart">
          <Text weight={500}>{staff?.fullName}</Text>
          <Menu withinPortal position="bottom-end" shadow="sm">
            <Menu.Target>
              <ActionIcon>
                <IconDots size="1rem" />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item icon={<IconEdit size={rem(14)} />}>
                Sửa thông tin
              </Menu.Item>
              <Menu.Item
                icon={<IconTrash size={rem(14)} />}
                color="red"
                onClick={handleClickDeleteStaff}
              >
                Xoá nhân viên
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Card.Section>

      <Group mt="md" mb="xs">
        <Avatar src={staff?.imgSrc || ""} size={150} />

        <Container px={0} ml={15} style={{ flex: 1 }}>
          <Grid style={{ width: "100%" }}>
            <Grid.Col span={4} c={"blue"} fw={"bold"}>
              <Text>Họ tên</Text>
              <Space h="sm" />
              <Text>Chức vụ</Text>
              <Space h="sm" />
              <Text>Ngày làm việc</Text>
              <Space h="sm" />
              <Text>Lương</Text>
              <Space h="sm" />
            </Grid.Col>
            <Grid.Col span={8}>
              <Text>{staff?.fullName}</Text>
              <Space h="sm" />
              {/* <Text>{staff?.role}</Text> */}
              <Badge
                color={getColorByRole(staff?.role)}
                size="lg"
                variant="light"
              >
                {staff?.role}
              </Badge>
              <Space h="sm" />
              <Text>{formatDateFromISOString(staff?.hiredDate)}</Text>
              <Space h="sm" />
              <Text> {formatCurrency(staff?.salary)}</Text>
              <Space h="sm" />
            </Grid.Col>
          </Grid>
        </Container>
      </Group>
    </Card>
  );
};

export default StaffCard;
