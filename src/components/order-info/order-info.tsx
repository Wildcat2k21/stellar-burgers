import { FC, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useSelector } from '../../services/store';
import { selectIngredients } from '../../services/slices/IngredientsSlice';
import { useParams } from 'react-router-dom';
import {
  fetchOrderByNumber,
  selectOrder
} from '../../services/slices/OrderSlice';
import { useEffect } from 'react';
import { useDispatch } from '../../services/store';

export const OrderInfo: FC = () => {
  const number = Number(useParams().number);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOrderByNumber(number));
  }, [dispatch, number]);

  const ingredients: TIngredient[] = useSelector(selectIngredients);
  const orderData = useSelector(selectOrder);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
