import { IngredientsSlice } from '../slices/IngredientsSlice';
import { ConstructorSlice } from '../slices/ConstructorSlice';
import { FeedSlice } from '../slices/FeedSlice';
import { OrderSlice } from '../slices/OrderSlice';
import { UserSlice } from '../slices/UserSlice';
import { ProfileOrdersSlice } from '../slices/ProfileOrdersSlice';

import { rootReducer } from '../store';

describe('Проверка инициализации rootReducer', () => {
  it('Содержит поля со всеми слайсами', () => {
    const rootStateKeys = Object.keys(rootReducer({}, { type: '' }));
    expect(rootStateKeys).toEqual(
      expect.arrayContaining([
        IngredientsSlice.name,
        ConstructorSlice.name,
        FeedSlice.name,
        OrderSlice.name,
        UserSlice.name,
        ProfileOrdersSlice.name
      ])
    );
  });
});
