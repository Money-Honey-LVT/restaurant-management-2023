import { Button, Card, Grid, Group, Image, Select, Stack, Text } from '@mantine/core';
import { useCartContext } from '../../hooks/use-cart-context';
import { useForm } from '@mantine/form';

const Checkout = () => {
  const { state } = useCartContext();
  const { items } = state;

  if (items.length === 0) return <Text>Giỏ hàng trống!</Text>;

  const form = useForm({
    initialValues: {},
    validate: {},
  });

  return (
    <Stack>
      <Text fw={700} fz="xl">
        Gọi Món Cho Đơn
      </Text>
      <Card shadow="sm">
        <Stack spacing="xl">
          {items.map((item, index) => {
            return (
              <Grid key={`cart-item-checkout-${index}`} align="center">
                <Grid.Col span={2}>
                  <Image src={item.image} width={70} height={70} />
                </Grid.Col>
                <Grid.Col span={5}>
                  <Text>{item.name}</Text>
                </Grid.Col>
                <Grid.Col span={3}>
                  <Text>{item.price}</Text>
                </Grid.Col>
                <Grid.Col span={2}>
                  <Text align="center">x {item.quantity}</Text>
                </Grid.Col>
              </Grid>
            );
          })}
        </Stack>
      </Card>
      <form
        id="form-select-food-order"
        onSubmit={form.onSubmit((values) => {
          console.log(values);
        })}
      >
        <Group align="end" position="apart">
          <Select data={[]} label={'Chọn đơn hàng'} />
          <Button type="submit">Gọi món</Button>
        </Group>
      </form>
    </Stack>
  );
};

export default Checkout;
