import { faker } from '@faker-js/faker/locale/vi';
import { Button, Grid, Group, Modal, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { Food } from '../../types/models/food';
import { randomArray } from '../../utils/helpers';
import AddFoodModal from './AddFoodModal';
import FoodCard from './FoodCard';

const Menu = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const [fake, setFake] = useState<Food | null>(null);

  useEffect(() => {
    const fakeFood: Food = {
      name: faker.commerce.productName(),
      image: faker.image.food(undefined, undefined, true),
      price: faker.datatype.number({
        precision: 1000,
      }),
      description: faker.commerce.productDescription(),
    };
    setFake(fakeFood);
  }, []);

  return (
    <>
      <Stack>
        <Group position="apart">
          <Text fw={700} fz="xl">
            Thực đơn nhà hàng
          </Text>
          <Button leftIcon={<IconPlus />} onClick={open}>
            Thêm món ăn
          </Button>
        </Group>
        <Grid>
          {randomArray(5).map((_, index) => (
            <Grid.Col key={`food-card-${index}`} span={4}>
              <FoodCard item={fake} />
            </Grid.Col>
          ))}
        </Grid>
      </Stack>
      <Modal centered opened={opened} onClose={close} title="Thêm Món Ăn">
        <AddFoodModal close={close} />
      </Modal>
    </>
  );
};

export default Menu;
