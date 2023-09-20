import {
  GetBoardType,
  GetStatusType,
  GetTaskType,
} from "../../../types/DataTypes";
import {
  DaysRemaining,
  GetCompleteDaysRemainingComponent,
  GetDateColor,
  GetPriorityColor,
} from "../../../utils/AppUtils";
import { deleteTask, updateTask } from "../../../utils/FetchRequests";
import { useState } from "react";
import Modal from "../../../components/Modal";
import { EditTasks } from "./manage tasks/EditTask";
import { ManageTask } from "../../../types/RequestTypes";

export const DisplayTasks = (props: {
  taskData: GetTaskType;
  boardData: GetBoardType;
  statusData: GetStatusType;
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <div
      className="flex flex-col justify-between items-center bg-white rounded-lg shadow-lg p-5 m-2 border-b-4 border-black"
      style={{ opacity: props.taskData.completed ? 0.5 : 1 }}
    >
      <div className="flex w-80 ">
        <div className="flex flex-col justify-between items-start">
          <h1 className="text-2xl break-words text-gray-800">
            {props.taskData.title}
          </h1>
          <p className="text-sm break-words text-gray-800">
            {props.taskData.description}
          </p>
        </div>
        <div className="flex justify-between items-start ml-auto gap-2">
          <button
            className="text-white font-bold px-2 py-1 rounded-md"
            style={{
              backgroundColor: props.taskData.completed ? "red" : "green",
            }}
            onClick={async () => {
              if (
                props.taskData.id === undefined ||
                props.boardData.id === undefined ||
                props.statusData.id === undefined
              )
                return;
              const payload: ManageTask = {
                board_object: {
                  title: props.boardData.title,
                  description: props.boardData.description,
                },
                status_object: {
                  title: props.statusData.title,
                  description: props.statusData.description,
                },
                status: props.statusData.id,
                title: props.taskData.title,
                description:
                  props.taskData.description +
                  "|dueDate:" +
                  props.taskData.due_date +
                  "|completed:" +
                  !props.taskData.completed +
                  "|priority:" +
                  props.taskData.priority,
                board: props.boardData.id,
              };
              await updateTask(props.taskData.id, payload, props.boardData.id);
              window.location.reload();
            }}
          >
            {props.taskData.completed ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
          <button
            className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-2 py-1 rounded-md"
            onClick={() => {
              setIsModalOpen(true);
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
                props.taskData.id === undefined ||
                props.boardData.id === undefined ||
                !window.confirm("Are you sure you want to delete this task?")
              ) {
                return;
              }
              await deleteTask(props.taskData.id, props.boardData.id)
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
      <hr className="my-2 w-3/4 mx-auto border-2 border-gray-500 rounded-lg" />

      <div className="flex justify-between items-center w-80">
        <div className="flex justify-between items-center flex-col">
          <h1 className=" font-bold text-gray-800">Due Date</h1>
          {props.taskData.completed ? (
            <p className=" text-gray-800 p-2">--- </p>
          ) : (
            <p
              className=" text-gray-800 border-b-4 rounded-lg p-2"
              style={{ borderColor: GetDateColor(props.taskData.due_date) }}
            >
              {GetCompleteDaysRemainingComponent(props.taskData.due_date)}{" "}
              {DaysRemaining(props.taskData.due_date)} days
            </p>
          )}
        </div>
        <div className="flex justify-between items-center flex-col">
          <h1 className=" font-bold text-gray-800">Completed</h1>
          <p className="mt-1 text-gray-800">
            {props.taskData.completed ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={props.taskData.completed ? "green" : "red"}
                className="w-10 h-10"
              >
                <path
                  fillRule="evenodd"
                  d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={props.taskData.completed ? "green" : "red"}
                className="w-10 h-10"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </p>
        </div>
        <div className="flex justify-between items-center  flex-col">
          <h1 className=" font-bold text-gray-800">Priority</h1>
          {props.taskData.completed ? (
            <p className=" text-gray-800 p-2">--- </p>
          ) : (
            <p
              className=" text-gray-800 border-b-4 rounded-lg p-2"
              style={{ borderColor: GetPriorityColor(props.taskData.priority) }}
            >
              {props.taskData.priority}
            </p>
          )}
        </div>
      </div>
      {props.taskData.id && (
        <Modal open={isModalOpen} closeCB={() => setIsModalOpen(false)}>
          <EditTasks
            statusData={props.statusData}
            boardData={props.boardData}
            setIsModalOpenCB={setIsModalOpen}
            taskId={props.taskData.id}
          />
        </Modal>
      )}
    </div>
  );
};
