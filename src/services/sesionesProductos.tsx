import { supabase } from "../Utilidades/Supabase";
import { SesionProducto } from "../models/sesionesProductos";

export const getSesionProducto = async (): Promise<SesionProducto[]> => {
    const { data , error} = await supabase.from("sesionesproductos").select();
    if (error) throw error;
    return data
}