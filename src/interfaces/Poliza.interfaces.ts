 
export interface Poliza {
  numeroPoliza: string;
  tipoPolizaId: number;
  tipoPolizaNombre: string;

  cedulaAsegurado: string;
  nombreAsegurado: string;
  primerApellidoAsegurado: string;
  segundoApellidoAsegurado: string;

  montoAsegurado: number;
  fechaVencimiento: string;
  fechaEmision: string;

  coberturaId: number;
  coberturaNombre: string;

  estadoPolizaId: number;
  estadoPolizaNombre: string;

  prima: number;
  periodo: string;
  fechaInclusion: string;

  aseguradora: string;
}

export interface PolizaCreateRequest {
  numeroPoliza: string;
  tipoPolizaId: number;
  cedulaAsegurado: string;
  montoAsegurado: number;
  fechaVencimiento: string; // ISO format
  fechaEmision: string;     // ISO format
  coberturaId: number;
  estadoPolizaId: number;
  prima: number;
  periodo: string;          // puede ser fecha o texto como "Anual"
  fechaInclusion: string;   // ISO format
  aseguradora: string;
}
