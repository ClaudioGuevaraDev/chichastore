import { useLocation, useNavigate } from 'react-router';

const MENUS = [
  { name: 'Inicio', to: '/dashboard' },
  { name: 'Usuarios', to: '/dashboard/users' },
  { name: 'Roles', to: '/dashboard/roles' }
];

function DashboardAside() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0">
      <div className="overflow-y-auto py-5 px-3 h-full bg-white">
        <ul className="space-y-2">
          {MENUS.map((menu) => (
            <li
              key={menu.name}
              className={`flex items-center p-2 text-base font-medium text-gray-900 rounded-lg hover:bg-gray-100 group cursor-pointer ${location.pathname === menu.to && 'bg-gray-100'}`}
              onClick={() => navigate(menu.to)}
            >
              <span className="ml-3">{menu.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default DashboardAside;
