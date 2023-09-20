import { useEffect, useState } from "react";
import {
  getBoardDetail,
  getStatus,
  getTasks,
} from "../../../utils/FetchRequests";
import { DashboardContainer } from "../DashboardContainer";
import { LoadingScreen } from "../../../components/LoadingScreen";
import { ErrorPage } from "../../../components/ErrorPage";
import { CreateStatus } from "./manage status/CreateStatus";
import Modal from "../../../components/Modal";
import { GetBoardType, GetStatusType } from "../../../types/DataTypes";
import { StatusDisplay } from "./StatusDisplay";
import { ManageTask } from "../../../types/RequestTypes";
import { TaskSorterBasedOnStatus } from "../../../utils/AppUtils";

export const AllStatus = (props: { id: string }) => {
  const [boardData, setBoardData] = useState<GetBoardType>({
    title: "",
    description: "",
  });
  const [statusData, setStatusData] = useState<GetStatusType[]>([]);
  const [taskData, setTaskData] = useState<ManageTask[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const boardResult = await getBoardDetail(Number(props.id));
        setBoardData(boardResult);

        const statusResult = await getStatus();
        if (statusResult.results.length > 0) {
          setStatusData(statusResult.results);
        }

        const taskResult = await getTasks(boardResult.id);
        if (taskResult.results.length > 0) {
          setTaskData(taskResult.results);
        }

        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    fetchData();
  }, [props.id]);

  if (loading) {
    return (
      <DashboardContainer>
        <LoadingScreen />
      </DashboardContainer>
    );
  }

  if (boardData.title === "" && statusData.length === 0) {
    return (
      <ErrorPage
        status="404"
        message="Board Not Found"
        description="The board you are looking for does not exist or the provided ID is incorrect."
      />
    );
  }

  return (
    <DashboardContainer>
      <div>
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-4xl text-gray-800">{boardData.title}</h1>
          <button
            className="bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white font-semibold px-6 py-3 rounded-md mr-6"
            onClick={() => setIsModalOpen(true)}
          >
            Create List
          </button>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-start justify-center">
            {statusData.map(
              (status) =>
                boardData.id &&
                status.id &&
                status.description.split("|BOARD|")[1] ===
                  boardData.id.toString() && (
                  <StatusDisplay
                    key={status.id}
                    statusData={status}
                    boardData={boardData}
                    taskData={TaskSorterBasedOnStatus(status.id, taskData)}
                  />
                ),
            )}
            {statusData.filter(
              (status) =>
                boardData.id &&
                status.description.split("|BOARD|")[1] ===
                  boardData.id.toString(),
            ).length === 0 && (
              <h1 className="text-2xl font-bold text-gray-800 text-center mt-4">
                No statuses found. Please create a status to continue.
              </h1>
            )}
          </div>
        </div>
      </div>
      <Modal open={isModalOpen} closeCB={() => setIsModalOpen(false)}>
        <CreateStatus setIsModalOpenCB={setIsModalOpen} id={props.id} />
      </Modal>
    </DashboardContainer>
  );
};
