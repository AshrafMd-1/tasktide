import { useState } from "react";
import { ManageBoard } from "../../../types/RequestTypes";
import { createBoard } from "../../../utils/Fetch";
import {navigate} from "raviger";

export const CreateBoard = (props: {
  setIsModalOpenCB: (value: boolean) => void;
}) => {
  const [boardData, setBoardData] = useState<ManageBoard>({
    title: "",
    description: "",
  });
  const error = {
    title: "",
    description: "",
  };

  const submitBoard = async () => {
    if (boardData.title === "") {
      error.title = "Title is required";
    }
    if (boardData.description === "") {
      error.description = "Description is required";
    }
    if (error.title !== "" || error.description !== "") {
      return;
    }
    await createBoard(boardData);
    window.location.reload();
    setBoardData({
      title: "",
      description: "",
    });
    props.setIsModalOpenCB(false);
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="mx-auto">
        <h1 className="text-4xl text-gray-800">Create Board</h1>
      </div>
      <hr className="my-5 w-3/4 mx-auto border-2 border-gray-500 rounded-lg" />
      <form>
        <div className="flex justify-center items-center gap-4 flex-col">
          <div className="grid grid-cols-2 gap-4">
            <label
              htmlFor="title"
              className="text-2xl font-bold text-center text-gray-800"
            >
              Title
            </label>
            <input
              value={boardData.title}
              className="border-2 border-gray-500 rounded-lg px-2 text-xl  text-gray-800"
              type="text"
              name="title"
              id="title"
              onChange={(e) =>
                setBoardData({ ...boardData, title: e.target.value })
              }
            />
            <label className="text-xl text-center text-red-500">
              {error.title}
            </label>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <label
              className="text-2xl font-bold text-center text-gray-800"
              htmlFor="description"
            >
              Description
            </label>
            <input
              value={boardData.description}
              className="border-2 border-gray-500 rounded-lg px-2 text-xl  text-gray-800"
              type="text"
              name="description"
              id="description"
              onChange={(e) =>
                setBoardData({ ...boardData, description: e.target.value })
              }
            />
            <label className="text-xl text-center text-red-500">
              {error.description}
            </label>
          </div>
        </div>
        <div className="mt-5 flex justify-center items-center">
          <button
            onClick={(e) => {
              e.preventDefault();
              submitBoard();
            }}
            className="bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white font-semibold px-6 py-3 rounded-md "
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};
