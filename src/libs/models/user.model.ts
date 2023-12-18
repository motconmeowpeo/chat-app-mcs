export enum ROLE {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface IUser {
  id: string;
  email: string;
  username: string;
  password: string;
  active: string;
  role: string;
  avatar: string;
}

export interface IAuth extends IToken {
  user: IUser | null;
}

export interface IToken {
  accessToken: string | null;
}

export interface ICreateUser {
  email: string;
  password: string;
  username: string;
}

export interface ILogin {
  email: string;
  password: string;
}
