import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getIngredientsThunk,
  getUserOrdersThunk,
  userOrdersSelector
} from '@slices';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(userOrdersSelector);

  useEffect(() => {
    dispatch(getUserOrdersThunk());
    dispatch(getIngredientsThunk());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
