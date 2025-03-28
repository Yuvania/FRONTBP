import axios from "./axiosClient";
import { Asegurado } from "../interfaces/Asegurado.interfaces";

export const getAsegurados = async (): Promise<Asegurado[]> => {
  const response = await axios.get<Asegurado[]>("/Asegurados");
  return response.data;
};

export const getAseguradoById = async (cedula: string): Promise<Asegurado> => {
  const res = await axios.get<Asegurado>(`/Asegurados/${cedula}`);
  return res.data;
};


export const postAsegurado = async (nuevoAsegurado: Asegurado): Promise<Asegurado> => {
  const response = await axios.post<Asegurado>("/Asegurados", nuevoAsegurado);
  return response.data;
};

export const putAsegurado = async (cedula: string, data: Asegurado): Promise<void> => {
  await axios.put(`/Asegurados/${cedula}`, data);
};

export const deleteAsegurado = async (cedula: string): Promise<void> => {
  try {
    await axios.delete(`/Asegurados/${cedula}`);
  } catch (error: any) {
    const mensaje = error.response?.data?.mensaje || "Error al eliminar el asegurado";
    throw new Error(mensaje);
  }
};
