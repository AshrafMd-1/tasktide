import { useEffect, useState } from "react";
import {
  getBoardDetail,
  getStatus,
  getTasks,
} from "../../../utils/FetchRequests";
import { LoadingScreen } from "../../../components/LoadingScreen";
import { ErrorPage } from "../../../components/ErrorPage";
import { GetBoardType, GetStatusType } from "../../../types/DataTypes";
import { ManageTask } from "../../../types/RequestTypes";
import { DaysRemaining } from "../../../utils/AppUtils";

export const DisplayTaskInTile = (props: { id: string }) => {
  const [boardData, setBoardData] = useState<GetBoardType>({
    title: "",
    description: "",
  });
  const [statusData, setStatusData] = useState<GetStatusType[]>([]);
  const [taskData, setTaskData] = useState<ManageTask[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [taskFilter, setTaskFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [completedFilter, setCompletedFilter] = useState("");
  const [dueDateFilter, setDueDateFilter] = useState("");

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

  const filteredTasks = taskData.filter((task) => {
    return (
      (taskFilter === "" ||
        task.title.toLowerCase().includes(taskFilter.toLowerCase())) &&
      (statusFilter === "" ||
        task.status_object.title
          .toLowerCase()
          .includes(statusFilter.toLowerCase())) &&
      (priorityFilter === "" ||
        task.description.split("|")[3].split(":")[1].toLowerCase() ===
          priorityFilter.toLowerCase()) &&
      (completedFilter === "" ||
        task.description.split("|")[2].split(":")[1].toLowerCase() ===
          completedFilter.toLowerCase()) &&
      (dueDateFilter === "" ||
        DaysRemaining(task.description.split("|")[1].split(":")[1]) === -1 ||
        (dueDateFilter === "Overdue" &&
          DaysRemaining(task.description.split("|")[1].split(":")[1]) === -1) ||
        (dueDateFilter === "Today" &&
          DaysRemaining(task.description.split("|")[1].split(":")[1]) === 0) ||
        (dueDateFilter === "Tomorrow" &&
          DaysRemaining(task.description.split("|")[1].split(":")[1]) === 1) ||
        (dueDateFilter === "Later" &&
          DaysRemaining(task.description.split("|")[1].split(":")[1]) >= 1))
    );
  });

  if (loading) {
    return (
      <div
        className="flex justify-center items-center"
        style={{ height: "calc(100vh - 64px)" }}
      >
        <LoadingScreen />
      </div>
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
    <div className="block mt-5 mx-2 w-full overflow-x-auto">
      <div className="flex justify-start items-center mx-5 mb-5">
        <input
          type="text"
          placeholder="Filter by Task"
          className="block  p-2 border border-gray-300 rounded-xl mt-2"
          value={taskFilter}
          onChange={(e) => setTaskFilter(e.target.value)}
        />
        <select
          value={statusFilter}
          className="block  p-2 border border-gray-300 rounded-xl mt-2 ml-2"
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Filter by List</option>
          {statusData.map((status) => (
            <option key={status.id} value={status.title}>
              {status.title}
            </option>
          ))}
        </select>
        <select
          value={completedFilter}
          className="block  p-2 border border-gray-300 rounded-xl mt-2 ml-2"
          onChange={(e) => setCompletedFilter(e.target.value)}
        >
          <option value="">Filter by Completed</option>
          <option value="false">In-Complete</option>
          <option value="true">Complete</option>
        </select>
        <select
          value={priorityFilter}
          className="block  p-2 border border-gray-300 rounded-xl mt-2 ml-2"
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="">Filter by Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <select
          value={dueDateFilter}
          className="block  p-2 border border-gray-300 rounded-xl mt-2 ml-2"
          onChange={(e) => setDueDateFilter(e.target.value)}
        >
          <option value="">Filter by Due Date</option>
          <option value="Overdue">Overdue</option>
          <option value="Today">Today</option>
          <option value="Tomorrow">Tomorrow</option>
          <option value="Later">Later</option>
        </select>
        <button
          className="block bg-blue-500 text-white p-2 font-bold rounded-xl mt-2 ml-2 hover:bg-red-500"
          onClick={() => {
            setTaskFilter("");
            setStatusFilter("");
            setPriorityFilter("");
            setCompletedFilter("");
            setDueDateFilter("");
          }}
        >
          Clear Filters
        </button>
      </div>
      <div>
        <table className="table-auto w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-gray-500 uppercase border-b border-r border-gray-100">
                S.no
              </th>
              <th className="px-6 py-3 bg-gray-50 text-gray-500 uppercase border-b border-r border-gray-100">
                Task
              </th>
              <th className="px-6 py-3 bg-gray-50 text-gray-500 uppercase border-b border-r border-gray-100">
                Description
              </th>
              <th className="px-6 py-3 bg-gray-50 text-gray-500 uppercase border-b border-r border-gray-100">
                List
              </th>
              <th className="px-6 py-3 bg-gray-50 text-gray-500 uppercase border-b border-r border-gray-100">
                Completed
              </th>
              <th className="px-6 py-3 bg-gray-50 text-gray-500 uppercase border-b border-r border-gray-100">
                Priority
              </th>
              <th className="px-6 py-3 bg-gray-50 text-gray-500 uppercase border-b border-r border-gray-100">
                Due Date
              </th>
              <th className="px-6 py-3 bg-gray-50 text-gray-500 uppercase border-b border-gray-100">
                Days Left
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task, index) => (
              <tr key={task.id}>
                <td className="border-b border-r border-gray-100 px-6 py-4">
                  {index + 1}
                </td>
                <td className="border-b border-r border-gray-100 px-6 py-4">
                  {task.title}
                </td>
                <td className="border-b border-r border-gray-100 px-6 py-4">
                  {task.description.split("|")[0]}
                </td>
                <td className="border-b border-r border-gray-100 px-6 py-4">
                  {task.status_object.title}
                </td>
                <td className="border-b border-r border-gray-100 px-6 py-4">
                  {task.description.split("|")[2].split(":")[1]}
                </td>
                <td className="border-b border-r border-gray-100 px-6 py-4">
                  {task.description.split("|")[3].split(":")[1]}
                </td>
                <td className="border-b border-r border-gray-100 px-6 py-4">
                  {task.description.split("|")[1].split(":")[1]}
                </td>
                <td className="border-b border-gray-100 px-6 py-4">
                  {DaysRemaining(
                    task.description.split("|")[1].split(":")[1],
                  ) === -1
                    ? "Overdue"
                    : DaysRemaining(
                        task.description.split("|")[1].split(":")[1],
                      )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
