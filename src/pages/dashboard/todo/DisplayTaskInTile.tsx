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
  const [priorityFilter, setPriorityFilter] = useState("");

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
      (priorityFilter === "" ||
        task.description.split("|")[3].split(":")[1].toLowerCase() ===
          priorityFilter.toLowerCase())
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
    <div className="block mt-5 w-full overflow-x-auto">
      <div className="flex justify-start items-center mb-5">
        <input
          type="text"
          placeholder="Filter by Task"
          className="block  p-2 border border-gray-300 rounded mt-2"
          value={taskFilter}
          onChange={(e) => setTaskFilter(e.target.value)}
        />
        <select
          value={priorityFilter}
          className="block  p-2 border border-gray-300 rounded mt-2 ml-2"
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="">Filter by Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
      <div>
        <table className="table-auto w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-gray-500 uppercase border-b border-r border-gray-100">
                Task
              </th>
              <th className="px-6 py-3 bg-gray-50 text-gray-500 uppercase border-b border-r border-gray-100">
                Description
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
            {filteredTasks.map((task) => (
              <tr key={task.id}>
                <td className="border-b border-r border-gray-100 px-6 py-4">
                  {task.title}
                </td>
                <td className="border-b border-r border-gray-100 px-6 py-4">
                  {task.description.split("|")[0]}
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
