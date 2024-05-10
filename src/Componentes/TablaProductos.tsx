import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/products';
import { Product } from '../models/products';
import { Button, Drawer, Form, Input, Table } from "antd";
import DrawerFooter from './DrawerFooter';

const TablaProductos: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);

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
      title: 'fecha_actualizacion',
      dataIndex: 'fecha_actualizacion',
      key: 'fecha_actualizacion',
    },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        Open
      </Button>
      <Table dataSource={products} columns={columns} />
      <Drawer title="Agregar " onClose={onClose} visible={open} footer={<DrawerFooter />}>
        <Form>
          <Form.Item label="Descripcion" name="descripcion"> 
            <Input />
          </Form.Item>
          <Form.Item label="Precio" name="precio"> 
            <Input />
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}

export default TablaProductos;
