import { createContext, useEffect, useState } from 'react';

import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  // useEffect(() => {
  //   addCollectionAndDocuments('categories', SHOP_DATA).then()
  // }, [])

  // give out categories from firebase
  useEffect(() =>{
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      setCategoriesMap(categoryMap)
    }

    getCategoriesMap().then()

  }, [])

  const value = { categoriesMap };
  return (
    <CategoriesContext.Provider value={ value }>
      { children }
    </CategoriesContext.Provider>
  );
};
