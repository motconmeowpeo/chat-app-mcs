import { IUser } from './user.model';

export interface IMessage {
  id: string;
  content: string;
  createAt: string;
  replyFor?: string;
  updateAt: string;
  author: IUser;
  received: IUser;
}

export interface ICreateMessage {
  content: string;
  replyFor?: string;
  authorId: string;
  receivedId: string;
}
