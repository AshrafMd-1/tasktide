import { useEffect, useState } from "react";
import { deleteBoard, getBoards } from "../../../utils/Fetch";
import { GetBoardType } from "../../../types/DataTypes";
import { LoadingScreen } from "../../../components/LoadingScreen";
import Modal from "../../../components/Modal";
import { EditBoard } from "./EditBoard";
import { ErrorPage } from "../../../components/ErrorPage";

export const BoardDisplay = () => {
  const [boardDetails, setBoardDetails] = useState<GetBoardType[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [boardId, setBoardId] = useState<number | undefined>(undefined);

  useEffect(() => {
    const fetchBoardDetails = async () => {
      return await getBoards();
    };
    fetchBoardDetails()
      .then((res) => {
        if (res.results.length === 0) {
          return;
        }
        setBoardDetails(res.results);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  if (boardDetails.length === 0) {
    return <h1>No boards found</h1>;
  }

  return (
    <div className="flex flex-wrap justify-center items-center gap-4 mt-4">
      {boardDetails.map((board) => {
        return (
          <div
            className="bg-white shadow-lg rounded-lg px-4 py-6 w-80 m-2"
            key={board.id}
          >
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold text-gray-800 break-all">
                {board.title}
              </h1>
              <div className="flex justify-between items-center gap-2">
                <button
                  className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-2 py-1 rounded-md"
                  onClick={() => {
                    setIsModalOpen(true);
                    setBoardId(board.id);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                    <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
                  </svg>
                </button>
                <button
                  className="bg-red-400 hover:bg-red-500 text-white font-semibold px-2 py-1 rounded-md"
                  onClick={async () => {
                    if (
                      board.id === undefined ||
                      !window.confirm(
                        "Are you sure you want to delete this board?",
                      )
                    ) {
                      return;
                    }
                    await deleteBoard(board.id)
                      .then(() => {
                        window.location.reload();
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <p className="mt-2 text-gray-600 break-all">{board.description}</p>
            {board.created_date && (
              <p className="mt-2 text-gray-600 break-all">
                Created on:{" "}
                <span className="text-violet-500 font-bold">
                  {new Date(board.created_date).toLocaleDateString()}
                </span>
              </p>
            )}
            {board.modified_date && (
              <p className="mt-2 text-gray-600 break-all">
                Modified on:{" "}
                <span className="text-violet-500 font-bold">
                  {new Date(board.modified_date).toLocaleDateString()}
                </span>
              </p>
            )}
          </div>
        );
      })}
      <Modal
        open={isModalOpen}
        closeCB={() => {
          setIsModalOpen(false);
        }}
      >
        {boardId ? (
          <EditBoard boardId={boardId} setIsModalOpenCB={setIsModalOpen} />
        ) : (
          <ErrorPage
            status="400"
            message="Bad Request"
            description="The Id of the board is not defined"
          />
        )}
      </Modal>
    </div>
  );
};
