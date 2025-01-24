export interface UserDecodedToken {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  role: string;
}

export interface User {
  _id: string;
  full_name: string;
  email: string;
  password: string;
  phone: string;
  role_id: string;
}
