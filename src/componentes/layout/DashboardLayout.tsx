// DashboardLayout.tsx
import { Outlet } from 'react-router-dom';
import { Topbar } from '../Topbar';

export const DashboardLayout: React.FC = () => {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <Topbar />
      <main className="flex-grow-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};
