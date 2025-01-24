import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem
} from '@heroui/react';
import { Link, useNavigate } from 'react-router';

function EcommerceNavbar() {
  const navigate = useNavigate();

  return (
    <Navbar maxWidth="xl" isBordered>
      <NavbarBrand>
        <Link to="/">
          <p className="font-bold text-inherit text-xl">ChichaStore</p>
        </Link>
      </NavbarBrand>

      <NavbarContent justify="end">
        <NavbarItem>
          <Button onPress={() => navigate('/login')}>Iniciar sesión</Button>
        </NavbarItem>

        <NavbarItem>
          <Button color="primary" onPress={() => navigate('/register')}>
            Registrarse
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export default EcommerceNavbar;
