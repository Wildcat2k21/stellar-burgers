import {
  IngredientsSlice,
  fetchIngredients,
  initialState
} from '../../../services/slices/IngredientsSlice';

import { TIngredient } from '@utils-types';

describe('Тестирование FeedSlice', () => {
  const testBun: TIngredient = {
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
    image_mobile: 'bun-image-url'
  };

  const testMain: TIngredient = {
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
    image_mobile: 'main-image-url'
  };

  const testSauce: TIngredient = {
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
    image_mobile: 'sauce-image-url'
  };

  const reducer = IngredientsSlice.reducer;

  test('Возвращает исходное состояние при неизвестном экшене', () => {
    const state = undefined;
    const action = { type: '' };
    expect(reducer(state, action)).toEqual(initialState);
  });

  test('Загрузка списка ингредиентов', () => {
    const state = initialState;
    const action1 = {
      type: fetchIngredients.pending.type
    };
    const newState1 = reducer(state, action1);
    expect(newState1.loading).toBe(true);
    expect(newState1.error).toBeNull();

    const action2 = {
      type: fetchIngredients.fulfilled.type,
      payload: [testBun, testMain, testSauce]
    };
    const newState2 = reducer(newState1, action2);
    expect(newState2.ingredients[0]).toEqual(testBun);
    expect(newState2.ingredients[1]).toEqual(testMain);
    expect(newState2.ingredients[2]).toEqual(testSauce);
    expect(newState2.loading).toBe(false);
    expect(newState2.error).toBeNull();

    const action3 = {
      type: fetchIngredients.rejected.type
    };
    const newState3 = reducer(newState2, action3);
    expect(newState3.loading).toBe(false);
    expect(newState3.error).not.toBeNull();
  });
});
