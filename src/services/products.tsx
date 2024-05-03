import { supabase } from "../Utilidades/Supabase";
import { Product } from "../models/products";

export const getProducts = async (): Promise<Product[]> => {
    const { data , error} = await supabase.from("productos").select();
    if (error) throw error;
    return data
}