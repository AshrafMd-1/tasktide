import { useState } from "react";
import { ManageBoard } from "../../../../types/RequestTypes";
import { createBoard } from "../../../../utils/FetchRequests";
import { GetBoardType } from "../../../../types/DataTypes";

export const CreateBoard = (props: {
  boardData: GetBoardType[];
  setIsModalOpenCB: (value: boolean) => void;
  setBoardDataCB: (value: GetBoardType[]) => void;
}) => {
  const [newBoardDetails, setNewBoardDetails] = useState<ManageBoard>({
    title: "",
    description: "",
  });
  const [buttonLoading, setButtonLoading] = useState(false);

  const submitBoard = async () => {
    if (newBoardDetails.title === "" || newBoardDetails.description === "")
      return;
    setButtonLoading(true);

    const res = await createBoard(newBoardDetails);
    props.setBoardDataCB([...props.boardData, res]);
    setButtonLoading(false);
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
              value={newBoardDetails.title}
              className="border-2 border-gray-500 rounded-lg px-2 text-xl  text-gray-800"
              type="text"
              name="title"
              id="title"
              onChange={(e) =>
                setNewBoardDetails({
                  ...newBoardDetails,
                  title: e.target.value,
                })
              }
            />
            <label className="text-xl text-center text-red-500">
              {newBoardDetails.title === "" ? "Title is required" : ""}
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
              value={newBoardDetails.description}
              className="border-2 border-gray-500 rounded-lg px-2 text-xl  text-gray-800"
              type="text"
              name="description"
              id="description"
              onChange={(e) =>
                setNewBoardDetails({
                  ...newBoardDetails,
                  description: e.target.value,
                })
              }
            />
            <label className="text-xl text-center text-red-500">
              {newBoardDetails.description === ""
                ? "Description is required"
                : ""}
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
            {buttonLoading ? "Loading..." : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};
