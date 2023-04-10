import { Card, Grid, Group, Image, Stack, Text } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../hooks/use-app-dispatch';
import { orderActions } from '../../../reducers/order/order.action';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/reducer';

interface Props {
  selectedOrderId: number;
}

const OrderFoodDetailModal: React.FC<Props> = ({ selectedOrderId }) => {
  const [data, setData] = useState<any[]>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      orderActions.detailFood(selectedOrderId, {
        onSuccess: (data) => {
          setData(data);
        },
      })
    );
  }, []);

  return (
    <Stack>
      {data.map((item, index) => {
        return (
          <Card shadow="xs">
            <Grid align="center">
              <Grid.Col span={9}>
                <Group spacing="xl">
                  <Text lineClamp={1}>{item.name}</Text>
                </Group>
              </Grid.Col>
              <Grid.Col span={3}>
                <Text align="right" lineClamp={1}>
                  {item.price * item.quantity} đ
                </Text>
              </Grid.Col>
            </Grid>
          </Card>
        );
      })}
    </Stack>
  );
};

export default OrderFoodDetailModal;
