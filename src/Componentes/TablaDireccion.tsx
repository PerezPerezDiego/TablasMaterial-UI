import React, { useEffect, useState } from 'react';
import { getDireccion } from '../services/direccion';
import { Direccion } from '../models/direccion';
import { Table } from "antd";

const TablaDireccion: React.FC = () => {
  const [direccion, setDireccion] = useState<Direccion[]>([]);

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
        const direccion = await getDireccion();
        setDireccion(direccion);
      } catch (error) {
        console.error("Error fetching direccion:", error);
      }
    };

    fetchDireccion();
  }, []);

  return (
    <Table dataSource={direccion} columns={columns} />
  );
}

export default TablaDireccion;
