import React, { useEffect, useState } from 'react';
import { getCliente } from '../services/clientes';
import { Cliente } from '../models/clientes';
import { Button, Drawer, Form, Input, Table } from "antd";
import DrawerFooter from './DrawerFooter';

const TablaClientes: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [open, setOpen] = useState(false);

  const columns = [
    {
      title: 'ID Cliente',
      dataIndex: 'id_cliente',
      key: 'id_cliente',
    },
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      key: 'nombre',
    },
    {
      title: 'Apellido',
      dataIndex: 'apellido',
      key: 'apellido',
    },
    {
      title: 'Fecha Nacimiento',
      dataIndex: 'fecha_nacimiento',
      key: 'fecha_nacimiento',
    },
    {
      title: 'Fecha Creación',
      dataIndex: 'fecha_creacion',
      key: 'fecha_creacion',
    },
    {
      title: 'Fecha Actualización',
      dataIndex: 'fecha_actualizacion',
      key: 'fecha_actualizacion',
    },
  ];

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const fetchedClientes = await getCliente();
        setClientes(fetchedClientes);
      } catch (error) {
        console.error("Error fetching clientes:", error);
      }
    };

    fetchClientes();
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
      <Table dataSource={clientes} columns={columns} />
      <Drawer title="Agregar " onClose={onClose} visible={open} footer={<DrawerFooter />}>
        <Form>
          <Form.Item label="Nombre" name="nombre"> 
            <Input />
          </Form.Item>
          <Form.Item label="Apellido" name="apellido"> 
            <Input />
          </Form.Item>
          <Form.Item label="Fecha Nacimiento" name="fecha_nacimiento"> 
            <Input />
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}

export default TablaClientes;
