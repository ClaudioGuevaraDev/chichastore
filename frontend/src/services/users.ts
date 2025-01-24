import { User } from '../interfaces/users';
import { api } from './api';

export const getAllUsers = async (token: string) => {
  const response = await api.get('/api/users', {
    headers: {
      Authorization: token
    }
  });
  const { users } = response.data as { users: User[] | null };

  return { users: users ?? [] };
};
