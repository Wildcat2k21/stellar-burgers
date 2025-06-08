import {
  OrderSlice,
  fetchOrderByNumber,
  initialState
} from '../../../services/slices/OrderSlice';

import { TOrder } from '@utils-types';

describe('Тестирование OrderSlice', () => {
  const testOrder1: TOrder = {
    _id: 'test-order1-id',
    status: 'test-order1-status',
    name: 'test-order1',
    createdAt: 'test-order1-created',
    updatedAt: 'test-order1-updated',
    number: 101,
    ingredients: ['test-bun1-id', 'test-main1-id', 'test-sauce1-id']
  };

  const reducer = OrderSlice.reducer;

  test('Возвращает исходное состояние при неизвестном экшене', () => {
    const state = undefined;
    const action = { type: '' };
    expect(reducer(state, action)).toEqual(initialState);
  });

  test('Загрузка заказа', () => {
    const state = initialState;
    const action1 = {
      type: fetchOrderByNumber.pending.type
    };
    const newState1 = reducer(state, action1);
    expect(newState1.loading).toBe(true);

    const action2 = {
      type: fetchOrderByNumber.fulfilled.type,
      payload: testOrder1
    };
    const newState2 = reducer(newState1, action2);
    expect(newState2.order).toEqual(testOrder1);
    expect(newState2.loading).toBe(false);

    const action3 = {
      type: fetchOrderByNumber.rejected.type
    };
    const newState3 = reducer(newState2, action3);
    expect(newState3.loading).toBe(false);
  });
});
