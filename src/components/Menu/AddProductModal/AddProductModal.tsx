import { Button, Flex, Group, NumberInput, Select, Stack, Text, TextInput, Textarea, useMantineTheme } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from '@mantine/dropzone';
import { isNotEmpty, useForm } from '@mantine/form';
import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react';

interface Props {
  close: () => void;
}

const AddProductModal: React.FC<Props> = ({ close }) => {
  const theme = useMantineTheme();

  const form = useForm({
    initialValues: { name: '', image: [] as FileWithPath[], type: null, description: '', price: 0 },
    validate: {
      name: isNotEmpty('Bạn chưa nhập tên sản phẩm!'),
      price: isNotEmpty('Bạn chưa nhập giá sản phẩm'),
    },
  });

  return (
    <form id="form-add-product" onSubmit={form.onSubmit((values) => console.log(values))}>
      <Flex direction="column" gap="sm">
        <TextInput withAsterisk label="Tên món ăn" placeholder="Nhập tên món ăn" {...form.getInputProps('name')} />

        <Group grow>
          <Select
            data={[{ value: 'hot-pot', label: 'Lẩu' }]}
            placeholder="Chọn loại"
            label="Chọn loại món ăn"
            {...form.getInputProps('type')}
          />
          <NumberInput
            defaultValue={0}
            placeholder="Chọn hoặc nhập giá món"
            label="Giá tiền"
            step={1000}
            withAsterisk
            {...form.getInputProps('price')}
          />
        </Group>

        <Stack spacing={0}>
          <Text fw={600} fz="sm">
            Ảnh món ăn
          </Text>
          <Dropzone
            onDrop={(files) => form.setFieldValue('image', files)}
            onReject={(files) => console.log('rejected files', files)}
            maxSize={3 * 1024 ** 2}
            accept={IMAGE_MIME_TYPE}
            multiple={false}
            {...form.getInputProps('image')}
          >
            <Group position="center" spacing="xs" style={{ pointerEvents: 'none' }}>
              <Dropzone.Accept>
                <IconUpload size="2rem" stroke={1.5} color={theme.colors[theme.primaryColor][6]} />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX size="2rem" stroke={1.5} color={theme.colors.red[6]} />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconPhoto size="3.2rem" stroke={1.5} />
              </Dropzone.Idle>

              <Stack spacing={0} align="center">
                <Text size="sm" inline>
                  Kéo thả hoặc nhấn để chọn file ảnh
                </Text>
                <Text size="xs" color="dimmed" inline mt={7}>
                  Chọn 1 ảnh duy nhất, kích cỡ không quá 5MB
                </Text>
              </Stack>
            </Group>
          </Dropzone>
        </Stack>

        <Textarea placeholder="Nhập mô tả..." label="Mô tả món ăn" {...form.getInputProps('description')} />

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

export default AddProductModal;
