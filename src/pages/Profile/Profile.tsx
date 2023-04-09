import { ActionIcon, Badge, Card, Grid, Group, Image, Stack, Text, Tooltip } from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';
import React from 'react';
import { decodeToken, parserRole } from '../../utils/helpers';

const renderHeading = (children: string) => (
  <Text fz="md" fw={600}>
    {children}
  </Text>
);

const renderField = (children: string) => <Text fz="md">{children}</Text>;

const Profile = () => {
  const decodedToken = decodeToken();
  const { Role, fullname, id, image, iss, username } = decodedToken;

  return (
    <Stack>
      <Group position="apart">
        <Text fw={700} fz="xl">
          Trang cá nhân
        </Text>
        <Tooltip label="Chỉnh sửa trang cá nhân">
          <ActionIcon>
            <IconEdit size={20} color="black" />
          </ActionIcon>
        </Tooltip>
      </Group>

      <Grid m="md" gutter={32}>
        <Grid.Col span="auto">
          <Grid gutter={32}>
            <Grid.Col span={5}>
              <Stack h={300} justify="space-between" spacing="sm">
                {renderHeading('Họ và tên')}
                {renderHeading('Ngày tháng năm sinh')}
                {renderHeading('Ngày bắt đầu làm việc')}
                {renderHeading('Tên tài khoản')}
                {renderHeading('Vị trí')}
              </Stack>
            </Grid.Col>
            <Grid.Col span={7}>
              <Stack h={300} justify="space-between" spacing="sm">
                {renderField(fullname ? fullname : 'Đang cập nhật...')}
                {renderField('Đang cập nhật...')}
                {renderField('Đang cập nhật...')}
                {renderField(username ? username : 'Đang cập nhật...')}
                {renderField(Role ? parserRole(Role) : 'Đang cập nhật...')}
              </Stack>
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col span="content">
          <Image width={300} height={300} src={image} />
        </Grid.Col>
      </Grid>
    </Stack>
  );
};

export default Profile;
