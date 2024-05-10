import React, { useEffect, useState } from 'react';
import { getCategoria } from '../services/categorias';
import { Categoria } from '../models/categorias';
import { Button, Drawer, Form, Input, Table } from "antd";
import DrawerFooter from './DrawerFooter';

const TablaCategorias: React.FC = () => {
  const [categorias, setCategoria] = useState<Categoria[]>([]);
  const [open, setOpen] = useState(false);

  const columns = [
    {
      title: 'ID Categoría',
      dataIndex: 'id_categoria',
      key: 'id_categoria',
    },
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      key: 'nombre',
    },
    {
      title: 'Fecha Creación',
      dataIndex: 'fecha_creacion',
      key: 'fecha_creacion',
    },
    {
      title: 'Fecha Actualización',
      dataIndex: 'fecha_actualizado',
      key: 'fecha_actualizado',
    },
    {
      title: 'FK Creado Por',
      dataIndex: 'fk_creado_por',
      key: 'fk_creado_por',
    },
  ];

  useEffect(() => {
    const fetchCategoria = async () => {
      try {
        const fetchedCategorias = await getCategoria();
        setCategoria(fetchedCategorias);
      } catch (error) {
        console.error("Error fetching categorias:", error);
      }
    };

    fetchCategoria();
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
      <Table dataSource={categorias} columns={columns} />
      <Drawer title="Agregar Categoría" onClose={onClose} visible={open} footer={<DrawerFooter />}>
        <Form>
          <Form.Item label="Nombre" name="nombre"> 
            <Input />
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}

export default TablaCategorias;
