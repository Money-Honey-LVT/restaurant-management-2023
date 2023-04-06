import {
  Button,
  Flex,
  Group,
  NumberInput,
  TextInput,
  useMantineTheme,
} from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';

interface Props {
  close: () => void;
}

const AddTableModal: React.FC<Props> = ({ close }) => {
  const theme = useMantineTheme();

  const form = useForm({
    initialValues: { name: '', capacity: 0 },
    validate: {
      name: isNotEmpty('Bạn chưa nhập tên bàn!'),
      capacity: isNotEmpty('Bạn chưa chọn số lượng chỗ ngồi'),
    },
  });

  return (
    <form
      id="form-add-table"
      onSubmit={form.onSubmit((values) => console.log(values))}
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
          <Button type="submit">Thêm mới</Button>
        </Group>
      </Flex>
    </form>
  );
};

export default AddTableModal;
