import { LoginUser, RegisterUser } from "../types/RequestTypes";

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
  const token = localStorage.getItem("token");
  const auth = token ? "Token " + localStorage.getItem("token") : "";

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
}


