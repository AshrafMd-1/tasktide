import { DashboardContainer } from "../DashboardContainer";
import { useEffect, useState } from "react";
import { GetBoardType } from "../../../types/DataTypes";
import { getBoards } from "../../../utils/FetchRequests";
import { LoadingScreen } from "../../../components/LoadingScreen";
import { navigate } from "raviger";
import { DisplayTaskInTile } from "./DisplayTaskInTile";

export const AllTodo = () => {
  const [boardData, setBoardData] = useState<GetBoardType[]>([]);
  const [boardId, setBoardId] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentUser] = useState(() => {
    const user =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (user) {
      return user;
    }
    return null;
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const boardResult = await getBoards();
        if (boardResult.results.length > 0) {
          setBoardData(boardResult.results);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    fetchData();
  }, []);

  if (currentUser === null) {
    navigate("/login");
    return null;
  }

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
      <div className="flex gap-4 flex-wrap">
        <div>
          <label htmlFor="board" className="text-gray-800 text-xl">
            Select Board
          </label>
          <select
            name="board"
            id="board"
            defaultValue={0}
            className="block  p-2 border border-gray-300 rounded mt-2"
            onChange={(e) => {
              setBoardId(Number(e.target.value));
            }}
          >
            <option disabled value={0}>
              Select Board
            </option>
            {boardData.map((board) => (
              <option key={board.id} value={board.id}>
                {board.title}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex gap-4 flex-wrap">
        {boardId === 0 ? (
          <div className="flex justify-between mt-5 mx-auto items-center">
            <div className="flex gap-4 flex-wrap">
              <h1 className="text-4xl text-gray-800">Select a board</h1>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <div className="flex gap-4 justify-center items-center flex-wrap">
              <DisplayTaskInTile id={boardId.toString()} />
            </div>
          </div>
        )}
      </div>
    </DashboardContainer>
  );
};
