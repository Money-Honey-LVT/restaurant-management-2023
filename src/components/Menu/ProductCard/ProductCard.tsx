import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconCheck, IconEdit, IconTrash } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';

interface Props {
  name: string;
  imgSrc?: string;
  description?: string;
  price: number;
}

const ProductCard: React.FC<Props> = (props) => {
  const { name, price, description, imgSrc } = props;

  const openDeleteProductModal = () =>
    modals.openConfirmModal({
      title: 'Xác Nhận Xoá Món Ăn',
      centered: true,
      children: (
        <Text size="sm">
          Bạn có chắc muốn xoá món{' '}
          <Text color="blue.9" span inherit>
            {name}
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

  const openEditProductModal = () =>
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
      <Card.Section>
        <Image src={imgSrc || ''} height={160} alt={`Product: ${name}`} />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{name}</Text>
        <Badge color="pink" size="lg" variant="light">
          {price}
        </Badge>
      </Group>

      <Text size="sm" color="dimmed" lineClamp={2}>
        {description}
      </Text>

      <Group position="right">
        <Button
          onClick={openEditProductModal}
          leftIcon={<IconEdit size={16} />}
          variant="light"
          color="yellow"
          mt="md"
          radius="md"
        >
          Sửa
        </Button>
        <Button
          onClick={openDeleteProductModal}
          leftIcon={<IconTrash size={16} />}
          variant="filled"
          color="red"
          mt="md"
          radius="md"
        >
          Xoá
        </Button>
      </Group>
    </Card>
  );
};

export default ProductCard;