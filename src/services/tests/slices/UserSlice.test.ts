/**
 * @jest-environment jsdom
 */
import {
  UserSlice,
  initialState,
  registerUser,
  loginUser,
  getUser,
  updateUser,
  logout
} from '../../slices/UserSlice';
import type { TUser } from '../../../utils/types';

describe('Тестирование UserSlice', () => {
  const testUser: TUser = {
    email: 'test@email.com',
    name: 'testname'
  };

  const reducer = UserSlice.reducer;

  test('Возвращает исходное состояние при неизвестном экшене', () => {
    const state = undefined;
    const action = { type: '' };
    const newState = reducer(state, action);
    expect(newState).toEqual(initialState);
  });

  test('Регистрация', () => {
    const state = initialState;
    const action = {
      type: registerUser.fulfilled.type,
      payload: {
        accessToken: '',
        refreshToken: '',
        user: testUser
      }
    };
    const newState = reducer(state, action);

    expect(newState.email).toBe(testUser.email);
    expect(newState.name).toBe(testUser.name);
  });

  test('Логин', () => {
    const state = initialState;
    const action = {
      type: loginUser.fulfilled.type,
      payload: {
        accessToken: '',
        refreshToken: '',
        user: testUser
      }
    };
    const newState = reducer(state, action);

    expect(newState.email).toBe(testUser.email);
    expect(newState.name).toBe(testUser.name);
  });

  test('Информация о пользователе', () => {
    const state = initialState;
    const action = {
      type: getUser.fulfilled.type,
      payload: {
        accessToken: '',
        refreshToken: '',
        user: testUser
      }
    };
    const newState = reducer(state, action);

    expect(newState.email).toBe(testUser.email);
    expect(newState.name).toBe(testUser.name);
  });

  test('Обновление информации', () => {
    const state = initialState;
    const action = {
      type: updateUser.fulfilled.type,
      payload: {
        accessToken: '',
        refreshToken: '',
        user: testUser
      }
    };
    const newState = reducer(state, action);

    expect(newState.email).toBe(testUser.email);
    expect(newState.name).toBe(testUser.name);
  });

  test('Логаут', () => {
    const state = initialState;
    const action = {
      type: logout.fulfilled.type
    };
    const newState = reducer(state, action);
    expect(newState.email).toBe('');
    expect(newState.name).toBe('');
  });
});