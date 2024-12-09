import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getFeedsThunk, getIngredientsThunk, ordersSelector } from '@slices';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(ordersSelector);

  useEffect(() => {
    dispatch(getFeedsThunk());
    dispatch(getIngredientsThunk());
  }, []);

  function handleGetFeeds() {
    dispatch(getFeedsThunk());
  }

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
