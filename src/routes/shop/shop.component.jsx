import './shop.styles.scss';
import { Routes, Route } from 'react-router-dom';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCategoriesAsync } from '../../store/categories/category.action';

const Shop = () => {

  /* R E D U X  */
  // only once to fill the page
  // useEffect(() => {
  //   addCollectionAndDocuments('categories', SHOP_DATA).then()
  // }, [])
  const dispatch = useDispatch();

  // give out categories from firebase with help redux-thunk
  useEffect(() => {
    dispatch(fetchCategoriesAsync());
  }, []);


  return (
    <Routes>
      <Route index element={ <CategoriesPreview /> } />
      <Route path=":category" element={ <Category /> } />
    </Routes>
  );
};

export default Shop;