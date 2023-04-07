import _ from 'lodash';
import consts from '../config/constants';
import { Icon, IconCheck, IconX } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';

export const randomArray = (number: number): number[] => Array.from({ length: number }, (_, i) => i + 1);

export const formatCurrency = (number: number | undefined) => {
  if (!number) return '0';
  const formattedNumber = _.replace(_.round(number, 0).toString(), /\B(?=(\d{3})+(?!\d))/g, '.') + ' đ';
  return formattedNumber;
};

export const formatDateFromISOString = (string: string | undefined) => {
  if (!string) return '';
  return string.split('T')[0];
};

export const getColorByRole = (role: string | undefined) => {
  switch (role) {
    case 'EMPLOYEE':
      return 'green';
    case 'MANAGER':
      return 'red';
    default:
      break;
  }
};

export const parserRole = (value: string | undefined) => {
  switch (value) {
    case consts.ROLE_ADMIN:
      return 'Manager';
    case consts.ROLE_EMPLOYEE:
      return 'Employee';
    default:
      return '';
  }
};

export const isManager = () => {
  const role = localStorage.getItem('isManager');
  return role === consts.ROLE_ADMIN ? true : false;
};

export enum notiType {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export const renderNotification = (title: string, description: string, type: notiType) => {
  notifications.show({
    title: title,
    message: description,
    color: getColorByType(type),
  });
};

const getIconByType = (type: notiType): React.ReactNode => {
  switch (type) {
    case notiType.SUCCESS:
      return 'asd';
    case notiType.ERROR:
      return '';
  }
};

const getColorByType = (type: notiType) => {
  switch (type) {
    case notiType.SUCCESS:
      return 'green';
    case notiType.ERROR:
      return 'red';
  }
};
