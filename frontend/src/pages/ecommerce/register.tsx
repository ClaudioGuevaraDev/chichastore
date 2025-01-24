import { Button, Card, CardBody, CardHeader, Input } from '@heroui/react';

function Register() {
  return (
    <div>
      <Card className="max-w-sm mx-auto">
        <CardHeader>
          <h4 className="font-bold text-xl mx-auto">
            Crear cuenta en ChichaStore
          </h4>
        </CardHeader>
        <form>
          <CardBody className="space-y-4">
            <Input
              type="text"
              label="Nombre completo"
              placeholder="Ingresa tu nombre y apellidos"
            />
            <Input
              type="email"
              label="Correo electrónico"
              placeholder="Ingresa tu correo electrónico"
            />
            <Input
              type="password"
              label="Contraseña"
              placeholder="Ingresa tu contraseña"
            />
            <Input
              type="password"
              label="Confirmar contraseña"
              placeholder="Vuelve a ingresar tu contraseña"
            />
            <Input
              type="tel"
              label="Teléfono"
              placeholder="Ingresa tu número de teléfono (+56)"
            />
            <Button type="submit" color="primary">
              Registrarse
            </Button>
          </CardBody>
        </form>
      </Card>
    </div>
  );
}

export default Register;
