import { faker } from '@faker-js/faker/locale/vi';
import { Button, Grid, Group, Modal, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { Product } from '../../types/models/product';
import { randomArray } from '../../utils/helpers';
import AddProductModal from './AddProductModal';
import ProductCard from './ProductCard';

const Menu = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const [fake, setFake] = useState<Product | null>(null);

  useEffect(() => {
    const fakeProduct: Product = {
      name: faker.commerce.productName(),
      imgSrc: faker.image.food(undefined, undefined, true),
      price: faker.datatype.number({
        precision: 1000,
      }),
      description: faker.commerce.productDescription(),
    };
    setFake(fakeProduct);
  }, []);

  return (
    <>
      <Stack>
        <Group position="apart">
          <Text fw={700} fz="xl">
            Thực đơn nhà hàng
          </Text>
          <Button leftIcon={<IconPlus />} onClick={open}>
            Thêm
          </Button>
        </Group>
        <Grid>
          {randomArray(5).map((_, index) => (
            <Grid.Col key={`product-card-${index}`} span={4}>
              <ProductCard item={fake} />
            </Grid.Col>
          ))}
        </Grid>
      </Stack>
      <Modal centered opened={opened} onClose={close} title="Thêm Món Ăn">
        <AddProductModal close={close} />
      </Modal>
    </>
  );
};

export default Menu;
