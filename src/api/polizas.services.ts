import axios from "./axiosClient";
import { Poliza, PolizaCreateRequest } from "../interfaces/Poliza.interfaces";
import { Cobertura } from "../interfaces/Cobertura.interfaces";
import { EstadoPoliza } from "../interfaces/EstadoPoliza.interfaces";
import { TipoPoliza } from "../interfaces/TipoPoliza.interfaces";


export const getPolizas = async (): Promise<Poliza[]> => {
  const res = await axios.get<Poliza[]>("/poliza");
  return res.data;
};
// Crear una nueva póliza
export const postPoliza = async (nuevaPoliza: PolizaCreateRequest): Promise<void> => {
  const res = await axios.post<Poliza>("/poliza", nuevaPoliza);
};

// Obtener una póliza por ID
export const getPolizaById = async (numeroPoliza: string): Promise<PolizaCreateRequest> => {
  const response = await axios.get<PolizaCreateRequest>(`/poliza/${numeroPoliza}`);
  return response.data;
};
// Actualizar una póliza
export const putPoliza = async (numeroPoliza: string, data: PolizaCreateRequest): Promise<void> => {
  await axios.put(`/poliza/${numeroPoliza}`, data);
};
// Eliminar una póliza
export const deletePoliza = async (numeroPoliza: string): Promise<void> => {
  await axios.delete(`/poliza/${numeroPoliza}`);
};

export const buscarPolizas = async (filtros: any): Promise<Poliza[]> => {
  const res = await axios.post<Poliza[]>("/Poliza/buscar", filtros);
  return res.data;
};

// Obtener todas las coberturas
export const getCoberturas = async (): Promise<Cobertura[]> => {
  const res = await axios.get<Cobertura[]>("/Coberturas");
  return res.data;
};

// Obtener todos los estados de póliza
export const getEstadosPoliza = async (): Promise<EstadoPoliza[]> => {
  const res = await axios.get<EstadoPoliza[]>("/EstadoPolizas");
  return res.data;
};


// Obtener todos los tipos de póliza
export const getTiposPoliza = async (): Promise<TipoPoliza[]> => {
  const res = await axios.get<TipoPoliza[]>("/TipoPolizas");
  return res.data;
};
