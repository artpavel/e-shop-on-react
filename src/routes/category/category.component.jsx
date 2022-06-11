import './category.styles.scss';
import { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/product-card/product-card.component';
import { useSelector } from 'react-redux';
import { selectCategoriesMap } from '../../store/categories/category.selector';

const Category = () => {
  const { category } = useParams();
  // redux
  const categoriesMap = useSelector(selectCategoriesMap);
  // state
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <h2 className="category-title">{ category.toUpperCase() }</h2>
      <div className="category-container">
        {
          products &&
          products.map(product => (
            <ProductCard key={ product.id } product={ product } />))
        }
      </div>
    </Fragment>
  );
};

export default Category;