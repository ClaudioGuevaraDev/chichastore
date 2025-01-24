import { Role } from '../interfaces/roles';
import { api } from './api';

export const getRoleByID = async (id: string, token: string) => {
  const response = await api.get(`/api/roles/${id}`, {
    headers: {
      Authorization: token
    }
  });
  const { role } = response.data as { role: Role | null };

  return { role: role };
};

export const getAllRoles = async (token: string) => {
  const response = await api.get('/api/roles', {
    headers: {
      Authorization: token
    }
  });
  const { roles } = response.data as { roles: Role[] | null };

  return { roles: roles ?? [] };
};

export const createRole = async (name: string, token: string) => {
  const response = await api.post(
    '/api/roles',
    { name },
    {
      headers: {
        Authorization: token
      }
    }
  );
  const { role_id } = response.data as { role_id: string };

  return { roleID: role_id };
};
