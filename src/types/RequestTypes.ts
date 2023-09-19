export type RegisterUser = {
  email: string;
  username: string;
  password1: string;
  password2: string;
};

export type LoginUser = {
  username: string;
  password: string;
};

export type ManageBoard = {
  title: string;
  description: string;
};
