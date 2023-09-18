import logo from "../assets/images/logo.png";
import React from "react";
import { ActiveLink } from "raviger";

export const DashboardContainer = (props: {
  children: React.ReactNode;
}) => {
  return (
    <div className="relative bg-yellow-50 overflow-hidden max-h-screen ">
      <div className="fixed inset-y-0 left-0 bg-white shadow-md max-h-screen w-25">
        <div className="flex flex-col justify-between h-full">
          <div className="flex-grow">
            <div className="px-4 py-6 text-center flex border-b">
              <img src={logo} alt="Logo" className="w-12 h-12 mr-4" />
              <p className="text-3xl font-bold">
                <span className="text-green-400 mr-1">Task</span>
                <span className="text-blue-500">Tide</span>
              </p>
            </div>
            <div className="p-4">
              <ul className="space-y-1">
                <li>
                  <ActiveLink
                    href="/dashboard"
                    className="flex items-center bg-yellow-200 rounded-xl font-bold text-sm text-yellow-900 py-3 px-4"
                    exactActiveClass="bg-yellow-50"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="text-black"
                      className="w-6 h-6 mr-4"
                    >
                      <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                      <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                    </svg>
                    Home
                  </ActiveLink>
                </li>
                <li>
                  <ActiveLink
                    href="/dashboard/boards"
                    className="flex bg-white hover:bg-yellow-50 rounded-xl font-bold text-sm text-gray-900 py-3 px-4"
                    exactActiveClass="bg-yellow-50"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="text-black"
                      className="w-6 h-6 mr-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.161 2.58a1.875 1.875 0 011.678 0l4.993 2.498c.106.052.23.052.336 0l3.869-1.935A1.875 1.875 0 0121.75 4.82v12.485c0 .71-.401 1.36-1.037 1.677l-4.875 2.437a1.875 1.875 0 01-1.676 0l-4.994-2.497a.375.375 0 00-.336 0l-3.868 1.935A1.875 1.875 0 012.25 19.18V6.695c0-.71.401-1.36 1.036-1.677l4.875-2.437zM9 6a.75.75 0 01.75.75V15a.75.75 0 01-1.5 0V6.75A.75.75 0 019 6zm6.75 3a.75.75 0 00-1.5 0v8.25a.75.75 0 001.5 0V9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Boards
                  </ActiveLink>
                </li>
                <li>
                  <ActiveLink
                    href="/dashboard/todo"
                    className="flex bg-white hover:bg-yellow-50 rounded-xl font-bold text-sm text-gray-900 py-3 px-4"
                    exactActiveClass="bg-yellow-50"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="text-black"
                      className="w-6 h-6 mr-4"
                    >
                      <path d="M5.625 3.75a2.625 2.625 0 100 5.25h12.75a2.625 2.625 0 000-5.25H5.625zM3.75 11.25a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5H3.75zM3 15.75a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75zM3.75 18.75a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5H3.75z" />
                    </svg>
                    To Do
                  </ActiveLink>
                </li>
              </ul>
            </div>
          </div>
          <div className="p-4">
            <button
              type="button"
              className="inline-flex items-center justify-center h-9 px-4 rounded-xl bg-gray-900 text-gray-300 hover:text-white text-sm font-semibold transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="currentColor"
                className=""
                viewBox="0 0 16 16"
              >
                <path d="M12 1a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V2a1 1 0 0 1 1-1h8zm-2 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
              </svg>
            </button>
            <span className="font-bold text-sm ml-2">Logout</span>
          </div>
        </div>
      </div>
      <div className="ml-60 pt-16 max-h-screen overflow-auto">
        {props.children}
        {/*<div className="px-6 py-4">{props.descriptionChildren}</div>*/}
      </div>
    </div>
  );
};
