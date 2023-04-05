import React from 'react';
import { Table } from '../../../types/models/table';
import { modals } from '@mantine/modals';
import { ActionIcon, Badge, Button, Card, Group, Menu, Text, rem } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconDots, IconEdit, IconTrash } from '@tabler/icons-react';

interface Props {
  item: Table | null;
}

const TableCard: React.FC<Props> = ({ item }) => {
  const openDeleteTableModal = () =>
    modals.openConfirmModal({
      title: 'Xác Nhận Xoá Bàn',
      centered: true,
      children: (
        <Text size="sm">
          Bạn có chắc muốn xoá bàn{' '}
          <Text color="blue.9" span inherit>
            {item?.name}
          </Text>{' '}
          không?
        </Text>
      ),
      labels: { confirm: 'Đồng ý', cancel: 'Huỷ bỏ' },
      confirmProps: { color: 'red' },
      onCancel: () => {},
      onConfirm: () =>
        notifications.show({
          withCloseButton: true,
          title: 'Thông báo',
          message: 'Bạn đã xoá bàn thành công!',
          color: 'green',
          icon: <IconCheck size={16} />,
          autoClose: 1200,
        }),
    });

  const openEditTableModal = () =>
    modals.openConfirmModal({
      title: 'Sửa Thông Tin Bàn',
      centered: true,
      children: <Text size="sm"></Text>,
      labels: { confirm: 'Đồng ý', cancel: 'Huỷ bỏ' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => console.log('Confirmed'),
    });

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section withBorder inheritPadding py="xs">
        <Group position="apart">
          <Text weight={500}>Bàn {item?.name}</Text>
          <Menu withinPortal position="bottom-end" shadow="sm">
            <Menu.Target>
              <ActionIcon>
                <IconDots size="1rem" />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item onClick={openEditTableModal} icon={<IconEdit size={rem(14)} />}>
                Sửa thông tin
              </Menu.Item>
              <Menu.Item onClick={openDeleteTableModal} icon={<IconTrash size={rem(14)} />} color="red">
                Xoá bàn
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text>{item?.capacity} chỗ ngồi</Text>
        <Badge color="pink" size="lg" variant="light">
          {item?.status?.toUpperCase()}
        </Badge>
      </Group>
    </Card>
  );
};

export default TableCard;
