import {
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@heroui/react';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import useSWR from 'swr';

import { getRoleByID } from '../../services/roles';
import { getAllUsers } from '../../services/users';

function DashboardUsers() {
  const token = useAuthHeader() ?? '';

  const { data, isLoading } = useSWR(
    ['users'],
    async () => {
      const { users } = await getAllUsers(token);

      const parserUsers = [];

      for (let i = 0; i < users.length; i++) {
        const { role } = await getRoleByID(users[i].role_id, token);

        parserUsers.push({
          ...users[i],
          role_name: role?.name
        });
      }

      return { users: parserUsers };
    },
    { revalidateOnFocus: false }
  );

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-900">Usuarios</h2>

      <div>
        <Table aria-label="users-table" className="max-w-5xl">
          <TableHeader>
            <TableColumn>NOMBRE COMPLETO</TableColumn>
            <TableColumn>CORREO ELECTRÓNICO</TableColumn>
            <TableColumn>TELÉFONO</TableColumn>
            <TableColumn>ROL</TableColumn>
          </TableHeader>
          <TableBody
            isLoading={isLoading}
            loadingContent={<Spinner label="Cargando..." />}
            emptyContent="Sin usuarios"
          >
            {data == null
              ? []
              : data.users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user.full_name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.role_name}</TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default DashboardUsers;
