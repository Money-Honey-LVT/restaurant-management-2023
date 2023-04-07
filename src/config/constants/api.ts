import { Schemas } from '../../types/helpers/schemas';

export const HEADERS = {
  header: () => ({
    accept: 'application/json',
    'Content-Type': 'application/json; charset=UTF-8',
  }),
  fileHeader: () => ({
    'Content-Type': 'multipart/form-data',
  }),
  authHeader: () => ({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `${localStorage.getItem('token')}`,
  }),
};

export const API_URLS = {
  AUTH: {
    LOGIN: () => ({
      endPoint: `${Schemas.StaffsSchema}/login`,
      method: 'POST',
      headers: HEADERS.header(),
    }),
  },
  TABLES: {
    createTable: () => ({
      endPoint: `${Schemas.TablesSchema}`,
      method: 'POST',
      headers: HEADERS.authHeader(),
    }),
    getAllTables: () => ({
      endPoint: `${Schemas.TablesSchema}`,
      method: 'GET',
      headers: HEADERS.authHeader(),
    }),
    editTable: (id: number) => ({
      endPoint: `${Schemas.TablesSchema}/${id}`,
      method: 'PUT',
      headers: HEADERS.authHeader(),
    }),
    getTableById: (id: number) => ({
      endPoint: `${Schemas.TablesSchema}/${id}`,
      method: 'GET',
      headers: HEADERS.authHeader(),
    }),
    blockTable: (id: number) => ({
      endPoint: `${Schemas.TablesSchema}/${id}/block`,
      method: 'POST',
      headers: HEADERS.authHeader(),
    }),
    unblockTable: (id: number) => ({
      endPoint: `${Schemas.TablesSchema}/${id}/un-block`,
      method: 'POST',
      headers: HEADERS.authHeader(),
    }),
  },
};
