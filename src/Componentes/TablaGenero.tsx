import React, { useEffect, useState } from 'react';
import { createGenero, getGenero } from '../services/genero';
import { Genero } from '../models/genero';
import { Button, Drawer, Form, Input, Table } from "antd";
import DrawerFooter from './DrawerFooter';

const TablaGenero: React.FC = () => {
  const [generos, setGeneros] = useState<Genero[]>([]);
  const [open, setOpen] = useState(false);
  const [genero, setGenero] = useState<string>('');

  const columns = [
    {
      title: 'id_genero',
      dataIndex: 'id_genero',
      key: 'id_genero',
    },
    {
        title: 'genero',
        dataIndex: 'genero',
        key: 'genero',
    },
    
  ];

  useEffect(() => {
    const fetchGenero = async () => {
      try {
        const fetchedGenero = await getGenero();
        setGeneros(fetchedGenero);
      } catch (error) {
        console.error("Error fetching genero:", error);
      }
    };

    fetchGenero();
  }, []);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    try {
      await createGenero({
        genero }); // Llama a createUsuario con los datos del formulario
      // Luego puedes volver a cargar la lista de usuarios para actualizar la tabla
      const updateGeneros = await getGenero();
      setGeneros(updateGeneros);
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
      <Table dataSource={generos} columns={columns} />
      <Drawer title="Agregar " onClose={onClose} visible={open} footer={<DrawerFooter createRecord={handleSubmit}/>}>
        <Form>
          <Form.Item label="Genero" name="genero"> 
          <Input value={genero} onChange={(e) => setGenero(e.target.value)} />
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}

export default TablaGenero;