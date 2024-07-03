export interface CreateUserDTO {
  id: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  avatarUrl?: string | null;
  rol: 'user' | 'admin';
}

export interface UpdateUserDTO {
  name?: string;
  lastName?: string;
  password?: string;
  avatarUrl?: string | null;
  rol?: 'user' | 'admin';
}
