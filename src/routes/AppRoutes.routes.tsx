import { Routes, Route, Navigate  } from "react-router-dom";
import Asegurados from "../paginas/Asegurados.pagina";
import { DashboardLayout } from '../componentes/layout/DashboardLayout';
import Dashboard from "../paginas/Dashboard.pagina";
import Polizas from "../paginas/Polizas.pagina";
import NuevoAsegurado from "../paginas/NuevoAsegurado";
import NuevaPoliza from "../paginas/NuevaPoliza";

import Login from '../paginas/Login';
import { PrivateRoute } from '../auth/PrivateRoute';

export const AppRoutes = () => {
  return (
    <Routes>
    {/* Página de Login como inicio */}
    <Route path="/" element={<Login />} />

    {/* Rutas protegidas */}
    <Route path="/dashboard" element={
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    }>
      
      <Route index element={<Dashboard />} />
      <Route path="asegurados" element={<Asegurados />} />
      <Route path="asegurados/editar/:cedulaAsegurado" element={<NuevoAsegurado />} />
      <Route path="/dashboard/asegurados/nuevo" element={<NuevoAsegurado />} />
      <Route path="polizas" element={<Polizas />} />
      <Route path="polizas/nueva" element={<NuevaPoliza />} />
      <Route path="polizas/editar/:numeroPoliza" element={<NuevaPoliza />} />

    </Route>

    {/* Redirección por defecto si ruta no existe */}
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
  );
};
