import { ActionIcon, Badge, Card, Group, Menu, Modal, Text, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconDots, IconEdit, IconTrash } from '@tabler/icons-react';
import React from 'react';
import { Table } from '../../../types/models/table';
import { TableDict } from '../../../utils/models/table';
import EditTableModal from '../EditTableModal';

interface Props {
  item: Table | null;
}

const TableCard: React.FC<Props> = ({ item }) => {
  const [editOpened, { close: closeEditModal, open: openEditModal }] = useDisclosure();

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

  return (
    <>
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
                <Menu.Item onClick={openEditModal} icon={<IconEdit size={rem(14)} />}>
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
          <Badge color={item ? (TableDict[item.status].badgeColor as any) : undefined} size="lg" variant="light">
            {item ? TableDict[item.status].localeStatus : null}
          </Badge>
        </Group>
      </Card>
      <Modal centered opened={editOpened} onClose={closeEditModal} title="Sửa Thông Tin Bàn">
        {item ? <EditTableModal close={closeEditModal} item={item} /> : null}
      </Modal>
    </>
  );
};

export default TableCard;
