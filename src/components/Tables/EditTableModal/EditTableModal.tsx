import React from 'react';
import { Table } from '../../../types/models/table';
import { isNotEmpty, useForm } from '@mantine/form';
import { Button, Flex, Group, NumberInput, TextInput } from '@mantine/core';
import lodash from 'lodash';
import { notifications } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';

interface Props {
  item: Table;
  close: () => void;
}

const EditTableModal: React.FC<Props> = ({ item, close }) => {
  const initialValues = { name: item.name, capacity: item.capacity };

  const form = useForm({
    initialValues,
    validate: {
      name: isNotEmpty('Bạn chưa nhập tên bàn!'),
      capacity: isNotEmpty('Bạn chưa chọn số lượng chỗ ngồi'),
    },
  });

  return (
    <form
      id="form-edit-table"
      onSubmit={form.onSubmit((values) => {
        if (lodash.isEqual(values, initialValues)) {
          notifications.show({
            withCloseButton: true,
            title: 'Thông báo',
            message: 'Bạn chưa thay đổi thông tin của bàn!',
            color: 'red',
            icon: <IconX size={16} />,
            autoClose: 1200,
          });
          return;
        }
        console.log(values);
        close();
      })}
    >
      <Flex direction="column" gap="sm">
        <TextInput
          withAsterisk
          label="Tên bàn"
          placeholder="Nhập tên bàn"
          {...form.getInputProps('name')}
        />

        <NumberInput
          defaultValue={0}
          placeholder="Chọn số lượng chỗ ngồi trong bàn"
          label="Chỗ ngồi"
          step={1}
          min={0}
          withAsterisk
          {...form.getInputProps('capacity')}
        />

        <Group mt="sm" position="right">
          <Button variant="light" onClick={close}>
            Huỷ bỏ
          </Button>
          <Button type="submit">Sửa</Button>
        </Group>
      </Flex>
    </form>
  );
};

export default EditTableModal;
