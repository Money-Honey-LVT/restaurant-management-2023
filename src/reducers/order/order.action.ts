import { API_URLS } from '../../config/constants/api';
import { AppDispatch } from '../../redux/store';
import { Callback } from '../../types/helpers/callback';
import { Customer } from '../../types/models/customer';
import { useCallApi } from '../../utils/api';
import { notiType, renderNotification } from '../../utils/helpers';
import { OrderActionType, OrderThunkAction } from './order.types';

interface AddOrderPayload {
  customer: Partial<Customer>;
  tableIDS: number[];
}

const addOrder =
  (payload: AddOrderPayload, cb?: Callback): OrderThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: OrderActionType.ADD_ORDER_PENDING });

    const api = API_URLS.ORDER.addOrder();
    const { error, response } = await useCallApi({ ...api, payload });

    if (!error && response?.status === 200) {
      dispatch({ type: OrderActionType.ADD_ORDER_SUCCESS });
      renderNotification('Thông báo', 'Thêm thành công!', notiType.SUCCESS);
      cb?.onSuccess?.();
    } else {
      dispatch({ type: OrderActionType.ADD_ORDER_FAILURE });
      renderNotification('Thông báo', error.response.data.devMsg, notiType.ERROR);
    }
  };

const getAllOrders =
  (cb?: Callback): OrderThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: OrderActionType.GET_ALL_ORDERS_PENDING });

    const api = API_URLS.ORDER.getAllOrders();
    const { response, error } = await useCallApi({ ...api });

    if (!error && response?.status === 200) {
      dispatch({
        type: OrderActionType.GET_ALL_ORDERS_SUCCESS,
        payload: response.data,
      });
      cb?.onSuccess?.(response.data);
    } else {
      dispatch({ type: OrderActionType.GET_ALL_ORDERS_FAILURE });
      renderNotification('Thông báo', error.response.data.devMsg, notiType.ERROR);
    }
  };

export const orderActions = { addOrder, getAllOrders };
