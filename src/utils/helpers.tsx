import _ from 'lodash';
import consts from '../config/constants';
import { Icon, IconCheck, IconExclamationMark, IconX } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import jwt_decode from 'jwt-decode';

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
    case consts.ROLE_STAFF:
      return 'Employee';
    default:
      return '';
  }
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
    withCloseButton: true,
    autoClose: 1200,
  });
};

const getIconByType = (type: notiType) => {
  switch (type) {
    case notiType.SUCCESS:
      return IconCheck;
    case notiType.ERROR:
      return IconX;
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

interface DecodedToken {
  Role: string;
}

export const decodeToke = (): DecodedToken => {
  const token = localStorage.getItem('token')?.replace('Bearer ', '') || '';
  return jwt_decode(token);
};

export const isManager = () => {
  const decodedToken: DecodedToken | undefined = decodeToke();
  const role = decodedToken?.Role;
  return role === consts.ROLE_ADMIN ? true : false;
};

export const apiCallErrorNotitification = (error: any) =>
  notifications.show({
    withCloseButton: true,
    title: 'Thông báo',
    message: error.response.data.devMsg,
    color: 'red',
    icon: <IconExclamationMark size={16} />,
    autoClose: 1200,
  });
