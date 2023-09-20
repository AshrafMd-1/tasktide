import {
  LoginUser,
  ManageBoard,
  ManageStatus,
  ManageTask,
  RegisterUser,
} from "../types/RequestTypes";
import { request } from "./FetchPrototype";

export const login = async (data: LoginUser) => {
  return await request("auth-token/", "POST", data);
};

export const newRegistration = async (data: RegisterUser) => {
  await request("auth/registration/", "POST", data);
  return login({ username: data.username, password: data.password1 });
};

export const getProfile = async () => {
  return await request("users/me/", "GET");
};

export const createBoard = async (data: ManageBoard) => {
  return await request("boards/", "POST", data);
};

export const getBoards = async () => {
  return await request("boards/", "GET");
};
export const logout = async () => {
  return await request("auth/logout/", "POST");
};

export const deleteBoard = async (id: number) => {
  return await request(`boards/${id}/`, "DELETE");
};

export const getBoardDetail = async (id: number) => {
  return await request(`boards/${id}/`, "GET");
};

export const updateBoard = async (id: number, data: ManageBoard) => {
  return await request(`boards/${id}/`, "PATCH", data);
};

export const createStatus = async (data: ManageStatus) => {
  return await request("status/", "POST", data);
};

export const getStatus = async () => {
  return await request("status/", "GET");
};

export const getStatusDetail = async (id: number) => {
  return await request(`status/${id}/`, "GET");
};

export const deleteStatus = async (id: number) => {
  return await request(`status/${id}/`, "DELETE");
};

export const updateStatus = async (id: number, data: ManageStatus) => {
  return await request(`status/${id}/`, "PATCH", data);
};

export const createTask = async (data: ManageTask, board_pk: number) => {
  return await request(`boards/${board_pk}/tasks/`, "POST", data);
};

export const getTasks = async (id: number) => {
  return await request(`boards/${id}/tasks/`, "GET");
};

export const deleteTask = async (id: number, board_pk: number) => {
  return await request(`boards/${board_pk}/tasks/${id}/`, "DELETE");
};

export const getTaskDetail = async (id: number, board_pk: number) => {
  return await request(`boards/${board_pk}/tasks/${id}/`, "GET");
};

export const updateTask = async (
  id: number,
  data: ManageTask,
  board_pk: number,
) => {
  return await request(`boards/${board_pk}/tasks/${id}/`, "PATCH", data);
};
