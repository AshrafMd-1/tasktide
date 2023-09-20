import { GetBoardType, GetStatusType } from "./DataTypes";

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

export type ManageStatus = {
  title: string;
  description: string;
};

export type ManageTask = {
  id?: number;
  board_object: GetBoardType;
  status_object: GetStatusType;
  status: number;
  title: string;
  description: string;
  board?: number;
};
