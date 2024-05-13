export interface Product {
  id_producto?: number;
  descripcion: string | null;
  precio: number | null;
  fk_categoria?: number | null;
  fecha_creacion?: Date | null;
  fecha_actualizacion?: Date | null;
  fk_creado_por?: number | null;
  fk_actualizado?: number | null;
  fecha_eliminacion?: Date | null;
  fk_eliminado_por?: number | null;
}
