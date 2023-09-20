import { DashboardContainer } from "../DashboardContainer";
import { useEffect, useState } from "react";
import {
  GetBoardType,
  GetStatusType,
  GetTaskType,
} from "../../../types/DataTypes";
import { getBoards } from "../../../utils/FetchRequests";
import { LoadingScreen } from "../../../components/LoadingScreen";

export const AllTodo = () => {
  const [boardData, setBoardData] = useState<GetBoardType[]>([]);
  const [statusData, setStatusData] = useState<GetStatusType[]>([]);
  const [taskData, setTaskData] = useState<GetTaskType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [boardId, setBoardId] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const boardResult = await getBoards();
        if (boardResult.results.length === 0) return;
        setBoardData(boardResult.results);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    fetchBoards();
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const boardResult = await getBoardDetail(Number(props.id));
  //       setBoardData(boardResult);
  //
  //       const statusResult = await getStatus();
  //       if (statusResult.results.length > 0) {
  //         setStatusData(statusResult.results);
  //       }
  //
  //       const taskResult = await getTasks(boardResult.id);
  //       if (taskResult.results.length > 0) {
  //         setTaskData(taskResult.results);
  //       }
  //
  //       setLoading(false);
  //     } catch (error) {
  //       setLoading(false);
  //       console.log(error);
  //     }
  //   };
  //   fetchData();
  // }, [props.id]);
  //

  if (loading) {
    return (
      <DashboardContainer>
        <LoadingScreen />
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-4xl text-gray-800">Tasks Overview</h1>
      </div>
      <div>
        <div>
          <label htmlFor="board" className="text-gray-800 text-xl">
            Select Board
          </label>
          <select
            name="board"
            id="board"
            className="block  p-2 border border-gray-300 rounded mt-2"
            onChange={(e) => setBoardId(Number(e.target.value))}
          >
            <option
              value={0}
              disabled
              selected
              className="text-gray-800 text-sm disabled:opacity-50"
            >
              Select Board
            </option>
            {boardData.map((board) => (
              <option key={board.id} value={board.id}>
                {board.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="status" className="text-gray-800 text-xl">
            Select Priority
          </label>
          <select
            name="status"
            id="status"
            className="block  p-2 border border-gray-300 rounded mt-2"
            onChange={(e) => setBoardId(Number(e.target.value))}
          >
            <option
              value={0}
              disabled
              selected
              className="text-gray-800 text-sm disabled:opacity-50"
            >
              Select Priority
            </option>
            <option value={1}>Low</option>
            <option value={2}>Medium</option>
            <option value={3}>High</option>
          </select>
        </div>
        <div>
          <label htmlFor="dueDate" className="text-gray-800 text-xl">
            Select Due Date
          </label>
          <select
            name="dueDate"
            id="dueDate"
            className="block  p-2 border border-gray-300 rounded mt-2"
            onChange={(e) => setBoardId(Number(e.target.value))}
          >
            <option
              value={0}
              disabled
              selected
              className="text-gray-800 text-sm disabled:opacity-50"
            >
              Select Due Date
            </option>
            <option value={-1}>Overdue</option>
            <option value={1}>Today</option>
            <option value={2}>Tomorrow</option>
            <option value={3}>This Week</option>
            <option value={4}>This Month</option>
          </select>
        </div>
        <div>
          <label htmlFor="status" className="text-gray-800 text-xl">
            Select Status
          </label>
          <select
            name="status"
            id="status"
            className="block  p-2 border border-gray-300 rounded mt-2"
            onChange={(e) => setBoardId(Number(e.target.value))}
          >
            <option
              value={0}
              disabled
              selected
              className="text-gray-800 text-sm disabled:opacity-50"
            >
              Select Status
            </option>
            <option value={2}>InComplete</option>
            <option value={2}>Completed</option>
          </select>
        </div>
      </div>
    </DashboardContainer>
  );
};
