import { faker } from '@faker-js/faker/locale/vi';
import { Button, Grid, Group, Stack, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconPlus } from '@tabler/icons-react';
import { randomArray } from '../../utils/helpers';
import ProductCard from './ProductCard';

const Menu = () => {
  const openAddProductModal = () =>
    modals.openConfirmModal({
      title: 'Thêm Món Ăn',
      centered: true,
      children: <Text size="sm"></Text>,
      labels: { confirm: 'Tạo mới', cancel: 'Huỷ bỏ' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => console.log('Confirmed'),
    });

  return (
    <Stack>
      <Group position="apart">
        <Text fw={700} fz="xl">
          Menu
        </Text>
        <Button leftIcon={<IconPlus />} onClick={openAddProductModal}>
          Thêm
        </Button>
      </Group>
      <Grid>
        {randomArray(5).map(() => (
          <Grid.Col span={4}>
            <ProductCard
              name={faker.commerce.productName()}
              imgSrc={faker.image.food(undefined, undefined, true)}
              price={faker.datatype.number({
                precision: 0.01,
              })}
              description={faker.commerce.productDescription()}
            />
          </Grid.Col>
        ))}
      </Grid>
    </Stack>
  );
};

export default Menu;
