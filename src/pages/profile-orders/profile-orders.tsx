import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getUserOrdersThunk, userOrdersSelector } from '@slices';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(userOrdersSelector);

  useEffect(() => {
    dispatch(getUserOrdersThunk());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
