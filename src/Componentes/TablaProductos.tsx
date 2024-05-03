import React, { useEffect, useState } from 'react';
import {getProducts}from '../services/products'
import { Product } from '../models/products';

const TablaProductos: React.FC =() => {
  const [products, setProductos] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts();
        setProductos(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  
    return (
    <>{products.forEach((product)=>{<h2>{product.descripcion}</h2>})}</>
    );
}

export default TablaProductos;
