import { method } from 'lodash';

export const HEADERS = {
  header: () => ({
    accept: 'application/json',
    'Content-Type': 'application/json; charset=UTF-8',
  }),
  fileHeader: () => ({
    'Content-Type': 'multipart/form-data',
  }),
};

const StaffSchema = 'Staffs';

export const API_URLS = {
  AUTH: {
    LOGIN: () => ({
      endPoint: `${StaffSchema}/login`,
      method: 'POST',
      headers: HEADERS.header(),
    }),
  },
};
