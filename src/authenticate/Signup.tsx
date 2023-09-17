import { AuthContainer } from "./AuthContainer";

export const Signup = () => {
  return (
    <AuthContainer
      title={"Sign Up"}
      description={"Create an account to continue"}
    >
      <label
        className="text-grey-800 text-xl ml-1 font-bold m-2"
        htmlFor="name"
      >
        Name
      </label>
      <input
        type="text"
        name="name"
        id="name"
        className="border border-gray-400 rounded-lg p-2"
      />
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
