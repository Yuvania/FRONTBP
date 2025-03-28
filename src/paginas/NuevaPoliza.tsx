import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PolizaCreateRequest } from "../interfaces/Poliza.interfaces";
import { Asegurado } from "../interfaces/Asegurado.interfaces";
import { Cobertura } from "../interfaces/Cobertura.interfaces";
import { EstadoPoliza } from "../interfaces/EstadoPoliza.interfaces";
import { TipoPoliza } from "../interfaces/TipoPoliza.interfaces";
import {
  postPoliza,
  getPolizaById,
  putPoliza,
  getCoberturas,
  getEstadosPoliza,
  getTiposPoliza
} from "../api/polizas.services";
import { getAsegurados } from "../api/asegurado.services";

const NuevaPoliza = () => {
  const navigate = useNavigate();
  const { numeroPoliza } = useParams();
  const esEdicion = !!numeroPoliza;

  const [asegurados, setAsegurados] = useState<Asegurado[]>([]);
  const [coberturas, setCoberturas] = useState<Cobertura[]>([]);
  const [estadosPoliza, setEstadosPoliza] = useState<EstadoPoliza[]>([]);
  const [tiposPoliza, setTiposPoliza] = useState<TipoPoliza[]>([]);

  const [formData, setFormData] = useState<PolizaCreateRequest>({
    numeroPoliza: "",
    tipoPolizaId: 0,
    cedulaAsegurado: "",
    montoAsegurado: 0,
    fechaVencimiento: "",
    fechaEmision: "",
    coberturaId: 0,
    estadoPolizaId: 0,
    prima: 0,
    periodo: "",
    fechaInclusion: "",
    aseguradora: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [asegData, cobData, estData, tipoData] = await Promise.all([
          getAsegurados(),
          getCoberturas(),
          getEstadosPoliza(),
          getTiposPoliza(),
        ]);

        setAsegurados(asegData);
        setCoberturas(cobData);
        setEstadosPoliza(estData);
        setTiposPoliza(tipoData);

        if (esEdicion && numeroPoliza) {
          const poliza = await getPolizaById(numeroPoliza);
          setFormData({
            numeroPoliza: poliza.numeroPoliza,
            tipoPolizaId: poliza.tipoPolizaId,
            cedulaAsegurado: poliza.cedulaAsegurado,
            montoAsegurado: poliza.montoAsegurado,
            fechaVencimiento: poliza.fechaVencimiento,
            fechaEmision: poliza.fechaEmision,
            coberturaId: poliza.coberturaId,
            estadoPolizaId: poliza.estadoPolizaId,
            prima: poliza.prima,
            periodo: poliza.periodo,
            fechaInclusion: poliza.fechaInclusion,
            aseguradora: poliza.aseguradora
          });
        }
      } catch (error) {
        console.error("Error al cargar datos iniciales:", error);
      }
    };

    fetchData();
  }, [esEdicion, numeroPoliza]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "montoAsegurado" || name === "prima" || name.endsWith("Id")
        ? Number(value)
        : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (esEdicion && numeroPoliza) {
        await putPoliza(numeroPoliza, formData);
        alert("Póliza actualizada con éxito.");
      } else {
        await postPoliza(formData);
        alert("Póliza registrada con éxito.");
      }

      navigate("/dashboard/polizas");
    } catch (error) {
      console.error("Error al guardar la póliza:", error);
      alert("Ocurrió un error al guardar.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>{esEdicion ? "Editar Póliza" : "Registrar Nueva Póliza"}</h2>
      <form onSubmit={handleSubmit} className="row g-3">
        {!esEdicion && (
          <div className="col-md-4">
            <label className="form-label">Número de Póliza</label>
            <input type="text" className="form-control" name="numeroPoliza" value={formData.numeroPoliza} onChange={handleChange} required />
          </div>
        )}

        <div className="col-md-4">
          <label className="form-label">Tipo de Póliza</label>
          <select className="form-select" name="tipoPolizaId" value={formData.tipoPolizaId} onChange={handleChange} required>
            <option value="">Seleccione...</option>
            {tiposPoliza.map((t) => (
              <option key={t.id} value={t.id}>{t.nombre}</option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label">Asegurado</label>
          <select className="form-select" name="cedulaAsegurado" value={formData.cedulaAsegurado} onChange={handleChange} required>
            <option value="">Seleccione...</option>
            {asegurados.map((a) => (
              <option key={a.cedulaAsegurado} value={a.cedulaAsegurado}>
                {a.nombre} {a.primerApellido} ({a.cedulaAsegurado})
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label">Monto Asegurado</label>
          <input type="number" className="form-control" name="montoAsegurado" value={formData.montoAsegurado} onChange={handleChange} required />
        </div>

        <div className="col-md-4">
          <label className="form-label">Fecha de Emisión</label>
          <input type="date" className="form-control" name="fechaEmision" value={formData.fechaEmision.split("T")[0]} onChange={handleChange} required />
        </div>

        <div className="col-md-4">
          <label className="form-label">Fecha de Vencimiento</label>
          <input type="date" className="form-control" name="fechaVencimiento" value={formData.fechaVencimiento.split("T")[0]} onChange={handleChange} required />
        </div>

        <div className="col-md-4">
          <label className="form-label">Cobertura</label>
          <select className="form-select" name="coberturaId" value={formData.coberturaId} onChange={handleChange} required>
            <option value="">Seleccione...</option>
            {coberturas.map((c) => (
              <option key={c.id} value={c.id}>{c.nombre}</option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label">Estado</label>
          <select className="form-select" name="estadoPolizaId" value={formData.estadoPolizaId} onChange={handleChange} required>
            <option value="">Seleccione...</option>
            {estadosPoliza.map((e) => (
              <option key={e.id} value={e.id}>{e.nombre}</option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label">Prima</label>
          <input type="number" className="form-control" name="prima" value={formData.prima} onChange={handleChange} required />
        </div>

        <div className="col-md-4">
          <label className="form-label">Periodo</label>
          <input type="date" className="form-control" name="periodo" value={formData.periodo.split("T")[0]} onChange={handleChange} required />
        </div>

        <div className="col-md-4">
          <label className="form-label">Fecha de Inclusión</label>
          <input type="date" className="form-control" name="fechaInclusion" value={formData.fechaInclusion.split("T")[0]} onChange={handleChange} required />
        </div>

        <div className="col-md-4">
          <label className="form-label">Aseguradora</label>
          <input type="text" className="form-control" name="aseguradora" value={formData.aseguradora} onChange={handleChange} required />
        </div>

        <div className="col-12 d-flex justify-content-end mt-3">
          <button type="submit" className="btn btn-success me-2">
            {esEdicion ? "Actualizar" : "Guardar"}
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate("/dashboard/polizas")}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default NuevaPoliza;
