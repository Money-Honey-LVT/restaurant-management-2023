import { faker } from '@faker-js/faker';
import { Group, Stack } from '@mantine/core';
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducer';
import CustomerStats from './CustomerStats';
import OrderStats from './OrderStats';
import TableStats from './TableStats';
import FoodsStats from './FoodsStats';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'SỐ LIỆU NHÀ HÀNG THEO NGÀY',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Doanh thu (Đơn vị: triệu đồng)',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 200 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Tổng số đơn hàng',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 200 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export enum CountType {
  foods = 'foods',
  customers = 'customers',
  orders = 'orders',
}

export const countRenderDictionary = {
  [CountType.customers]: {
    color: 'green',
    text: 'Khách hàng',
  },
  [CountType.foods]: {
    color: 'red',
    text: 'Món ăn',
  },
  [CountType.orders]: {
    color: 'blue',
    text: 'Lượt đặt bàn',
  },
};

const Home = () => {
  const { customers, foods, orders } = useSelector((state: RootState) => ({
    foods: state.food.foods,
    customers: state.customer.customers,
    orders: state.order.orders,
  }));

  return (
    <Stack>
      <Group position="center">
        <CustomerStats />
        <OrderStats />
        <TableStats />
        <FoodsStats />
      </Group>
      <Line options={options} data={data} />
    </Stack>
  );
};

export default Home;
