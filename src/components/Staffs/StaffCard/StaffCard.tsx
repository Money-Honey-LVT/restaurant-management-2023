import React from 'react';
import { Staff } from '../../../types/models/staff';
import { ActionIcon, Badge, Button, Card, Group, Image, Menu, Text, rem } from '@mantine/core';
import { IconDots, IconEdit, IconTrash } from '@tabler/icons-react';
import { formatCurrency } from '../../../utils/helpers';

interface Props {
  item: Staff | null;
}

const StaffCard: React.FC<Props> = ({ item }) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section withBorder inheritPadding py="xs">
        <Group position="apart">
          <Text weight={500}>{item?.name}</Text>
          <Menu withinPortal position="bottom-end" shadow="sm">
            <Menu.Target>
              <ActionIcon>
                <IconDots size="1rem" />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item icon={<IconEdit size={rem(14)} />}>Sửa thông tin</Menu.Item>
              <Menu.Item icon={<IconTrash size={rem(14)} />} color="red">
                Xoá nhân viên
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Card.Section>

      <Card.Section>
        <Image withPlaceholder src={item?.imgSrc || ''} height={175} alt={`Product: ${name}`} />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{item?.name}</Text>
        <Badge color="pink" size="lg" variant="light">
          {formatCurrency(item?.salary)}
        </Badge>
      </Group>
    </Card>
  );
};

export default StaffCard;
