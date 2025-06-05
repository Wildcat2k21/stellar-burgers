import { PayloadAction } from '@reduxjs/toolkit';
import {
  addConstructorItems,
  ConstructorSlice,
  fetchOrderBurger,
  initialState,
  moveDown,
  moveUp,
  removeConstructorItems
} from '../../../services/slices/ConstructorSlice';

import { TConstructorIngredient, TOrder } from '@utils-types';

describe('Тестирование ConstructorSlice', () => {
  const testBun: TConstructorIngredient = {
    _id: 'test-bun-id',
    name: 'Тестовая булка',
    type: 'bun',
    proteins: 33,
    fat: 33,
    carbohydrates: 33,
    calories: 333,
    price: 100,
    image: 'bun-image-url',
    image_large: 'bun-image-url',
    image_mobile: 'bun-image-url',
    id: 'unique-test-bun-id'
  };

  const testMain: TConstructorIngredient = {
    _id: 'test-main-id',
    name: 'Тестовая котлета',
    type: 'main',
    proteins: 100,
    fat: 0,
    carbohydrates: 0,
    calories: 400,
    price: 150,
    image: 'main-image-url',
    image_large: 'main-image-url',
    image_mobile: 'main-image-url',
    id: 'unique-test-main-id'
  };

  const testSauce: TConstructorIngredient = {
    _id: 'test-sauce-id',
    name: 'Тестовый соус',
    type: 'sauce',
    proteins: 0,
    fat: 100,
    carbohydrates: 0,
    calories: 400,
    price: 200,
    image: 'sauce-image-url',
    image_large: 'sauce-image-url',
    image_mobile: 'sauce-image-url',
    id: 'unique-test-sauce-id'
  };

  const testOrder: TOrder = {
    _id: 'test-order-id',
    status: 'test-order-status',
    name: 'test-order',
    createdAt: 'test-order-created',
    updatedAt: 'test-order-updated',
    number: 100,
    ingredients: [testBun.id, testMain.id, testSauce.id]
  };

  const reducer = ConstructorSlice.reducer;

  test('Возвращает исходное состояние при неизвестном экшене', () => {
    const state = undefined;
    const action = { type: '' };
    expect(reducer(state, action)).toEqual(initialState);
  });

  test('Добавление ингредиентов', () => {
    const state = initialState;
    const action1: PayloadAction<TConstructorIngredient> = {
      type: addConstructorItems.type,
      payload: testBun
    };
    const action2: PayloadAction<TConstructorIngredient> = {
      type: addConstructorItems.type,
      payload: testMain
    };
    const action3: PayloadAction<TConstructorIngredient> = {
      type: addConstructorItems.type,
      payload: testSauce
    };
    const newState1 = reducer(state, action1);
    const newState2 = reducer(newState1, action2);
    const newState3 = reducer(newState2, action3);
    expect(newState3.constructorItems.bun).toEqual(testBun);
    expect(newState3.constructorItems.ingredients).toHaveLength(2);
    expect(newState3.constructorItems.ingredients[0]).toEqual(testMain);
    expect(newState3.constructorItems.ingredients[1]).toEqual(testSauce);
  });

  test('Удаление ингредиентов', () => {
    const state = {
      ...initialState,
      constructorItems: {
        bun: testBun,
        ingredients: [testMain, testSauce]
      }
    };
    const action1 = removeConstructorItems('unique-test-main-id');
    const action2 = removeConstructorItems('unique-test-sauce-id');
    const newState1 = reducer(state, action1);
    const newState2 = reducer(newState1, action2);
    expect(newState2.constructorItems.bun).toEqual(testBun);
    expect(newState2.constructorItems.ingredients).toHaveLength(0);
  });

  test('Перестановка ингредиентов', () => {
    const state = {
      ...initialState,
      constructorItems: {
        bun: testBun,
        ingredients: [testMain, testSauce]
      }
    };
    const action1 = moveUp(1);
    const newState1 = reducer(state, action1);
    expect(newState1.constructorItems.ingredients[0]).toEqual(testSauce);
    expect(newState1.constructorItems.ingredients[1]).toEqual(testMain);

    const action2 = moveDown(0);
    const newState2 = reducer(newState1, action2);
    expect(newState2.constructorItems.ingredients[0]).toEqual(testMain);
    expect(newState2.constructorItems.ingredients[1]).toEqual(testSauce);
  });

  test('Формирование заказа', () => {
    const state = initialState;
    const action1 = {
      type: fetchOrderBurger.pending.type
    };
    const newState1 = reducer(state, action1);
    expect(newState1.orderRequest).toBe(true);

    const action2 = {
      type: fetchOrderBurger.fulfilled.type,
      payload: {
        order: testOrder
      }
    };
    const newState2 = reducer(newState1, action2);
    expect(newState2.constructorItems.bun).toBeNull();
    expect(newState2.constructorItems.ingredients).toHaveLength(0);
    expect(newState2.orderRequest).toBe(false);
    expect(newState2.orderModalData).toEqual(testOrder);

    const action3 = {
      type: fetchOrderBurger.rejected.type
    };
    const newState3 = reducer(newState2, action3);
    expect(newState3.orderRequest).toBe(false);
  });
});
