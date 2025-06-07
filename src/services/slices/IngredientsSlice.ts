import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';

export const fetchIngredients = createAsyncThunk<TIngredient[]>(
  'ingredients/all',
  async () => await getIngredientsApi()
);

interface IngredientsState {
  ingredients: TIngredient[];
  loading: boolean;
  error: string | null;
}

export const initialState: IngredientsState = {
  ingredients: [],
  loading: false,
  error: null
};

export const IngredientsSlice = createSlice({
  name: 'IngredientsSlice',
  initialState,
  selectors: {
    selectIngredients: (state) => state.ingredients,
    selectIngredientsLoading: (state) => state.loading,
    selectIngredientsError: (state) => state.error
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state) => {
        state.loading = false;
        state.error = 'Error while loading ingredients';
      });
  }
});

export const {
  selectIngredients,
  selectIngredientsLoading,
  selectIngredientsError
} = IngredientsSlice.selectors;
