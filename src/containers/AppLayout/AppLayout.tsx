import { AppShell, Group, Header, Image, Navbar, Text } from '@mantine/core';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import logo from '../../assets/svg/db.svg';
import MainLinks from '../MainLinks';
import User from '../User';

export default function AppLayout() {
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
          <Navbar.Section grow mt="0">
            <MainLinks />
          </Navbar.Section>
          <Navbar.Section>
            <User />
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={60}>
          <Group sx={{ height: '100%' }} px={20}>
            <Image src={logo} height={32} width={32} />
            <Text fw={600} fz="lg">
              Hệ Thống Quản Lý Nhà Hàng
            </Text>
          </Group>
        </Header>
      }
    >
      <Outlet />
    </AppShell>
  );
}
