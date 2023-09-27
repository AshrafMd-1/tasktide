import {
  DaysRemaining,
  GetCompleteDaysRemainingComponent,
  GetDateColor,
  GetPriorityColor,
} from "../../../utils/AppUtils";
import { GetTaskType } from "../../../types/DataTypes";

export const TaskDisplayOverview = (props: {
  taskData: GetTaskType[];
  condition: -1 | 0 | 1;
  title: string;
  notFoundMessage: string;
}) => {
  const { taskData } = props;

  const conditionGiver = (condition: -1 | 0 | 1, task: GetTaskType) => {
    if (condition === -1) {
      return DaysRemaining(task.due_date) === -1 && !task.completed;
    } else if (condition === 0) {
      return DaysRemaining(task.due_date) === 0 && !task.completed;
    } else {
      return DaysRemaining(task.due_date) === 1 && !task.completed;
    }
  };
  return (
    <>
      <hr className="my-2" style={{ borderTop: "1px solid rgba(0,0,0,0.1)" }} />
      <div className="flex flex-col justify-between items-center">
        <h1 className="text-3xl text-center text-gray-800">{props.title}</h1>
        <div className="flex flex-wrap gap-3 justify-between items-center">
          {taskData.map(
            (task) =>
              conditionGiver(props.condition, task) && (
                <div
                  className="flex flex-col mx-auto flex-wrap justify-between items-center bg-white rounded-lg shadow-lg p-2 m-2 border-y-4 border-black"
                  key={task.id}
                >
                  <div className="flex w-80 flex-col justify-between items-center">
                    <h1 className="text-3xl break-words text-center text-gray-800">
                      {task.title}
                    </h1>
                    <p className="text-xl break-words text-gray-800">
                      {task.description}
                    </p>
                  </div>
                  <hr className="my-2 w-3/4 mx-auto border-2 border-gray-500 rounded-lg" />

                  <div className="flex justify-between items-center w-80">
                    <div className="flex justify-between items-center flex-col">
                      <h1 className=" font-bold text-gray-800">Due Date</h1>

                      <p
                        className=" text-gray-800 border-b-4 rounded-lg px-2 py-1"
                        style={{
                          borderColor: GetDateColor(task.due_date),
                        }}
                      >
                        {GetCompleteDaysRemainingComponent(task.due_date)}{" "}
                        {DaysRemaining(task.due_date) === -1
                          ? "Overdue"
                          : DaysRemaining(task.due_date)}
                      </p>
                    </div>
                    <div className="flex justify-between items-center  flex-col">
                      <h1 className=" font-bold text-gray-800">Priority</h1>

                      <p
                        className=" text-gray-800 border-b-4 rounded-lg px-2 py-1"
                        style={{
                          borderColor: GetPriorityColor(task.priority),
                        }}
                      >
                        {task.priority}
                      </p>
                    </div>
                  </div>
                </div>
              ),
          )}
          {taskData.filter((task) => conditionGiver(props.condition, task))
            .length === 0 && (
            <p className="text-xl text-green-600 text-center">
              {props.notFoundMessage}
            </p>
          )}
        </div>
      </div>
    </>
  );
};
