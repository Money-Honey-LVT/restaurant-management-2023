import { ActionIcon, Badge, Card, Grid, Group, Image, Stack, Text, Tooltip } from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';
import React from 'react';

const renderHeading = (children: string) => (
  <Text fz="md" fw={600}>
    {children}
  </Text>
);

const renderField = (children: string) => <Text fz="md">{children}</Text>;

const Profile = () => {
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
                {renderField('Khu Đinh')}
                {renderField('24/08/2001')}
                {renderField('20/12/2022')}
                {renderField('khudinh2001')}
                {renderField('Nhân viên')}
              </Stack>
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col span="content">
          <Image
            width={300}
            height={300}
            src={
              'https://plus.unsplash.com/premium_photo-1664104028638-57ccb7c1aa31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80'
            }
          />
        </Grid.Col>
      </Grid>
    </Stack>
  );
};

export default Profile;
