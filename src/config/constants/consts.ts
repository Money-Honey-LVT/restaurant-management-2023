import { ToastOptions } from 'react-toastify';

const ROLE_ADMIN = '1';
const ROLE_EMPLOYEE = '0';

const TOAST_CONFIG: ToastOptions = {
  position: 'top-right',
  autoClose: 800,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: false,
  theme: 'light',
};

export default {
  ROLE_ADMIN,
  ROLE_EMPLOYEE,
  TOAST_CONFIG,
};
