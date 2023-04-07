import { Reducer, combineReducers } from 'redux';
import authReducer from '../reducers/auth/auth.reducer';
import tableReducer from '../reducers/table/table.reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  table: tableReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const reducer: Reducer<RootState, any> = (state: RootState | undefined, action: any) => rootReducer(state, action);

export default reducer;
