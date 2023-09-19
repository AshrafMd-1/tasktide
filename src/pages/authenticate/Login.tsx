import { AuthContainer } from "./AuthContainer";
import { useReducer, useState} from "react";
import { LoginUser } from "../../types/RequestTypes";
import { LoginReducerAction } from "../../types/AuthReducerTypes";
import {navigate} from "raviger";


const reducer = (state: LoginUser, action: LoginReducerAction) => {
  switch (action.type) {
    case "username_change":
      return { ...state, username: action.value };
    case "password_change1":
      return { ...state, password: action.value };
    default:
      return state;
  }
};

const initialState: LoginUser = {
  username: "",
  password: "",
};

export const Login = () => {
  const [formDate, dispatch] = useReducer(reducer, initialState);
  const [remember, setRemember] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState(() => {
    const user =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (user) {
      return user;
    }
    return null;
  });

  if(currentUser) navigate("/dashboard")


  return (
    <AuthContainer
      title={"Login"}
      description={"Sign in to your account to continue"}
      formData={formDate}
      remember={remember}
    >
      <label
        className="text-grey-800 text-xl ml-1 font-bold m-2"
        htmlFor="username"
      >
        Username
      </label>
      <input
        className="border border-gray-400 rounded-lg p-2"
        type="text"
        name="username"
        id="username"
        value={formDate.username}
        placeholder="Username"
        onChange={(e) =>
          dispatch({
            type: "username_change",
            value: e.target.value,
          })
        }
      />
      <label
        className="text-grey-800 text-xl ml-1 font-bold m-2"
        htmlFor="password"
      >
        Password
      </label>
      <input
        className="border border-gray-400 rounded-lg p-2"
        type="password"
        name="password"
        id="password"
        value={formDate.password}
        placeholder="Password"
        onChange={(e) =>
          dispatch({
            type: "password_change1",
            value: e.target.value,
          })
        }
      />
      <div className="flex justify-start m-2 items-center">
        <input
          className="border border-gray-400 rounded-lg p-2 "
          type="checkbox"
          name="remember"
          id="remember"
          checked={remember}
          onChange={(e) => {
            setRemember(e.target.checked);
          }}
        />
        <label className="text-grey-400   ml-2" htmlFor="remember">
          Remember Me
        </label>
      </div>
    </AuthContainer>
  );
};
