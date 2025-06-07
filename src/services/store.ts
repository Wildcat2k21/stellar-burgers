import { combineSlices, configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector
} from 'react-redux';

import { IngredientsSlice } from './slices/IngredientsSlice';
import { ConstructorSlice } from './slices/ConstructorSlice';
import { FeedSlice } from './slices/FeedSlice';
import { OrderSlice } from './slices/OrderSlice';
import { UserSlice } from './slices/UserSlice';
import { ProfileOrdersSlice } from './slices/ProfileOrdersSlice';

export const rootReducer = combineSlices(
  IngredientsSlice,
  ConstructorSlice,
  FeedSlice,
  OrderSlice,
  UserSlice,
  ProfileOrdersSlice
);

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => useReduxDispatch();
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export default store;
