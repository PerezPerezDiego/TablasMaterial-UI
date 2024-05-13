import React, { useEffect, useState } from 'react';
import { createSesion, getSesion } from '../services/sesiones';
import { Sesion } from '../models/sesiones';
import { Button, Drawer, Form, DatePicker, Table } from "antd";
import moment from 'moment';
import DrawerFooter from './DrawerFooter';

const TablaSesiones: React.FC = () => {
  const [sesion, setSesion] = useState<Sesion[]>([]);
  const [open, setOpen] = useState(false);
  const [horaSesion, setHoraSesion] = useState<string>('');

  const columns = [
    {
      title: 'id_sesion',
      dataIndex: 'id_sesion',
      key: 'id_sesion',
    },
    {
        title: 'hora_sesion',
        dataIndex: 'hora_sesion',
        key: 'hora_sesion',
    },
  ];


  useEffect(() => {
    const fetchSesion = async () => {
      try {
        const data = await getSesion();
        setSesion(data);
      } catch (error) {
        console.error("Error fetching sesion:", error);
      }
    };

    fetchSesion();
  }, []);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onChange = (time: string) => {
    const formattedTime = moment(new Date(time)).format('HH:mm:ss');
    setHoraSesion(formattedTime);
  };

  const handleSubmit = async () => {
    try {
      await createSesion({
        hora_sesion: horaSesion }); // Llama a createUsuario con los datos del formulario
      // Luego puedes volver a cargar la lista de usuarios para actualizar la tabla
      const updateSesion = await getSesion();
      setSesion(updateSesion);
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
      <Table dataSource={sesion} columns={columns} />
      <Drawer title="Agregar hora_sesion " onClose={onClose} visible={open} footer={<DrawerFooter createRecord={handleSubmit}/>}>
        <Form>
          <Form.Item label="Hora" name="hora_sesion"> 
          <DatePicker picker={'time'} onChange={onChange} />
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}

export default TablaSesiones;