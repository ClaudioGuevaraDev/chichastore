import { BrowserRouter, Route, Routes } from 'react-router';

import DashboardLayout from '../components/layouts/dashboard-layout';
import EcommerceLayout from '../components/layouts/ecommerce-layout';
import EcommerceDashboard from '../pages/dashboard/home';
import EcommerceHome from '../pages/ecommerce/home';
import Login from '../pages/ecommerce/login';
import Register from '../pages/ecommerce/register';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<EcommerceLayout />}>
          <Route index element={<EcommerceHome />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<EcommerceDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
