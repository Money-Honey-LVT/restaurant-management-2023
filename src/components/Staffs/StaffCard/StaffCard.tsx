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
  Stack,
  Modal,
} from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconDots, IconEdit, IconTrash } from '@tabler/icons-react';
import React from 'react';
import { Staff } from '../../../types/models/staff';
import {
  formatCurrency,
  formatDateFromISOString,
  getColorByRole,
} from '../../../utils/helpers';
import EditStaffModal from '../EditStaffModal/EditStaffModal';
import { useDisclosure } from '@mantine/hooks';

interface Props {
  staff: Staff | null;
}

const renderLabel = (string: string) => (
  <Text fz="md" fw={600}>
    {string}
  </Text>
);

const renderField = (children: string) => <Text fz="md">{children}</Text>;

const StaffCard: React.FC<Props> = ({ staff }) => {
  const [editOpened, { close: closeEditModal, open: openEditModal }] =
    useDisclosure();

  const handleClickDeleteStaff = () =>
    modals.openConfirmModal({
      title: `Xác nhận xoá nhân viên`,
      centered: true,
      children: <Text c={'red'}>Xác nhận xoá nhân viên {staff?.fullName}</Text>,
      labels: { confirm: 'Đồng ý', cancel: 'Huỷ bỏ' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => console.log('Xoa nhan vien', staff?.id),
    });

  return (
    <>
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
                <Menu.Item
                  icon={<IconEdit size={rem(14)} />}
                  onClick={openEditModal}
                >
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
          <Avatar src={staff?.imgSrc || ''} size={150} />

          <Grid m="xs" gutter={32} style={{ flex: '1' }}>
            <Grid.Col span={5}>
              <Stack spacing={'sm'}>
                {renderLabel('Họ tên')}
                {renderLabel('Chức vụ')}
                {renderLabel('Ngày vào làm')}
                {renderLabel('Lương')}
              </Stack>
            </Grid.Col>

            <Grid.Col span={7} px={0}>
              <Stack spacing={'sm'}>
                {renderField(staff?.fullName || '')}
                {renderField(staff?.role || '')}
                {renderField(formatDateFromISOString(staff?.hiredDate))}
                {renderField(formatCurrency(staff?.salary))}
              </Stack>
            </Grid.Col>
          </Grid>
        </Group>
      </Card>

      {staff ? (
        <Modal
          centered
          opened={editOpened}
          onClose={closeEditModal}
          title="Sửa Thông Tin Nhân Viên"
        >
          <EditStaffModal close={closeEditModal} staff={staff} />
        </Modal>
      ) : (
        ''
      )}
    </>
  );
};

export default StaffCard;
