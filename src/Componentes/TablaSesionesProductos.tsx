import React, { useEffect, useState } from 'react';
import { getSesionProducto, createSesionProducto } from '../services/sesionesProductos';
import { SesionProducto } from '../models/sesionesProductos';
import { Button, Drawer, Form, Table, InputNumber } from "antd";
import type { InputNumberProps } from 'antd';
import DrawerFooter from './DrawerFooter';

const TablaSesionesProductos: React.FC = () => {
  const [sesionesproductos, setSesionesProductos] = useState<SesionProducto[]>([]);
  const [open, setOpen] = useState(false);
  const [cantidad, setCantidad] = useState<number>(0);
  
  const columns = [
    {
      title: 'fk_sesion',
      dataIndex: 'fk_sesion',
      key: 'fk_sesion',
    },
    {
        title: 'fk_producto',
        dataIndex: 'fk_producto',
        key: 'fk_producto',
    },
    {
        title: 'cantidad',
        dataIndex: 'cantidad',
        key: 'cantidad',
    },
  ];


  
  const onChange: InputNumberProps['onChange'] = (value) => {
    if (value !== null && typeof value === 'number') {
      setCantidad(value);
    } else {
      setCantidad(0);
    }
  };
  
  const handleSubmit = async () => {
    const randomID =  Math.floor(Math.random() * (5 - 1 + 1)) + 1;
    try {
      await createSesionProducto({
        fk_sesion: randomID,
        fk_producto: randomID,
        cantidad  }); // Llama a createUsuario con los datos del formulario
      // Luego puedes volver a cargar la lista de usuarios para actualizar la tabla
      const updateSesionesProductos = await getSesionProducto();
      setSesionesProductos(updateSesionesProductos);
      onClose(); // Cierra el Drawer después de crear el usuario
    } catch (error) {
      console.error("Error creating usuario:", error);
    }
  };
  

  useEffect(() => {
    const fetchSesionProducto = async () => {
      try {
        const sesion = await getSesionProducto();
        setSesionesProductos(sesion);
        // Assuming 'usuarios' is the correct state to update
        setSesionesProductos(sesion); 
      } catch (error) {
        console.error("Error fetching sesion:", error);
      }
    };

    fetchSesionProducto();
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
      <Table dataSource={sesionesproductos} columns={columns} />
      <Drawer title="Agregar " onClose={onClose} visible={open} footer={<DrawerFooter createRecord={handleSubmit}/>}>
        <Form>
          <Form.Item label="cantidad" name="cantidad"> 
          <InputNumber defaultValue={cantidad} onChange={onChange} />
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}

export default TablaSesionesProductos;
