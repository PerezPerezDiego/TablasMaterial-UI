export interface Cliente {
    id_cliente: number;
    nombre: string;
    apellido: string;
    fecha_nacimiento: Date;
    fk_genero: number;
    telefono: string;
    correo: string;
    fk_direccion: number;
    fecha_creacion: Date;
    fecha_actualizacion: Date;
    fk_creado_por: number;
    fk_actualizado: number;
    fecha_eliminado?: Date | null;
    fk_eliminado?: number | null;
  }
  