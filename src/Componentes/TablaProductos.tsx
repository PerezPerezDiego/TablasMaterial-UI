import React, { useEffect, useState } from 'react';
import {getProducts}from '../services/products'
import { Product } from '../models/products';
import { Table } from "antd";

const TablaProductos: React.FC =() => {
  const [products, setProducts] = useState<Product[]>([]);

  const columns = [
    {
      title: 'Descripcion',
      dataIndex: 'descripcion',
      key: 'descripcion',
    },
    {
      title: 'Precio',
      dataIndex: 'precio',
      key: 'precio',
    }
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts();
        setProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  
  return (
  <Table dataSource={products} columns={columns} />
  );
  
}

export default TablaProductos;
