import { ActionIcon, Badge, Button, Card, Group, Image, Indicator, Menu, Modal, Text, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import {
  IconCheck,
  IconDots,
  IconEdit,
  IconMinus,
  IconPlus,
  IconShoppingCartPlus,
  IconTrash,
} from '@tabler/icons-react';
import { useState } from 'react';
import { useCartContext } from '../../../hooks/use-cart-context';
import { Food, foodTypeDict } from '../../../types/models/food';
import EditFoodModal from '../EditFoodModal';
import { useAppDispatch } from '../../../hooks/use-app-dispatch';
import { foodActions } from '../../../reducers/food/food.action';

interface Props {
  item: Food | null;
}

const FoodCard: React.FC<Props> = ({ item }) => {
  const {
    addCartItem,
    state: { items },
  } = useCartContext();

  const [quantity, setQuantity] = useState(0);
  const dispatch = useAppDispatch();
  const [opened, { open, close }] = useDisclosure(false);
  const [editOpened, { close: closeEditModal, open: openEditModal }] = useDisclosure();

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
      onConfirm: () => {
        if (!item) return;
        dispatch(foodActions.deleteFood(item.id, { onSuccess: () => dispatch(foodActions.getAllFoods()) }));
      },
    });

  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section withBorder inheritPadding py="xs">
          <Group position="apart">
            <Text weight={500}>{item?.name}</Text>
            <Group>
              {item && item.isBuffet ? <Badge color="red">Buffet</Badge> : null}
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
                  <Menu.Item onClick={openDeleteFoodModal} icon={<IconTrash size={rem(14)} />} color="red">
                    Xoá món ăn
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
          </Group>
        </Card.Section>
        <Card.Section>
          <Image withPlaceholder src={item?.image || ''} height={160} alt={`Food: ${name}`} />
        </Card.Section>

        <Group position="apart" mt="md" mb="xs">
          <Text color={item ? foodTypeDict[item.type].color : undefined} weight={500}>
            {item ? foodTypeDict[item.type].label : null}
          </Text>
          <Badge color="pink" size="lg" variant="light">
            {item?.price}
          </Badge>
        </Group>

        <Text size="sm" color="dimmed" lineClamp={2}>
          {item?.description}
        </Text>

        <Group mt="md" position={'right'} align="center">
          <Button
            onClick={open}
            leftIcon={<IconShoppingCartPlus size={16} />}
            variant="filled"
            color="green"
            radius="md"
          >
            Thêm vào giỏ hàng
          </Button>
        </Group>
      </Card>

      <Modal centered opened={opened} onClose={close} title="Nhập số lượng">
        <Group grow>
          <Group grow>
            <ActionIcon disabled={quantity <= 0} onClick={() => setQuantity((prev) => prev - 1)}>
              <IconMinus />
            </ActionIcon>
            <Text align="center">{quantity}</Text>
            <ActionIcon onClick={() => setQuantity((prev) => prev + 1)}>
              <IconPlus />
            </ActionIcon>
          </Group>
          <Button
            disabled={quantity <= 0}
            onClick={() => {
              addCartItem({ quantity, name: item ? item.name : '', image: '', price: item ? item.price : 0 });
              notifications.show({
                withCloseButton: true,
                title: 'Thông báo',
                message: 'Thêm sản phẩm vào đơn hàng thành công!!',
                color: 'green',
                icon: <IconCheck size={16} />,
                autoClose: 1200,
              });
            }}
          >
            Xác nhận
          </Button>
        </Group>
      </Modal>

      {item ? (
        <Modal centered opened={editOpened} onClose={closeEditModal} title="Sửa Món Ăn">
          <EditFoodModal close={closeEditModal} item={item} />
        </Modal>
      ) : null}
    </>
  );
};

export default FoodCard;
