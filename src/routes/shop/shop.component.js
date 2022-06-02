import React from 'react';
import './shop.styles.scss';
import { useContext } from 'react';
import { ProductsContext } from '../../context/products.context';
import ProductCard from '../../components/product-card/product-card.component';

const Shop = () => {

  // context
  const { products } = useContext(ProductsContext);
  return (
    <div className='products-container'>
      {
        products.map(product => <ProductCard key={product.id} {...product}/>)
      }
    </div>
  );
};

export default Shop;