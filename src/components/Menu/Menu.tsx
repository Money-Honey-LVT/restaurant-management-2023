import { faker } from '@faker-js/faker/locale/vi';
import { ActionIcon, Affix, Button, Card, Grid, Group, Modal, Stack, Text, Transition } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus, IconShoppingCart, IconTrash } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { Food } from '../../types/models/food';
import { randomArray } from '../../utils/helpers';
import AddFoodModal from './AddFoodModal';
import FoodCard from './FoodCard';
import { useCartContext } from '../../hooks/use-cart-context';
import { FoodType } from '../../types/models/food';
import { useNavigate } from 'react-router-dom';
import ROUTER from '../../config/router';
import { RootState } from '../../redux/reducer';
import { useSelector } from 'react-redux';

const Menu = () => {
  const navigate = useNavigate();
  const { state } = useCartContext();
  const [openCart, setOpenCart] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const { foods, isFetching } = useSelector((state: RootState) => state.food);

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
          {foods.map((item, index) => (
            <Grid.Col key={`food-card-${index}`} span={4}>
              <FoodCard item={item} />
            </Grid.Col>
          ))}
        </Grid>
      </Stack>

      {/*  */}
      <Modal centered opened={opened} onClose={close} title="Thêm Món Ăn">
        <AddFoodModal close={close} />
      </Modal>

      {/*  */}
      <Affix onClick={() => setOpenCart((prev) => !prev)} position={{ bottom: 22, right: 24 }}>
        <ActionIcon size={40} radius={8} variant="filled" color="primary.9">
          <IconShoppingCart size="20px" />
        </ActionIcon>
      </Affix>

      <Affix position={{ bottom: 0, right: 80 }}>
        <Transition transition="slide-up" mounted={openCart}>
          {(transitionStyles) => (
            <Card
              sx={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
              pos="relative"
              miw={290}
              style={transitionStyles}
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
            >
              <Stack>
                {state.items.length !== 0 ? (
                  <>
                    {state.items.map((item) => (
                      <Group position="apart">
                        <Group position="apart">
                          <Text>{item.name}</Text>
                          <Text>x {item.quantity}</Text>
                        </Group>
                        <ActionIcon>
                          <IconTrash color="red" size={20} />
                        </ActionIcon>
                      </Group>
                    ))}
                    <Button onClick={() => navigate(ROUTER.HOME.CHECKOUT)}>Thanh toán</Button>
                  </>
                ) : (
                  <Text color="red">Đơn hàng trống</Text>
                )}
              </Stack>
            </Card>
          )}
        </Transition>
      </Affix>
    </>
  );
};

export default Menu;
