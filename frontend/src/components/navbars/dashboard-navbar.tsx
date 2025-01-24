import { Button, Navbar, NavbarBrand, NavbarContent } from '@heroui/react';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import { Link, useNavigate } from 'react-router';

function DashboardNavbar() {
  const signOut = useSignOut();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  return (
    <Navbar className="left-0 right-0 top-0 z-50" maxWidth="full" isBordered>
      <NavbarBrand>
        <Link to="/dashboard">
          <p className="font-bold text-inherit text-xl">ChichaStore</p>
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end">
        <Button color="danger" onPress={handleSignOut}>
          Cerrar sesión
        </Button>
      </NavbarContent>
    </Navbar>
  );
}

export default DashboardNavbar;
