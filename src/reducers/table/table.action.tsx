import { notifications } from '@mantine/notifications';
import { API_URLS } from '../../config/constants/api';
import { AppDispatch } from '../../redux/store';
import { Callback } from '../../types/helpers/callback';
import { Table } from '../../types/models/table';
import { useCallApi } from '../../utils/api';
import { TableActionType } from './table.types';
import { IconExclamationMark } from '@tabler/icons-react';
import { apiCallErrorNotitification } from '../../utils/helpers';

const addTable = (payload: Table, cb?: Callback) => async (dispatch: AppDispatch) => {
  dispatch({ type: TableActionType.ADD_TABLE_PENDING });

  const api = API_URLS.TABLES.createTable();

  const { response, error } = await useCallApi({ ...api, payload });

  if (!error && response?.status === 200) {
    dispatch({
      type: TableActionType.ADD_TABLE_SUCCESS,
      payload: response.data,
    });
    cb?.onSuccess?.(response.data);
  } else {
    dispatch({ type: TableActionType.ADD_TABLE_FAILURE });
    apiCallErrorNotitification(error);
  }
};

const getAllTables = (cb?: Callback) => async (dispatch: AppDispatch) => {
  dispatch({ type: TableActionType.GET_ALL_TABLES_PENDING });

  const api = API_URLS.TABLES.getAllTables();

  const { response, error } = await useCallApi({ ...api });

  if (!error && response?.status === 200) {
    dispatch({
      type: TableActionType.GET_ALL_TABLES_SUCCESS,
      payload: response.data,
    });
    cb?.onSuccess?.(response.data);
  } else {
    dispatch({ type: TableActionType.GET_ALL_TABLES_FAILURE });
    apiCallErrorNotitification(error);
  }
};

export const tableActions = { addTable, getAllTables };
