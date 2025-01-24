import { Outlet } from 'react-router';

import DashboardAside from '../asides/dashboard-aside';
import DashboardNavbar from '../navbars/dashboard-navbar';

function DashboardLayout() {
  return (
    <div className="antialiased">
      <DashboardNavbar />

      <DashboardAside />

      <main className="p-4 md:ml-64 h-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;
