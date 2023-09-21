import { useEffect, useState } from "react";
import { ManageBoard } from "../../../../types/RequestTypes";
import { updateBoard } from "../../../../utils/FetchRequests";
import { GetBoardType } from "../../../../types/DataTypes";

export const EditBoard = (props: {
  boardData: GetBoardType[];
  setIsModalOpenCB: (value: boolean) => void;
  boardId: number;
  setBoardDataCB: (value: GetBoardType[]) => void;
}) => {
  const [updateBoardDetails, setUpdateBoardDetails] = useState<ManageBoard>({
    title: "",
    description: "",
  });
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    const currentBoard = props.boardData.find(
      (board) => board.id === props.boardId,
    );
    if (currentBoard) {
      setUpdateBoardDetails({
        title: currentBoard.title,
        description: currentBoard.description,
      });
    }
  }, [props.boardData, props.boardId]);

  const submitBoard = async () => {
    if (
      updateBoardDetails.title === "" ||
      updateBoardDetails.description === ""
    ) {
      return;
    }
    setButtonLoading(true);
    const res = await updateBoard(props.boardId, updateBoardDetails);
    const newBoardData = props.boardData.filter(
      (board) => board.id !== props.boardId,
    );
    props.setBoardDataCB([...newBoardData, res]);
    setButtonLoading(false);
    props.setIsModalOpenCB(false);
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="mx-auto">
        <h1 className="text-4xl text-gray-800">Edit Board</h1>
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
              value={updateBoardDetails.title}
              className="border-2 border-gray-500 rounded-lg px-2 text-xl  text-gray-800"
              type="text"
              name="title"
              id="title"
              onChange={(e) =>
                setUpdateBoardDetails({
                  ...updateBoardDetails,
                  title: e.target.value,
                })
              }
            />
            <label className="text-xl text-center text-red-500">
              {updateBoardDetails.title === "" ? "Title is required" : ""}
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
              value={updateBoardDetails.description}
              className="border-2 border-gray-500 rounded-lg px-2 text-xl  text-gray-800"
              type="text"
              name="description"
              id="description"
              onChange={(e) =>
                setUpdateBoardDetails({
                  ...updateBoardDetails,
                  description: e.target.value,
                })
              }
            />
            <label className="text-xl text-center text-red-500">
              {updateBoardDetails.description === ""
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
            {buttonLoading ? "Loading..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};
