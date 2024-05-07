import { supabase } from "../Utilidades/Supabase";
import { Usuario} from "../models/usuarios";

export const getUsuario = async (): Promise<Usuario[]> => {
    const { data , error} = await supabase.from("usuarios").select();
    if (error) throw error;
    return data
}