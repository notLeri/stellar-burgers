import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useDispatch, useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';
import { getIngredientsThunk, ingredientsSelector } from '@slices';

export const IngredientDetails: FC = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const ingredients = useSelector(ingredientsSelector);

  const ingredientData = ingredients.find(
    (ingredient) => ingredient._id === params.id
  );

  useEffect(() => {
    dispatch(getIngredientsThunk());
  }, []);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
