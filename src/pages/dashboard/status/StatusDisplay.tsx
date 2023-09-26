import { GetBoardType, GetStatusType } from "../../../types/DataTypes";
import { useState } from "react";
import Modal from "../../../components/Modal";
import { CreateTasks } from "../tasks/manage tasks/CreateTasks";
import { ManageTask } from "../../../types/RequestTypes";
import { DisplayTasks } from "../tasks/DisplayTasks";
import { TaskSorterBasedOnPriorityAndDateAndCompleted } from "../../../utils/AppUtils";
import { deleteStatus } from "../../../utils/FetchRequests";
import { ErrorPage } from "../../../components/ErrorPage";
import { EditStatus } from "./manage status/EditStatus";

export const StatusDisplay = (props: {
  statusData: GetStatusType;
  allStatusData: GetStatusType[];
  boardData: GetBoardType;
  setStatusDataCB: (value: GetStatusType[]) => void;
  taskData: ManageTask[];
  setTaskDataCB: (value: ManageTask[]) => void;
  allTaskData: ManageTask[];
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState<boolean>(false);
  return (
    <div className="bg-white flex flex-col  shadow-lg rounded-lg px-4 py-6 w-100 m-2">
      <div className="flex justify-between mb-3 gap-3  items-center">
        <h1 className="text-xl font-bold text-gray-800 mr-2">
          {props.statusData.title}
        </h1>
        <div className="flex justify-between items-center gap-2">
          <button
            className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-2 py-1 rounded-md"
            onClick={async () => {
              setIsStatusModalOpen(true);
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
                props.statusData.id === undefined ||
                !window.confirm("Are you sure you want to delete this list?")
              ) {
                return;
              }
              const newStatusData = props.allStatusData.filter(
                (item) => item.id !== props.statusData.id,
              );
              props.setStatusDataCB(newStatusData);
              await deleteStatus(props.statusData.id).catch((err) => {
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
      <div>
        <p className="text-gray-600 break-all">
          {props.statusData.description.split("|BOARD|")[0]}
        </p>
      </div>
      <div className="flex justify-between items-center flex-col flex-wrap p-4 bg-gray-200 rounded-lg mt-3">
        {TaskSorterBasedOnPriorityAndDateAndCompleted(props.taskData).map(
          (task) =>
            props.boardData.id &&
            task.id && (
              <DisplayTasks
                taskId={task.id}
                key={task.id}
                boardData={props.boardData}
                statusData={props.statusData}
                allTasks={props.allTaskData}
                setAllTasksCB={(value: ManageTask[]) =>
                  props.setTaskDataCB(value)
                }
              />
            ),
        )}
        {props.taskData.length === 0 && (
          <h1 className=" font-bold text-gray-800 text-center">No Tasks</h1>
        )}
      </div>
      <div className="flex justify-between items-center mt-3">
        <button
          className="bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white font-semibold px-2 py-1 rounded-md"
          onClick={async () => {
            setIsModalOpen(true);
          }}
        >
          ➕ Add Task
        </button>
      </div>
      <Modal open={isModalOpen} closeCB={() => setIsModalOpen(false)}>
        <CreateTasks
          setIsModalOpenCB={setIsModalOpen}
          statusData={props.statusData}
          boardData={props.boardData}
          setAllTasksCB={(value: ManageTask[]) => props.setTaskDataCB(value)}
          allTasks={props.allTaskData}
        />
      </Modal>
      <Modal
        open={isStatusModalOpen}
        closeCB={() => {
          setIsStatusModalOpen(false);
        }}
      >
        {props.statusData.id ? (
          <EditStatus
            statusId={props.statusData.id}
            setIsStatusModalOpenCB={setIsStatusModalOpen}
            statusData={props.allStatusData}
            setStatusDataCB={(value: GetStatusType[]) =>
              props.setStatusDataCB(value)
            }
          />
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
