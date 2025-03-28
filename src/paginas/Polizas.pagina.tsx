import { useEffect, useState } from "react";
import { Poliza } from "../interfaces/Poliza.interfaces";
import { getPolizas, deletePoliza, buscarPolizas } from "../api/polizas.services";
import { useNavigate } from "react-router-dom";
import { FiltrosPoliza } from "../interfaces/FiltrosPoliza .interfaces";

const Polizas = () => {
  const [polizas, setPolizas] = useState<Poliza[]>([]);
  const [filtros, setFiltros] = useState({
    numeroPoliza: "",
    tipoPoliza: "",
    fechaVencimiento: "",
    cedula: "",
    nombre: "",
    apellidos: "",
  });

  const navigate = useNavigate();

 
  useEffect(() => {
    const fetchPolizas = async () => {
      try {
        const data = await getPolizas();
        setPolizas(data);
      } catch (error) {
        console.error("Error al obtener las pólizas", error);
      }
    };

    fetchPolizas();
  }, []);

  
  const buscarPolizasHandler = async () => {
    try {
      const body: any = {};
  
      if (filtros.numeroPoliza.trim()) body.numeroPoliza = filtros.numeroPoliza;
      if (filtros.tipoPoliza.trim()) body.tipoPolizaId = Number(filtros.tipoPoliza);
      if (filtros.fechaVencimiento.trim()) body.fechaVencimiento = filtros.fechaVencimiento;
      if (filtros.cedula.trim()) body.cedulaAsegurado = filtros.cedula;
      if (filtros.nombre.trim() || filtros.apellidos.trim()) {
        body.nombreAsegurado = `${filtros.nombre} ${filtros.apellidos}`.trim();
      }
  
      const data = await buscarPolizas(body);
  
      // 👉 Transformar la respuesta para aplanar los objetos anidados
      const datosTransformados = data.map((p: any) => ({
        ...p,
        tipoPolizaNombre: p.tipoPoliza?.nombre || "",
        nombreAsegurado: p.asegurado?.nombre || "",
        primerApellidoAsegurado: p.asegurado?.primerApellido || "",
        segundoApellidoAsegurado: p.asegurado?.segundoApellido || "",
      }));
  
      setPolizas(datosTransformados);
      console.log("Resultado de buscarPolizas:", datosTransformados);
    } catch (error) {
      console.error("Error al buscar pólizas:", error);
      alert("Ocurrió un error al buscar las pólizas.");
    }
  };
  
  
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  const handleAgregar = () => {
    navigate("/dashboard/polizas/nueva");
  };

  const handleEditar = (numeroPoliza: string) => {
    navigate(`/dashboard/polizas/editar/${numeroPoliza}`);
  };
  

  const handleEliminar = async (numeroPoliza: string) => {
    const confirmar = window.confirm("¿Está seguro que desea eliminar esta póliza? Esta acción no se puede deshacer.");
    if (!confirmar) return;
  
    try {
      await deletePoliza(numeroPoliza);
      alert("Póliza eliminada con éxito.");
  
      // Recargar la lista (podés volver a llamar a getPolizas o filtrar localmente)
      setPolizas((prev) => prev.filter(p => p.numeroPoliza !== numeroPoliza));
    } catch (error) {
      console.error("Error al eliminar la póliza:", error);
      alert("Ocurrió un error al eliminar la póliza.");
    }
  };

 

  const polizasFiltradas = polizas.filter((p) => {
    const tipo = p.tipoPolizaNombre?.toLowerCase() || "";
    const nombre = p.nombreAsegurado?.toLowerCase() || "";
    const apellidos = `${p.primerApellidoAsegurado ?? ""} ${p.segundoApellidoAsegurado ?? ""}`.toLowerCase();
    const fechaVenc = p.fechaVencimiento?.toString() || "";
    const cedula = p.cedulaAsegurado ?? "";
    const numero = p.numeroPoliza ?? "";
  
    return (
      numero.includes(filtros.numeroPoliza) &&
      tipo.includes(filtros.tipoPoliza.toLowerCase()) &&
      fechaVenc.includes(filtros.fechaVencimiento) &&
      cedula.includes(filtros.cedula) &&
      nombre.includes(filtros.nombre.toLowerCase()) &&
      apellidos.includes(filtros.apellidos.toLowerCase())
    );
  });
  

  

  return (

    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Pólizas</h2>
        <button className="btn btn-primary" onClick={handleAgregar}>
          + Agregar Póliza
        </button>
      </div>

      {/* Filtros */}
      <div className="row g-2 mb-4">
        <div className="col-md-2">
          <input
            className="form-control"
            placeholder="N° Póliza"
            name="numeroPoliza"
            value={filtros.numeroPoliza}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-2">
          <input
            className="form-control"
            placeholder="Tipo"
            name="tipoPoliza"
            value={filtros.tipoPoliza}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-2">
          <input
            type="date"
            className="form-control"
            placeholder="Vencimiento"
            name="fechaVencimiento"
            value={filtros.fechaVencimiento}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-2">
          <input
            className="form-control"
            placeholder="Cédula"
            name="cedula"
            value={filtros.cedula}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-2">
          <input
            className="form-control"
            placeholder="Nombre"
            name="nombre"
            value={filtros.nombre}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-2">
          <input
            className="form-control"
            placeholder="Apellidos"
            name="apellidos"
            value={filtros.apellidos}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="text-end mb-3">
        <button className="btn btn-success" onClick={buscarPolizasHandler}>
          🔍 Buscar
        </button>
      </div>

      <table className="table table-bordered table-striped">
        <thead className="table-light">
          <tr>
            <th>N° Póliza</th>
            <th>Tipo</th>
            <th>Emisión</th>
            <th>Vencimiento</th>
            <th>Cédula</th>
            <th>Nombre completo</th>
            <th>Prima</th>
            <th>Aseguradora</th>
            <th style={{ width: "120px" }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {polizasFiltradas.map((p) => (
            <tr key={p.numeroPoliza}>
              <td>{p.numeroPoliza}</td>
              <td>{p.tipoPolizaNombre}</td>
              <td>{new Date(p.fechaEmision).toLocaleDateString()}</td>
              <td>{new Date(p.fechaVencimiento).toLocaleDateString()}</td>
              <td>{p.cedulaAsegurado}</td>
              <td>
                {p.nombreAsegurado} {p.primerApellidoAsegurado} {p.segundoApellidoAsegurado}
              </td>
              <td>{p.prima.toLocaleString("es-CR", { style: "currency", currency: "CRC" })}</td>
              <td>{p.aseguradora}</td>
              <td>
                <div className="d-flex gap-2">
                  <button className="btn btn-sm btn-warning" onClick={() => handleEditar(p.numeroPoliza)}>📝</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleEliminar(p.numeroPoliza)}>🗑️</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>

  );
};

export default Polizas;
