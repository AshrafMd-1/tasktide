import { DashboardContainer } from "../DashboardContainer";
import { useState } from "react";
import Modal from "../../../components/Modal";
import { CreateBoard } from "./manage boards/CreateBoard";
import { BoardDisplay } from "./BoardDisplay";
import { navigate } from "raviger";
import { GetBoardType } from "../../../types/DataTypes";

const AllBoards = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [boardData, setBoardData] = useState<GetBoardType[]>([]);
  const [boardId, setBoardId] = useState<number | undefined>(undefined);
  const [currentUser] = useState(() => {
    const user =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (user) {
      return user;
    }
    return null;
  });

  if (!currentUser) navigate("/login");
  return (
    <DashboardContainer>
      <div>
        <div className="flex justify-between items-center">
          <h1 className="text-4xl text-gray-800">All Boards</h1>
          <button
            className="bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white font-semibold px-6 py-3 rounded-md mr-6"
            onClick={() => setIsModalOpen(true)}
          >
            Create Board
          </button>
        </div>
        <BoardDisplay
          boardId={boardId}
          BoardData={boardData}
          setBoardIdCB={(value: number | undefined) => setBoardId(value)}
          setBoardDataCB={(value: GetBoardType[]) => setBoardData(value)}
        />
      </div>
      <Modal open={isModalOpen} closeCB={() => setIsModalOpen(false)}>
        <CreateBoard
          boardData={boardData}
          setIsModalOpenCB={(value: boolean) => setIsModalOpen(value)}
          setBoardDataCB={(value: GetBoardType[]) => setBoardData(value)}
        />
      </Modal>
    </DashboardContainer>
  );
};

export default AllBoards;
