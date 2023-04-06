import { isNotEmpty, useForm } from "@mantine/form";
import {
  Button,
  Flex,
  Group,
  NumberInput,
  Select,
  Stack,
  Text,
  TextInput,
  Textarea,
  useMantineTheme,
} from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from "@mantine/dropzone";
import { IconPhoto, IconUpload, IconX } from "@tabler/icons-react";
import { StaffRole } from "../../../types/models/staff";

interface Props {
  close: () => void;
}

const RoleOption = [
  {
    value: StaffRole.EMPLOYEE,
    label: "Nhân viên",
  },
  {
    value: StaffRole.MANAGER,
    label: "Quản lý",
  },
];

const AddStaffModal: React.FC<Props> = ({ close }) => {
  const form = useForm({
    initialValues: {
      fullName: "",
      salary: "",
      role: null,
      image: [] as FileWithPath[],
    },
    validate: {
      fullName: isNotEmpty("Bạn chưa nhập họ tên nhân viên!"),
      salary: isNotEmpty("Bạn chưa nhập lương!"),
			role: isNotEmpty("Bạn chưa chọn chức vụ!")
    },
  });
  const theme = useMantineTheme();

  const handleAddNewStaff = () => {
    form.onSubmit((value) => console.log(value));
  };

  return (
    <form onSubmit={form.onSubmit((value) => console.log(value))}>
      <Flex direction={"column"} gap="sm">
        <TextInput
          withAsterisk
          label="Tên nhân viên"
          placeholder="Nhập tên nhân viên"
          {...form.getInputProps("fullName")}
        />

        <TextInput
          withAsterisk
          label="Mức lương"
          placeholder="Nhập mức lương"
          {...form.getInputProps("salary")}
        />

        <Select
          withAsterisk
          data={RoleOption}
          placeholder="Chọn chức vụ"
          label="Chức vụ"
          {...form.getInputProps("role")}
        />

        <Stack spacing={0}>
          <Text fw={600} fz="sm">
            Ảnh món ăn
          </Text>
          <Dropzone
            onDrop={(files) => form.setFieldValue("image", files)}
            onReject={(files) => console.log("rejected files", files)}
            maxSize={3 * 1024 ** 2}
            accept={IMAGE_MIME_TYPE}
            multiple={false}
            {...form.getInputProps("image")}
          >
            <Group
              position="center"
              spacing="xs"
              style={{ pointerEvents: "none" }}
            >
              <Dropzone.Accept>
                <IconUpload
                  size="2rem"
                  stroke={1.5}
                  color={theme.colors[theme.primaryColor][6]}
                />
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

export default AddStaffModal;
