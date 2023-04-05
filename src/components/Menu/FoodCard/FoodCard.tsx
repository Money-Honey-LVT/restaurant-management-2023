import { Card, Image, Text, Badge, Button, Group, Menu, ActionIcon, rem } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconCheck, IconDots, IconEdit, IconShoppingCartPlus, IconTrash } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { Food } from '../../../types/models/food';

interface Props {
  item: Food | null;
}

const FoodCard: React.FC<Props> = ({ item }) => {
  const openDeleteFoodModal = () =>
    modals.openConfirmModal({
      title: 'Xác Nhận Xoá Món Ăn',
      centered: true,
      children: (
        <Text size="sm">
          Bạn có chắc muốn xoá món{' '}
          <Text color="blue.9" span inherit>
            {item?.name}
          </Text>{' '}
          ra khỏi thực đơn không?
        </Text>
      ),
      labels: { confirm: 'Đồng ý', cancel: 'Huỷ bỏ' },
      confirmProps: { color: 'red' },
      onCancel: () => {},
      onConfirm: () =>
        notifications.show({
          withCloseButton: true,
          title: 'Thông báo',
          message: 'Bạn đã xoá món ăn thành công!',
          color: 'green',
          icon: <IconCheck size={16} />,
          autoClose: 1200,
        }),
    });

  const openEditFoodModal = () =>
    modals.openConfirmModal({
      title: 'Sửa Món Ăn',
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
              <Menu.Item onClick={openEditFoodModal} icon={<IconEdit size={rem(14)} />}>
                Sửa thông tin
              </Menu.Item>
              <Menu.Item onClick={openDeleteFoodModal} icon={<IconTrash size={rem(14)} />} color="red">
                Xoá món ăn
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Card.Section>
      <Card.Section>
        <Image withPlaceholder src={item?.image || ''} height={160} alt={`Food: ${name}`} />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{item?.name}</Text>
        <Badge color="pink" size="lg" variant="light">
          {item?.price}
        </Badge>
      </Group>

      <Text size="sm" color="dimmed" lineClamp={2}>
        {item?.description}
      </Text>

      <Group position="right">
        <Button
          onClick={openDeleteFoodModal}
          leftIcon={<IconShoppingCartPlus size={16} />}
          variant="filled"
          color="green"
          mt="md"
          radius="md"
        >
          Thêm vào đơn
        </Button>
      </Group>
    </Card>
  );
};

export default FoodCard;
