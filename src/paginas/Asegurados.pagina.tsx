import { useEffect, useState } from "react";
import { Asegurado } from "../interfaces/Asegurado.interfaces";
import { getAsegurados, deleteAsegurado } from "../api/asegurado.services";
import { useNavigate } from "react-router-dom";


const Asegurados = () => {
  
  const navigate = useNavigate();
  
  const [asegurados, setAsegurados] = useState<Asegurado[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAsegurados();
        setAsegurados(data);
      } catch (error) {
        console.error("Error al cargar asegurados:", error);
      }
    };

    fetchData();
  }, []);

  //FUNCION PARA NAVEGAR A NUEVO ASEGURADO
  const handleAgregar = () => {
     navigate("/dashboard/asegurados/nuevo");
  };

  //FUNCION PARA NAVEGAR A EDITAR ASEGURADO
  const handleEditar = (cedula: string) => {
    navigate(`/dashboard/asegurados/editar/${cedula}`);
  };
   
  const handleEliminar = async (cedula: string) => {
    const confirmar = window.confirm("¿Está seguro que desea eliminar este asegurado?");
    if (!confirmar) return;
  
    try {
      await deleteAsegurado(cedula);
      alert("Asegurado eliminado con éxito.");
  
      // Actualizar la lista en memoria (sin recargar)
      setAsegurados((prev) => prev.filter(a => a.cedulaAsegurado !== cedula));
    } catch (error: any) {
      console.error("Error al eliminar asegurado:", error);
  
      if (error instanceof Error) {
        alert(error.message); // Muestra el mensaje del backend si fue lanzado como Error
      } else {
        alert("Error al eliminar el asegurado.");
      }
    }
  };
  

  return (

    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Lista de Asegurados</h2>
        <button className="btn btn-primary" onClick={handleAgregar}>
          + Agregar Asegurado
        </button>
      </div>

      <table className="table table-bordered table-striped">
        <thead className="table-light">
          <tr>
            <th>Cédula</th>
            <th>Nombre</th>
            <th>Apellido 1</th>
            <th>Apellido 2</th>
            <th>Tipo Persona</th>
            <th>Nacimiento</th>
            <th style={{ width: "120px" }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {asegurados.map((a) => (
            <tr key={a.cedulaAsegurado}>
              <td>{a.cedulaAsegurado}</td>
              <td>{a.nombre}</td>
              <td>{a.primerApellido}</td>
              <td>{a.segundoApellido}</td>
              <td>{a.tipoPersonaId}</td>
              <td>{new Date(a.fechaNacimiento).toLocaleDateString()}</td>
              <td>
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() => handleEditar(a.cedulaAsegurado)}
                    title="Editar"
                  >
                    📝
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleEliminar(a.cedulaAsegurado)}
                    title="Eliminar"
                  >
                    🗑️
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );

};

export default Asegurados;
