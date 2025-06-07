import { PayloadAction } from '@reduxjs/toolkit';
import {
  FeedSlice,
  fetchFeeds,
  initialState
} from '../../../services/slices/FeedSlice';

import { TOrder } from '@utils-types';

describe('Тестирование FeedSlice', () => {
  const testOrder1: TOrder = {
    _id: 'test-order1-id',
    status: 'test-order1-status',
    name: 'test-order1',
    createdAt: 'test-order1-created',
    updatedAt: 'test-order1-updated',
    number: 101,
    ingredients: ['test-bun1-id', 'test-main1-id', 'test-sauce1-id']
  };
  const testOrder2: TOrder = {
    _id: 'test-order2-id',
    status: 'test-order2-status',
    name: 'test-order2',
    createdAt: 'test-order2-created',
    updatedAt: 'test-order2-updated',
    number: 102,
    ingredients: ['test-bun2-id', 'test-main2-id', 'test-sauce2-id']
  };

  const reducer = FeedSlice.reducer;

  test('Возвращает исходное состояние при неизвестном экшене', () => {
    const state = undefined;
    const action = { type: '' };
    expect(reducer(state, action)).toEqual(initialState);
  });

  test('Загрузка ленты заказов', () => {
    const state = initialState;
    const action1 = {
      type: fetchFeeds.pending.type
    };
    const newState1 = reducer(state, action1);
    expect(newState1.loading).toBe(true);

    const action2 = {
      type: fetchFeeds.fulfilled.type,
      payload: {
        orders: [testOrder1, testOrder2],
        total: 2,
        totalToday: 2
      }
    };
    const newState2 = reducer(newState1, action2);
    expect(newState2.feed.orders[0]).toEqual(testOrder1);
    expect(newState2.feed.orders[1]).toEqual(testOrder2);
    expect(newState2.feed.total).toEqual(2);
    expect(newState2.feed.totalToday).toEqual(2);
    expect(newState2.loading).toBe(false);

    const action3 = {
      type: fetchFeeds.rejected.type
    };
    const newState3 = reducer(newState2, action3);
    expect(newState3.loading).toBe(false);
  });
});
