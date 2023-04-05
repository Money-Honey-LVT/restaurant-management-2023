import {
  ActionIcon,
  Affix,
  Anchor,
  AppShell,
  Box,
  Button,
  Card,
  Group,
  Header,
  Image,
  Navbar,
  Stack,
  Text,
  Transition,
} from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconLogout, IconShoppingCart, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import logo from '../../assets/svg/db.svg';
import ROUTER from '../../config/router';
import MainLinks from '../MainLinks';
import User from '../User';
import { useCartContext } from '../../hooks/use-cart-context';

export default function AppLayout() {
  const [opened, setOpened] = useState(false);
  const [openCart, setOpenCart] = useState(false);

  const navigate = useNavigate();

  const { state } = useCartContext();

  const handleLogout = () => {
    modals.openConfirmModal({
      title: 'Xác Nhận Rời Khỏi',
      centered: true,
      children: <Text size="sm">Bạn có chắc muốn đăng xuất không?</Text>,
      labels: { confirm: 'Đồng ý', cancel: 'Huỷ bỏ' },
      confirmProps: { color: 'red' },
      onCancel: () => {},
      onConfirm: () => {
        navigate(ROUTER.AUTH.LOGIN);
        notifications.show({
          withCloseButton: true,
          title: 'Thông báo',
          message: 'Bạn đã đăng xuất thành công!',
          color: 'green',
          icon: <IconCheck size={16} />,
          autoClose: 1200,
        });
      },
    });
  };

  return (
    <>
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
            <Group position="apart" sx={{ height: '100%' }} px={20}>
              <Group>
                <Anchor href={ROUTER.HOME.INDEX}>
                  <Image src={logo} height={32} width={32} />
                </Anchor>
                <Text fw={600} fz="lg">
                  Hệ Thống Quản Lý Nhà Hàng
                </Text>
              </Group>
              <Button onClick={handleLogout} variant="subtle" color="red" leftIcon={<IconLogout size={20} />}>
                Đăng xuất
              </Button>
            </Group>
          </Header>
        }
      >
        <Outlet />
      </AppShell>
      {/*  */}
      <Affix onClick={() => setOpenCart((prev) => !prev)} position={{ bottom: 22, right: 24 }}>
        <ActionIcon size={40} radius={8} variant="filled" color="primary.9">
          <IconShoppingCart size="20px" />
        </ActionIcon>
      </Affix>

      <Affix position={{ bottom: 0, right: 80 }}>
        <Transition transition="slide-up" mounted={openCart}>
          {(transitionStyles) => (
            <Card
              sx={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
              pos="relative"
              miw={290}
              style={transitionStyles}
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
            >
              <Stack>
                {state.items.length !== 0 ? (
                  state.items.map((item) => (
                    <Group position="apart">
                      <Group position="apart">
                        <Text>{item.name}</Text>
                        <Text>x {item.quantity}</Text>
                      </Group>
                      <ActionIcon>
                        <IconTrash color="red" size={20} />
                      </ActionIcon>
                    </Group>
                  ))
                ) : (
                  <Text color="red">Danh sách trống</Text>
                )}
              </Stack>
            </Card>
          )}
        </Transition>
      </Affix>
    </>
  );
}
