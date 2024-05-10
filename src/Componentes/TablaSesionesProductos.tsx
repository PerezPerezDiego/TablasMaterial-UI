import React, { useEffect, useState } from 'react';
import { getSesionProducto } from '../services/sesionesProductos';
import { SesionProducto } from '../models/sesionesProductos';
import { Button, Drawer, Form, Input, Table } from "antd";
import DrawerFooter from './DrawerFooter';

const TablaSesionesProductos: React.FC = () => {
  const [sesionesproductos, setSesionesProductos] = useState<SesionProducto[]>([]);
  const [open, setOpen] = useState(false);
  
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
      <Drawer title="Agregar usuario" onClose={onClose} visible={open} footer={<DrawerFooter/>}>
        <Form>
          <Form.Item label="cantidad" name="cantidad"> 
            <Input />
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}

export default TablaSesionesProductos;
