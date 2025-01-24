import {
  Alert,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure
} from '@heroui/react';
import { FormEvent, useState } from 'react';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import useSWR from 'swr';

import { createRole, getAllRoles } from '../../services/roles';

function DashboardRoles() {
  const [creatingRole, setCreatingRole] = useState(false);
  const [createRoleError, setCreateRoleError] = useState<string | null>(null);

  const token = useAuthHeader() ?? '';
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const { data, isLoading, mutate } = useSWR(
    ['roles'],
    () => getAllRoles(token),
    {
      revalidateOnFocus: false
    }
  );

  const handleCreateRole = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (data == null) {
      return;
    }

    setCreatingRole(true);
    setCreateRoleError(null);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const name = formData.get('name') as string;

    try {
      const { roleID } = await createRole(name, token);

      mutate({
        roles: [...data.roles, { _id: roleID, name: name }]
      });

      setCreatingRole(false);
      onClose();
    } catch (error) {
      console.error(error);

      setCreateRoleError('Error al crear el rol');
      setCreatingRole(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-900">Usuarios</h2>

      <div>
        <Table
          aria-label="roles-label"
          className="max-w-md"
          topContent={
            <div>
              <Button color="primary" onPress={onOpen}>
                Crear nuevo rol
              </Button>
            </div>
          }
        >
          <TableHeader>
            <TableColumn>NOMBRE</TableColumn>
          </TableHeader>
          <TableBody
            isLoading={isLoading}
            loadingContent={<Spinner label="Cargando..." className="mt-5" />}
            emptyContent="Sin roles"
          >
            {data == null
              ? []
              : data.roles.map((role) => (
                  <TableRow key={role._id}>
                    <TableCell>{role.name}</TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <form onSubmit={handleCreateRole}>
            <ModalHeader></ModalHeader>
            <ModalBody>
              {createRoleError != null && (
                <Alert color="danger" title={createRoleError} />
              )}

              <Input
                type="text"
                name="name"
                label="Nombre"
                placeholder="Ingrese nombre del rol"
                isRequired
              />
            </ModalBody>
            <ModalFooter>
              <Button type="submit" color="primary" isLoading={creatingRole}>
                Crear rol
              </Button>
              <Button variant="flat" onPress={onClose}>
                Cancelar
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default DashboardRoles;
