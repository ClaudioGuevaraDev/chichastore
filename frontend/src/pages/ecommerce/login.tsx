import { Button, Card, CardBody, CardHeader, Input } from '@heroui/react';
import { FormEvent, useState } from 'react';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { decodeToken } from 'react-jwt';
import { useNavigate } from 'react-router';

import { UserDecodedToken } from '../../interfaces/users';
import { authSignIn } from '../../services/auth';

function Login() {
  const [loading, setLoading] = useState(false);

  const signIn = useSignIn();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;

      const { token } = await authSignIn(email, password);

      const decodedToken = decodeToken(token) as UserDecodedToken;

      const loggedIn = signIn({
        auth: {
          token: token,
          type: 'Bearer'
        },
        userState: decodedToken
      });

      if (loggedIn) {
        if (decodedToken.role === 'Administrador') {
          navigate('/dashboard');
        }

        setLoading(false);
      } else {
        throw new Error();
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <Card className="max-w-sm mx-auto">
        <CardHeader>
          <h4 className="font-bold text-xl mx-auto">
            Inicia sesión con tu cuenta
          </h4>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardBody className="space-y-4">
            <Input
              type="email"
              name="email"
              label="Correo electrónico"
              placeholder="Ingresa tu correo electrónico"
            />
            <Input
              type="password"
              name="password"
              label="Contraseña"
              placeholder="Ingresa tu contraseña"
            />
            <Button type="submit" color="primary" isLoading={loading}>
              Ingresar
            </Button>
          </CardBody>
        </form>
      </Card>
    </div>
  );
}

export default Login;
