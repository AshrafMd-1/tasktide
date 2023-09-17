import logo from "../assets/images/logo.png";
import React from "react";

export const AuthContainer = (props: {
  children: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div className="flex justify-center flex-col items-center  bg-orange-100 py-5 ">
      <div className="flex justify-center items-center flex-col">
        <img src={logo} className=" w-2/12 " alt="logo" />
        <p className="text-3xl font-bold">
          <span className="text-green-400">Task</span>
          <span className="text-blue-500">Tide</span>
        </p>
      </div>
      <div className="flex flex-col justify-center w-10/12 lg:w-6/12 md:w-7/12  xl:w-4/12 bg-white rounded-lg  shadow-lg p-12 m-4">
        <div className="flex justify-center mb-4  flex-col">
          <h1 className="text-3xl font-bold pb-1">{props.title}</h1>
          <p className="text-gray-500 mt-1 text-sm">{props.description}</p>
        </div>
        {props.children}
        <div className="flex flex-col items-center mt-2">
          <button className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold h-1/2 py-2 px-4 rounded flex items-center justify-center">
            {props.title}
          </button>
          <a
            className="text-blue-500 text-sm mt-2"
            href={props.title === "Sign Up" ? "/login" : "/signup"}
          >
            {props.title === "Sign Up"
              ? "Already have an account? Login"
              : "Don't have an account? Sign Up"}
          </a>
        </div>
      </div>
      <a
        className="bg-gray-800 hover:bg-black text-white text-2xl mt-2 py-2 px-4 rounded"
        href="/"
      >
        Back to Home
      </a>
    </div>
  );
};
