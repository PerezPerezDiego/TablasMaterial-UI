import React, { useEffect, useState } from 'react';
import { createProducts, getProducts } from '../services/products';
import { Product } from '../models/products';
import { Button, Drawer, Form, Input, Table,InputNumber } from "antd";
import type { InputNumberProps } from 'antd';
import DrawerFooter from './DrawerFooter';

const TablaProductos: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);
  const [descripcion, setDescripcion] = useState<string>('');
  const [precio, setPrecio] = useState<number>(0);

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

  const onChange: InputNumberProps['onChange'] = (value) => {
    if (value !== null && typeof value === 'number') {
      setPrecio(value);
    } else {
      setPrecio(0);
    }
  };

  const handleSubmit = async () => {
    const randomID =  Math.floor(Math.random() * (5 - 1 + 1)) + 1;
    try {
      await createProducts({
         descripcion,
         precio,
         fk_categoria: randomID,
        }); // Llama a createUsuario con los datos del formulario
      // Luego puedes volver a cargar la lista de usuarios para actualizar la tabla
      const updatedUsuarios = await getProducts();
      setProducts(updatedUsuarios);
      onClose(); // Cierra el Drawer después de crear el usuario
    } catch (error) {
      console.error("Error creating usuario:", error);
    }
  };


  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        Open
      </Button>
      <Table dataSource={products} columns={columns} />
      <Drawer title="Agregar " onClose={onClose} visible={open} footer={<DrawerFooter createRecord={handleSubmit}/>}>
        <Form>
          <Form.Item label="Descripcion" name="descripcion"> 
          <Input value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
          </Form.Item>
          <Form.Item label="Precio" name="precio"> 
          <InputNumber addonAfter="$" value={precio} defaultValue={0} onChange={onChange}  />
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}

export default TablaProductos;
