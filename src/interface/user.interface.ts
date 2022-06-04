import { Role } from './role';
export interface IUser {
  id: string;
  username?: string;
  password?: string;
  facebookId?: string;
  userType: Role;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  birthday?: string;
  avatar?: string;
  isActive: boolean;
}
