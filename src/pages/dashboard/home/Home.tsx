import { DashboardContainer } from "../DashboardContainer";
import { useEffect, useState } from "react";
import { CurrentUser } from "../../../types/User";
import { ErrorPage } from "../../../components/ErrorPage";
import { LoadingScreen } from "../../../components/LoadingScreen";
import {
  getBoards,
  getProfile,
  getStatus,
  getTasks,
} from "../../../utils/FetchRequests";
import { TaskConverter } from "../../../utils/AppUtils";
import {
  GetBoardType,
  GetStatusType,
  GetTaskType,
} from "../../../types/DataTypes";
import { ManageTask } from "../../../types/RequestTypes";
import { TaskDisplayOverview } from "./TaskDisplayOverview";

export const Home = () => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [boardData, setBoardData] = useState<GetBoardType[]>([]);
  const [statusData, setStatusData] = useState<GetStatusType[]>([]);
  const [taskData, setTaskData] = useState<GetTaskType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileResult = await getProfile();
        setCurrentUser(profileResult);

        const boardResult = await getBoards();
        if (boardResult.results.length > 0) {
          setBoardData(boardResult.results);
        }

        const statusResult = await getStatus();
        if (statusResult.results.length > 0) {
          setStatusData(statusResult.results);
        }

        await Promise.all(
          boardResult.results.map(async (board: GetBoardType) => {
            if (board.id) {
              const taskResult = await getTasks(board.id);
              if (taskResult.results.length > 0) {
                const tasks = taskResult.results
                  .map((task: ManageTask) =>
                    task.id ? TaskConverter(task) : null,
                  )
                  .filter((task: GetTaskType) => task !== null);

                setTaskData((prevTaskData) => {
                  const newTasks = tasks.filter((newTask: GetTaskType) => {
                    return !prevTaskData.some(
                      (existingTask) => existingTask.id === newTask.id,
                    );
                  });

                  return [...prevTaskData, ...newTasks];
                });
              }
            }
          }),
        );

        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <DashboardContainer>
        <LoadingScreen />
      </DashboardContainer>
    );
  }

  if (!currentUser?.username) {
    return (
      <ErrorPage
        status={"401"}
        message={"Unauthorized"}
        description={"Please login to access this page"}
      />
    );
  }
  console.log(taskData);

  return (
    <DashboardContainer>
      <div className="max-w-4xl ">
        <h1 className="text-4xl text-gray-800">
          Welcome back
          <span
            className="text-violet-500 font-bold"
            style={{ textTransform: "capitalize" }}
          >
            &nbsp;
            {currentUser?.username}!
          </span>
        </h1>
        <div>
          <p
            className="text-gray-500 text-xl font-bold"
            style={{ textTransform: "capitalize" }}
          >
            Date :
            <span
              className="text-violet-500 font-bold"
              style={{ textTransform: "capitalize" }}
            >
              &nbsp;
              {new Date().toString().slice(0, 15)}
            </span>
          </p>
        </div>
        <div className="flex justify-between items-center mb-4"></div>
      </div>
      <div className="bg-white rounded-3xl p-8 mb-5 mr-4 ">
        <h1 className="text-3xl font-bold text-center text-gray-800 ">
          Account Overview
        </h1>
        <p className="text-gray-500 text-center ">
          Current status of your account
        </p>
        <hr className="my-5 border-2" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
          <div className="flex justify-between items-center shadow-lg rounded-lg p-5">
            <h1 className="text-2xl text-gray-800">Tasks</h1>
            <p className="text-gray-500 text-xl font-bold">{taskData.length}</p>
          </div>
          <div className="flex justify-between items-center shadow-lg rounded-lg p-5">
            <h1 className="text-2xl text-gray-800">Boards</h1>
            <p className="text-gray-500 text-xl font-bold">
              {boardData.length}
            </p>
          </div>
          <div className="flex justify-between items-center shadow-lg rounded-lg p-5">
            <h1 className="text-2xl text-gray-800">Status</h1>
            <p className="text-gray-500 text-xl font-bold">
              {statusData.length}
            </p>
          </div>
          <div className="flex justify-between items-center shadow-lg rounded-lg p-5">
            <h1 className="text-2xl text-gray-800">Completed Tasks</h1>
            <p className="text-gray-500 text-xl font-bold">
              {taskData.filter((task) => task.completed).length}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-3xl p-8 mb-5 mr-4 ">
        <div className="flex flex-col justify-between items-center">
          <h1 className="text-3xl font-bold text-center text-gray-800 ">
            Priority Overview
          </h1>
          <p className="text-gray-500 text-center ">
            Current priority of your tasks
          </p>
        </div>
        <hr className="my-5 border-2" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex justify-between items-center shadow-lg rounded-lg p-5">
            <h1 className="text-2xl text-gray-800">Low Priority</h1>
            <p className="text-gray-500 text-xl font-bold">
              {taskData.filter((task) => task.priority === "Low").length}
            </p>
          </div>
          <div className="flex justify-between items-center shadow-lg rounded-lg p-5">
            <h1 className="text-2xl text-gray-800">Medium Priority</h1>
            <p className="text-gray-500 text-xl font-bold">
              {taskData.filter((task) => task.priority === "Medium").length}
            </p>
          </div>

          <div className="flex justify-between items-center shadow-lg rounded-lg p-5">
            <h1 className="text-2xl text-gray-800">High Priority</h1>
            <p className="text-gray-500 text-xl font-bold">
              {taskData.filter((task) => task.priority === "High").length}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-3xl p-8 mb-5 mr-4 ">
        <div className="flex flex-col justify-between items-center">
          <h1 className="text-3xl font-bold text-center text-gray-800 ">
            Dues Overview
          </h1>
          <p className="text-gray-500 text-center ">
            Current dues of your tasks
          </p>
        </div>
        <hr className="my-5 border-2" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
          <div className="flex justify-between items-center shadow-lg rounded-lg p-5">
            <h1 className="text-2xl text-gray-800">Overdue</h1>
            <p className="text-gray-500 text-xl font-bold">
              {
                taskData.filter(
                  (task) =>
                    new Date(task.due_date) < new Date() && !task.completed,
                ).length
              }
            </p>
          </div>
          <div className="flex justify-between items-center shadow-lg rounded-lg p-5">
            <h1 className="text-2xl text-gray-800">Today</h1>
            <p className="text-gray-500 text-xl font-bold">
              {
                taskData.filter(
                  (task) =>
                    new Date(task.due_date) === new Date() && !task.completed,
                ).length
              }
            </p>
          </div>
          <div className="flex justify-between items-center shadow-lg rounded-lg p-5">
            <h1 className="text-2xl text-gray-800">Later</h1>
            <p className="text-gray-500 text-xl font-bold">
              {
                taskData.filter(
                  (task) =>
                    new Date(task.due_date) > new Date() && !task.completed,
                ).length
              }
            </p>
          </div>
        </div>
      </div>
      <div
        className="bg-white rounded-3xl p-8 mb-5 mr-4 "
        style={{ minHeight: "50vh" }}
      >
        <h1 className="text-3xl font-bold text-center text-gray-800 ">
          Pending Tasks Overview
        </h1>
        <p className="text-gray-500 text-center ">Current pending tasks</p>
        <div>
          <TaskDisplayOverview
            taskData={taskData}
            condition={-1}
            title={"Tasks Overdue"}
            notFoundMessage={"No tasks overdue"}
          />
          <TaskDisplayOverview
            taskData={taskData}
            condition={0}
            title={"Tasks Due Today"}
            notFoundMessage={"No tasks due today"}
          />
          <TaskDisplayOverview
            taskData={taskData}
            condition={1}
            title={"Tasks Due Later"}
            notFoundMessage={"No tasks due Later"}
          />
        </div>
      </div>
    </DashboardContainer>
  );
};
