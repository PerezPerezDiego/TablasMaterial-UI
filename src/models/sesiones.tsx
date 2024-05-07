export interface Sesion {
    id_sesion: number;
    fecha_sesion: Date;
    hora_sesion: string; // Puede ser útil usar un tipo específico para manejar la hora en TypeScript, como 'moment' o 'date-fns'.
    fk_cliente: number;
    fecha_venta: Date;
    fecha_creacion: Date;
    fecha_actualizacion: Date;
    fk_creado_por: number;
    fk_actualizado_por: number;
    fecha_eliminacion?: Date | null;
    fk_eliminado_por?: number | null;
  }
  