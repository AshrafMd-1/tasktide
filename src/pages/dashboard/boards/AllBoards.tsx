import { DashboardContainer } from "../DashboardContainer";
import { useState } from "react";
import Modal from "../../../components/Modal";
import { CreateBoard } from "./CreateBoard";
import {BoardDisplay} from "./BoardDisplay";

export const AllBoards = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
        <BoardDisplay />
      </div>
      <Modal open={isModalOpen} closeCB={() => setIsModalOpen(false)}>
        <CreateBoard
          setIsModalOpenCB={(value: boolean) => setIsModalOpen(value)}
        />
      </Modal>
    </DashboardContainer>
  );
};
