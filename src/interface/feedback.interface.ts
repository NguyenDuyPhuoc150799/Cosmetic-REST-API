import { IUser } from './user.interface';

export interface IFeedback {
  id: string;
  user: IUser;
  title: string;
  content: string;
  status: string;
}
