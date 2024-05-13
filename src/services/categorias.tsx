import { supabase } from "../Utilidades/Supabase";
import { Categoria } from "../models/categorias";

export const getCategoria = async (): Promise<Categoria[]> => {
    const { data , error} = await supabase.from("categorias").select();
    if (error) throw error;
    return data
}


export const createCategoria = async (categoria: Categoria): Promise<void> => {
    const { error} = await supabase.from("categorias").insert(categoria);
    if (error) throw error;
}