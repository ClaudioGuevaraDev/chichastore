import { Role } from '../interfaces/roles';
import { api } from './api';

export const getRoleByID = async (id: string, token: string) => {
  const response = await api.get(`/api/roles/${id}`, {
    headers: {
      Authorization: token
    }
  });
  const { role } = response.data as { role: Role };

  return { role };
};
