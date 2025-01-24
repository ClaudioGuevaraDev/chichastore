import { Outlet } from 'react-router';

import EcommerceNavbar from '../navbars/ecommerce-navbar';

function EcommerceLayout() {
  return (
    <div>
      <EcommerceNavbar />

      <div className="w-full mx-auto max-w-screen-xl px-6 py-8">
        <Outlet />
      </div>
    </div>
  );
}

export default EcommerceLayout;
