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
    },
    {
      title: 'fk_categoria',
      dataIndex: 'fk_categoria',
      key: 'fk_categoria',
    },
    {
      title: 'fecha_creacion',
      dataIndex: 'fecha_creacion',
      key: 'fecha_creacion',
    },

    {
      title: 'fecha_creacion',
      dataIndex: 'fecha_creacion',
      key: 'fecha_creacion',
    },

    {
      title: 'fecha_actualizacion',
      dataIndex: 'fecha_actualizacion',
      key: 'fecha_actualizacion',
    },




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
