import React, { useEffect, useState } from 'react';
import { getDireccion } from '../services/direccion';
import { Direccion } from '../models/direccion';
import { Button, Drawer, Form, Input, Table } from "antd";
import DrawerFooter from './DrawerFooter';

const TablaDireccion: React.FC = () => {
  const [direccion, setDireccion] = useState<Direccion[]>([]);
  const [open, setOpen] = useState(false);

  const columns = [
    {
      title: 'id_direccion',
      dataIndex: 'id_direccion',
      key: 'id_direccion',
    },
    {
        title: 'codigo_postal',
        dataIndex: 'codigo_postal',
        key: 'codigo_postal',
    },
    {
        title: 'calle',
        dataIndex: 'calle',
        key: 'calle',
    },
    {
        title: 'colonia',
        dataIndex: 'colonia',
        key: 'colonia',
    },
    {
        title: 'num_ext',
        dataIndex: 'num_ext',
        key: 'num_ext',
    },
    {
        title: 'num_int',
        dataIndex: 'num_int',
        key: 'num_int',
    },
    {
        title: 'ciudad',
        dataIndex: 'ciudad',
        key: 'ciudad',
    },
  ];

  useEffect(() => {
    const fetchDireccion = async () => {
      try {
        const fetchedDireccion = await getDireccion();
        setDireccion(fetchedDireccion);
      } catch (error) {
        console.error("Error fetching direccion:", error);
      }
    };

    fetchDireccion();
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
      <Table dataSource={direccion} columns={columns} />
      <Drawer title="Agregar " onClose={onClose} visible={open} footer={<DrawerFooter />}>
        <Form>
          <Form.Item label="Codigo Postal" name="codigo_postal"> 
            <Input />
          </Form.Item>
          <Form.Item label="Calle" name="calle"> 
            <Input />
          </Form.Item>
          <Form.Item label="Colonia" name="colonia"> 
            <Input />
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}

export default TablaDireccion;
