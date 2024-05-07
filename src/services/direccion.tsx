import { supabase } from "../Utilidades/Supabase";
import { Direccion } from "../models/direccion";

export const getDireccion = async (): Promise<Direccion[]> => {
    const { data , error} = await supabase.from("direccion").select();
    if (error) throw error;
    return data
}