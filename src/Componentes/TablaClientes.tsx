import React, { useEffect, useState } from 'react';
import { createCliente, getCliente } from '../services/clientes';
import { Cliente } from '../models/clientes';
import { Button, Drawer, Form, Input, Table, DatePicker } from "antd";
import type { DatePickerProps } from 'antd';
import DrawerFooter from './DrawerFooter';

const TablaClientes: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [open, setOpen] = useState(false);
  const [nombre, setNombre] = useState<string>('');
  const [apellido, setApellido] = useState<string>('');
  const [fechaNacimiento, setfechaNacimiento] = useState<Date>(new Date());
  

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

  const onChange: DatePickerProps['onChange'] = (date) => {
    const selectedDate = new Date(date.year(), date.month() + 1, date.date());
    const randomID =  Math.floor(Math.random() * (5 - 1 + 1)) + 1;
    setfechaNacimiento(selectedDate);
  };

  const handleSubmit = async () => {
    try {
      await createCliente({
         nombre,
         apellido,
         fecha_nacimiento: fechaNacimiento,     
        }); // Llama a createUsuario con los datos del formulario
      // Luego puedes volver a cargar la lista de usuarios para actualizar la tabla
      const updatedClientes = await getCliente();
      setClientes(updatedClientes);
      onClose(); // Cierra el Drawer después de crear el usuario
    } catch (error) {
      console.error("Error creando cliente:", error);
    }
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        Open
      </Button>
      <Table dataSource={clientes} columns={columns} />
      <Drawer title="Agregar " onClose={onClose} visible={open} footer={<DrawerFooter createRecord={handleSubmit}/>}>
        <Form>
          <Form.Item label="Nombre" name="nombre"> 
          <Input value={nombre} onChange={(e) => setNombre(e.target.value)} />
          </Form.Item>
          <Form.Item label="Apellido" name="apellido"> 
          <Input value={apellido} onChange={(e) => setApellido(e.target.value)} />
          </Form.Item>
          <Form.Item label="Fecha Nacimiento" name="fecha_nacimiento"> 
          <DatePicker onChange={onChange} />
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}

export default TablaClientes;
