import { AuthContainer } from "./AuthContainer";

export const Login = () => {
  return (
    <AuthContainer
      title={"Login"}
      description={"Sign in to your account to continue"}
    >
      <label
        className="text-grey-800 text-xl ml-1 font-bold m-2"
        htmlFor="email"
      >
        Email
      </label>
      <input
        className="border border-gray-400 rounded-lg p-2"
        type="email"
        name="email"
        id="email"
      />
      <div className="flex justify-between items-center">
        <label
          className="text-grey-800 text-xl ml-1 font-bold m-2"
          htmlFor="password"
        >
          Password
        </label>
      </div>
      <input
        className="border border-gray-400 rounded-lg p-2"
        type="password"
        name="password"
        id="password"
      />
      <div className="flex justify-start m-2 items-center">
        <input
          className="border border-gray-400 rounded-lg p-2 "
          type="checkbox"
          name="remember"
          id="remember"
        />
        <label className="text-grey-400   ml-2" htmlFor="remember">
          Remember Me
        </label>
      </div>
    </AuthContainer>
  );
};
