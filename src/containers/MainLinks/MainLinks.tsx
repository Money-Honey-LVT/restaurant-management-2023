import { Group, Text, ThemeIcon, UnstyledButton } from '@mantine/core';
import { IconBrandAirtable, IconListDetails, IconToolsKitchen2, IconUsers } from '@tabler/icons-react';
import React from 'react';
import ROUTER from '../../config/router';
import { useNavigate } from 'react-router-dom';

interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  to: string;
}

const MainLink = ({ icon, color, label, to }: MainLinkProps) => {
  const navigate = useNavigate();

  return (
    <UnstyledButton
      onClick={() => navigate(to, { replace: true })}
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
      })}
    >
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>

        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
};

const data = [
  { icon: <IconToolsKitchen2 size="1rem" />, color: 'blue', label: 'Menu/Tạo Đơn', to: ROUTER.NAV.MENU.INDEX },
  { icon: <IconListDetails size="1rem" />, color: 'teal', label: 'Quản Lý Đơn Hàng', to: ROUTER.NAV.ORDERS.INDEX },
  { icon: <IconBrandAirtable size="1rem" />, color: 'violet', label: 'Quản Lý Bàn', to: ROUTER.NAV.TABLES.INDEX },
  { icon: <IconUsers size="1rem" />, color: 'grape', label: 'Quản Lý Nhân Viên', to: ROUTER.NAV.STAFFS.INDEX },
];

const MainLinks = () => {
  const links = data.map((link) => <MainLink {...link} key={link.label} />);
  return <div>{links}</div>;
};

export default MainLinks;
