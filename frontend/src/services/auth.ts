import { api } from './api';

export const authSignIn = async (email: string, password: string) => {
  const response = await api.post('/api/auth/sign-in', { email, password });
  const { token } = response.data as { token: string };

  return { token };
};
