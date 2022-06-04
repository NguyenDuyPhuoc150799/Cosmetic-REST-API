import { Role } from './role';

export interface IPayload {
  id: string;
  username: string;
  name: string;
  avatar: string;
  role: Role;
}
