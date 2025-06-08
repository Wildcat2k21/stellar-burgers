import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction
} from '@reduxjs/toolkit';
import type {
  TConstructorIngredient,
  TIngredient,
  TOrder
} from '../../utils/types';
import { orderBurgerApi } from '@api';

export const fetchOrderBurger = createAsyncThunk(
  'constructor/orderBurger',
  async (data: string[]) => await orderBurgerApi(data)
);

interface ConstructorState {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
}

export const initialState: ConstructorState = {
  constructorItems: { bun: null, ingredients: [] },
  orderRequest: false,
  orderModalData: null
};

export const ConstructorSlice = createSlice({
  name: 'ConstructorSlice',
  initialState,
  selectors: {
    selectConstructorItems: (state) => state.constructorItems,
    selectOrderRequest: (state) => state.orderRequest,
    selectModalData: (state) => state.orderModalData
  },
  reducers: {
    addConstructorItems: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = action.payload;
        } else {
          state.constructorItems.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    removeConstructorItems: (state, action: PayloadAction<string>) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (ingredient) => ingredient.id != action.payload
        );
    },
    clearConstructorItems: (state) => {
      state.constructorItems.bun = null;
      state.constructorItems.ingredients = [];
      state.orderModalData = null;
    },
    moveDown: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index < 0 || index >= state.constructorItems.ingredients.length - 1)
        return;
      const temp = state.constructorItems.ingredients[index];
      state.constructorItems.ingredients[index] =
        state.constructorItems.ingredients[index + 1];
      state.constructorItems.ingredients[index + 1] = temp;
    },
    moveUp: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index <= 0 || index >= state.constructorItems.ingredients.length)
        return;
      const temp = state.constructorItems.ingredients[index];
      state.constructorItems.ingredients[index] =
        state.constructorItems.ingredients[index - 1];
      state.constructorItems.ingredients[index - 1] = temp;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderBurger.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(fetchOrderBurger.fulfilled, (state, action) => {
        state.constructorItems = { bun: null, ingredients: [] };
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      })
      .addCase(fetchOrderBurger.rejected, (state) => {
        state.orderRequest = false;
      });
  }
});

export const {
  addConstructorItems,
  removeConstructorItems,
  clearConstructorItems,
  moveDown,
  moveUp
} = ConstructorSlice.actions;

export const { selectConstructorItems, selectOrderRequest, selectModalData } =
  ConstructorSlice.selectors;
