import { notifications } from '@mantine/notifications';
import { IconCheck, IconExclamationMark } from '@tabler/icons-react';

export const apiCallSuccessNotitification = () =>
  notifications.show({
    withCloseButton: true,
    title: 'Thông báo',
    message: 'Cập nhật thành công',
    color: 'green',
    icon: <IconCheck size={16} />,
    autoClose: 1200,
  });
