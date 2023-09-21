import {
  GetBoardType,
  GetStatusType,
  GetTaskType,
} from "../../../../types/DataTypes";
import { useEffect, useState } from "react";
import { updateTask } from "../../../../utils/FetchRequests";
import { ManageTask } from "../../../../types/RequestTypes";
import { GetPriorityColor, TaskConverter } from "../../../../utils/AppUtils";
import { PriorityOptions } from "../../../../components/Utils";

export const EditTasks = (props: {
  setIsModalOpenCB: (value: boolean) => void;
  statusData: GetStatusType;
  boardData: GetBoardType;
  taskId: number;
  allTasks: ManageTask[];
  setAllTasksCB: (value: ManageTask[]) => void;
}) => {
  const [taskData, setTaskData] = useState<GetTaskType>({
    title: "",
    description: "",
    priority: "",
    due_date: "",
    completed: false,
  });
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);

  useEffect(() => {
    const currentTask = props.allTasks.find((item) => item.id === props.taskId);
    if (currentTask !== undefined) {
      setTaskData(TaskConverter(currentTask));
    }
  }, [props.allTasks, props.taskId]);

  const submitTask = async () => {
    if (
      taskData.title === "" ||
      taskData.description === "" ||
      taskData.priority === "" ||
      taskData.due_date === "" ||
      props.statusData.id === undefined ||
      props.boardData.id === undefined ||
      new Date(taskData.due_date).getTime() < new Date().getTime()
    ) {
      return;
    }
    setButtonLoading(true);
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
      title: taskData.title,
      description:
        taskData.description +
        "|dueDate:" +
        taskData.due_date +
        "|completed:" +
        taskData.completed +
        "|priority:" +
        taskData.priority,
      board: props.boardData.id,
    };
    const allTasks = props.allTasks.filter((item) => item.id !== props.taskId);
    const res = await updateTask(props.taskId, payload, props.boardData.id);
    props.setAllTasksCB([...allTasks, res]);
    setButtonLoading(false);
    props.setIsModalOpenCB(false);
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="mx-auto">
        <h1 className="text-4xl text-gray-800">Update Task</h1>
      </div>
      <hr className="my-5 w-3/4 mx-auto border-2 border-gray-500 rounded-lg" />
      <form>
        <div className="flex justify-center items-center gap-4 flex-col">
          <div className="grid grid-cols-2 gap-4">
            <label
              htmlFor="title"
              className="text-2xl font-bold text-center text-gray-800"
            >
              Title
            </label>
            <input
              value={taskData.title}
              className="border-2 border-gray-500 rounded-lg px-2 text-xl  text-gray-800"
              type="text"
              name="title"
              id="title"
              onChange={(e) =>
                setTaskData({ ...taskData, title: e.target.value })
              }
            />
            <label className="text-xl text-center text-red-500">
              {taskData.title === "" ? "Title cannot be empty" : ""}
            </label>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <label
              className="text-2xl font-bold text-center text-gray-800"
              htmlFor="description"
            >
              Description
            </label>
            <input
              value={taskData.description}
              className="border-2 border-gray-500 rounded-lg px-2 text-xl  text-gray-800"
              type="text"
              name="description"
              id="description"
              onChange={(e) =>
                setTaskData({ ...taskData, description: e.target.value })
              }
            />
            <label className="text-xl text-center text-red-500">
              {taskData.description === "" ? "Description cannot be empty" : ""}
            </label>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <label
              className="text-2xl font-bold text-center text-gray-800"
              htmlFor="priority"
            >
              priority
            </label>
            <select
              value={taskData.priority}
              className="border-x-2 border-t-2 border-x-gray-500 border-t-gray-500 rounded-lg px-2 text-xl  text-gray-800 outline-none"
              style={{
                borderBottomColor: GetPriorityColor(taskData.priority),
                borderBottomWidth: "5px",
              }}
              name="priority"
              id="priority"
              onChange={(e) =>
                setTaskData({ ...taskData, priority: e.target.value })
              }
            >
              <PriorityOptions />
            </select>
            <label className="text-xl text-center text-red-500">
              {taskData.priority === "" ? "Priority is required" : ""}
            </label>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <label
              className="text-2xl font-bold text-center text-gray-800"
              htmlFor="due_date"
            >
              Due Date
            </label>
            <input
              value={taskData.due_date}
              className="border-2 border-gray-500 rounded-lg px-2 text-xl  text-gray-800"
              type="date"
              name="due_date"
              id="due_date"
              onChange={(e) =>
                setTaskData({ ...taskData, due_date: e.target.value })
              }
            />
            <label className="text-xl text-center text-red-500">
              {taskData.due_date === "" ? "Due Date is required" : ""}
              {new Date(taskData.due_date).getTime() < new Date().getTime()
                ? "Due Date cannot be in the past"
                : ""}
            </label>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <label
              className="text-2xl font-bold text-center text-gray-800"
              htmlFor="completed"
            >
              Completed
            </label>
            <input
              value={taskData.completed.toString()}
              className="border-2 border-gray-500 rounded-lg px-2 text-xl  text-gray-800"
              type="checkbox"
              name="completed"
              id="completed"
              onChange={(e) =>
                setTaskData({ ...taskData, completed: e.target.checked })
              }
            />
          </div>
        </div>
        <div className="mt-5 flex justify-center items-center">
          <button
            onClick={(e) => {
              e.preventDefault();
              submitTask();
            }}
            className="bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white font-semibold px-6 py-3 rounded-md "
          >
            {buttonLoading ? "Loading..." : "Update Task"}
          </button>
        </div>
      </form>
    </div>
  );
};
