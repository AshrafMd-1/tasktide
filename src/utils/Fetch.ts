import { ManageBoard, LoginUser, RegisterUser } from "../types/RequestTypes";

const API_BASE_URL = "https://reactforall.onrender.com/api/";

type RequestMethod = "GET" | "POST" | "PATCH" | "DELETE" | "PUT";

const request = async (
  endpoint: string,
  method: RequestMethod,
  data: any = {},
) => {
  let url;
  let payload: string;
  if (method === "GET") {
    const requestParams = new URLSearchParams(data);
    url = API_BASE_URL + endpoint + "?" + requestParams.toString();
    payload = "";
  } else {
    url = API_BASE_URL + endpoint;
    payload = data ? JSON.stringify(data) : "";
  }
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  const auth = token ? "Token " + token : "";

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: auth,
    },
    body: method !== "GET" ? payload : null,
  });
  if (response.status === 204) {
    return {};
  } else if (response.ok) {
    return await response.json();
  } else {
    const errorJson = await response.json();
    throw Error(errorJson);
  }
};

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
export const getTasks = async (id: number) => {
  return await request(`boards/${id}/tasks/`, "GET");
};
