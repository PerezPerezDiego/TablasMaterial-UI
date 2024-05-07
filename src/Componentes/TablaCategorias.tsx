import React, { useEffect, useState } from 'react';
import {getCategoria}from '../services/categorias'
import { Categoria } from '../models/categorias';
import { Table } from "antd";

const TablaCategorias: React.FC =() => {
  const [categorias, setCategoria] = useState<Categoria[]>([]);

  const columns = [
    {
      title: 'id_categoria',
      dataIndex: 'id_categoria',
      key: 'id_categoria',
    },

    {
        title: 'nombre',
        dataIndex: 'nombre',
        key: 'nombre',
    },

    {
        title: 'fecha_creacion',
        dataIndex: 'fecha_creacion',
        key: 'fecha_creacion',
    },

    {
        title: 'fecha_actualizado',
        dataIndex: 'fecha_actualizado',
        key: 'fecha_actualizado',
    },

    {
        title: 'fk_creado_por',
        dataIndex: 'fk_creado_por',
        key: 'fk_creado_por',
    },

    {
        title: 'fk_creado_por',
        dataIndex: 'fk_creado_por',
        key: 'fk_creado_por',
    },




  ];

  useEffect(() => {
    const fetchCategoria = async () => {
      try {
        const categorias = await getCategoria();
        setCategoria(categorias);
      } catch (error) {
        console.error("Error fetching categorias:", error);
      }
    };

    fetchCategoria();
  }, []);

  
  return (
  <Table dataSource={categorias} columns={columns} />
  );
  
}

export default TablaCategorias;
