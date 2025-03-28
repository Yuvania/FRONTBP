// src/pages/NuevoAsegurado.tsx

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Asegurado } from "../interfaces/Asegurado.interfaces";
import { postAsegurado, getAseguradoById, putAsegurado } from "../api/asegurado.services";

const NuevoAsegurado = () => {
  
  const navigate = useNavigate();
  const { cedulaAsegurado } = useParams();
  const esEdicion = !!cedulaAsegurado;

  const [formData, setFormData] = useState<Asegurado>({
    cedulaAsegurado: "",
    nombre: "",
    primerApellido: "",
    segundoApellido: "",
    tipoPersonaId: 0,
    fechaNacimiento: "",
  });

  useEffect(() => {
    const cargarAsegurado = async () => {
      if (esEdicion && cedulaAsegurado) {
        const data = await getAseguradoById(cedulaAsegurado);
        setFormData({
          ...data,
          fechaNacimiento: data.fechaNacimiento.split("T")[0],
        });
      }
    };

    cargarAsegurado();
  }, [esEdicion, cedulaAsegurado]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (esEdicion && cedulaAsegurado) {
        await putAsegurado(cedulaAsegurado, formData);
        alert("Asegurado actualizado con éxito.");
      } else {
        console.log("Datos enviados:", formData);
        await postAsegurado(formData);
        alert("Asegurado registrado con éxito.");
      }

      navigate("/dashboard/asegurados");
    } catch (error) {
      console.error("Error al guardar asegurado:", error);
      alert("Ocurrió un error al guardar.");
    }
  };


  return (
    <div className="container mt-4">
      <h2>{esEdicion ? "Editar Asegurado" : "Registrar Nuevo Asegurado"}</h2>
      <form onSubmit={handleSubmit} className="row g-3">
        {!esEdicion && (
          <div className="col-md-4">
            <label className="form-label">Cédula</label>
            <input
              type="text"
              className="form-control"
              name="cedulaAsegurado"
              value={formData.cedulaAsegurado}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div className="col-md-4">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Primer Apellido</label>
          <input
            type="text"
            className="form-control"
            name="primerApellido"
            value={formData.primerApellido}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Segundo Apellido</label>
          <input
            type="text"
            className="form-control"
            name="segundoApellido"
            value={formData.segundoApellido}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Tipo Persona</label>
          <select
            className="form-select"
            name="tipoPersonaId"
            value={formData.tipoPersonaId}
            onChange={handleChange}
            required
          >
            <option value={1}>Física</option>
            <option value={2}>Jurídica</option>
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label">Fecha de Nacimiento</label>
          <input
            type="date"
            className="form-control"
            name="fechaNacimiento"
            value={formData.fechaNacimiento}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-12 d-flex justify-content-end mt-3">
          <button type="submit" className="btn btn-success me-2">
            {esEdicion ? "Actualizar" : "Guardar"}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/dashboard/asegurados")}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default NuevoAsegurado;
