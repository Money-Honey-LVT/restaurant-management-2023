import React, { forwardRef } from 'react';
import { useAppDispatch } from '../../../hooks/use-app-dispatch';
import { Avatar, Button, Flex, Group, MultiSelect, Select, Text, TextInput, useMantineTheme } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { OrderStatus } from '../../../types/models/order';

interface Props {
  close: () => void;
}

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  image: string;
  label: string;
  description: string;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(({ image, label, description, ...others }: ItemProps, ref) => (
  <div ref={ref} {...others}>
    <Group noWrap>
      <Avatar src={image} />

      <div>
        <Text size="sm">{label}</Text>
        <Text size="xs" opacity={0.65}>
          {description}
        </Text>
      </div>
    </Group>
  </div>
));

const AddOrderModal: React.FC<Props> = ({ close }) => {
  const theme = useMantineTheme();
  const dispatch = useAppDispatch();

  const form = useForm({
    initialValues: {
      customerId: 0,
      staffId: 0,
      status: OrderStatus.pending,
      isVoucher: false,
      orderTables: [],
    },
    validate: {
      customerId: isNotEmpty('Khách hàng không thể bỏ trống!'),
      orderTables: isNotEmpty('Bạn chưa chọn bàn cho khách hàng!'),
    },
  });

  return (
    <form id="form-add-modal">
      <Flex direction="column" gap="sm">
        <Select
          zIndex={1000}
          label="Khách hàng"
          placeholder="Chọn hoặc khách hàng"
          itemComponent={SelectItem}
          data={data}
          searchable
          nothingFound="Nobody here"
          filter={(value, item) =>
            item?.label?.toLowerCase().includes(value.toLowerCase().trim()) ||
            item?.description?.toLowerCase().includes(value.toLowerCase().trim())
          }
          creatable
          getCreateLabel={(query) => `+ Tạo khách hàng ${query}`}
          onCreate={(query) => {
            console.log(query);
            return null;
            // const item = { value: query, label: query };
            // setData((current) => [...current, item]);
            // return item;
          }}
          {...form.getInputProps('customerId')}
        />

        <MultiSelect
          zIndex={100000}
          label="Bàn"
          placeholder="Chọn bàn đặt"
          data={[
            { value: '1', label: '1' },
            { value: '2', label: '2' },
            { value: '3', label: '3' },
            { value: '4', label: '4' },
          ]}
          {...form.getInputProps('orderTables')}
        />

        <TextInput label="Nhân viên nhận đơn" disabled value={'Nguyễn Văn A Test'} />

        <Group mt="sm" position="right">
          <Button variant="light" onClick={close}>
            Huỷ bỏ
          </Button>
          <Button type="submit">Thêm mới</Button>
        </Group>
      </Flex>
    </form>
  );
};

export default AddOrderModal;

const data = [
  {
    image: 'https://img.icons8.com/clouds/256/000000/futurama-bender.png',
    label: 'Nguyễn Ngọc Quý',
    value: '0918322965',
    description: '0918322965',
  },
  {
    image: 'https://img.icons8.com/clouds/256/000000/futurama-bender.png',
    label: 'Nguyễn Ngọc Quý',
    value: '0918322965',
    description: '0918322965',
  },
  {
    image: 'https://img.icons8.com/clouds/256/000000/futurama-bender.png',
    label: 'Nguyễn Ngọc Quý',
    value: '0918322965',
    description: '0918322965',
  },
  {
    image: 'https://img.icons8.com/clouds/256/000000/futurama-bender.png',
    label: 'Nguyễn Ngọc Quý',
    value: '0918322965',
    description: '0918322965',
  },
];
