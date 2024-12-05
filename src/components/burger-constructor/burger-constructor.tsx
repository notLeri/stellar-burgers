import { FC, useEffect, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  addIngr,
  burgerConstructorSelector,
  checkUserAuthThunk,
  ingrArrSelector,
  orderBurgerThunk,
  orderModalDataSelector,
  orderRequestSelector,
  resetConstructor,
  starterBunSelector,
  userDataSelector
} from '@slices';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(userDataSelector);
  const ingrArr = useSelector(ingrArrSelector);
  const initialBun = useSelector(starterBunSelector);
  const orderRequest = useSelector(orderRequestSelector);
  const orderModalData = useSelector(orderModalDataSelector);
  const constructorItems = useSelector(burgerConstructorSelector);

  useEffect(() => {
    dispatch(checkUserAuthThunk());
  }, [dispatch]);

  useEffect(() => {
    if (!constructorItems.bun && initialBun) {
      dispatch(addIngr(initialBun));
    }
  }, [initialBun]);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (user) {
      dispatch(orderBurgerThunk(ingrArr));
      dispatch(resetConstructor());
    }
  };
  const closeOrderModal = () => {
    navigate('/feed');
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
