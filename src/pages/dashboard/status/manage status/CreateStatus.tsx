import { useState } from "react";
import { ManageStatus } from "../../../../types/RequestTypes";
import { createStatus } from "../../../../utils/FetchRequests";
import { GetStatusType } from "../../../../types/DataTypes";

export const CreateStatus = (props: {
  setIsModalOpenCB: (value: boolean) => void;
  id: string;
  statusData: GetStatusType[];
  setStatusDataCB: (value: GetStatusType[]) => void;
}) => {
  const [newStatusData, setNewStatusData] = useState<ManageStatus>({
    title: "",
    description: "",
  });
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);

  const submitStatus = async () => {
    if (newStatusData.title === "" || newStatusData.description === "") return;
    setButtonLoading(true);
    const res = await createStatus({
      ...newStatusData,
      description: newStatusData.description + "|BOARD|" + props.id,
    });
    props.setStatusDataCB([...props.statusData, res]);
    setButtonLoading(false);
    props.setIsModalOpenCB(false);
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="mx-auto">
        <h1 className="text-4xl text-gray-800">Create List</h1>
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
              value={newStatusData.title}
              className="border-2 border-gray-500 rounded-lg px-2 text-xl  text-gray-800"
              type="text"
              name="title"
              id="title"
              onChange={(e) =>
                setNewStatusData({ ...newStatusData, title: e.target.value })
              }
            />
            <label className="text-xl text-center text-red-500">
              {newStatusData.title === "" ? "Title is required" : ""}
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
              value={newStatusData.description}
              className="border-2 border-gray-500 rounded-lg px-2 text-xl  text-gray-800"
              type="text"
              name="description"
              id="description"
              onChange={(e) =>
                setNewStatusData({
                  ...newStatusData,
                  description: e.target.value,
                })
              }
            />
            <label className="text-xl text-center text-red-500">
              {newStatusData.description === ""
                ? "Description is required"
                : ""}
            </label>
          </div>
        </div>
        <div className="mt-5 flex justify-center items-center">
          <button
            onClick={(e) => {
              e.preventDefault();
              submitStatus();
            }}
            className="bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white font-semibold px-6 py-3 rounded-md "
          >
            {buttonLoading ? "Creating..." : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};
