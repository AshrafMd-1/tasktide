import { useState } from "react";
import { ManageStatus } from "../../../../types/RequestTypes";
import { updateStatus } from "../../../../utils/FetchRequests";
import { GetStatusType } from "../../../../types/DataTypes";

export const EditStatus = (props: {
  setIsStatusModalOpenCB: (value: boolean) => void;
  statusId: number;
  statusData: GetStatusType[];
  setStatusDataCB: (value: GetStatusType[]) => void;
}) => {
  const [boardId, setBoardId] = useState<number>(0);
  const [updateStatusData, setUpdateStatusData] = useState<ManageStatus>(() => {
    const currentStatus = props.statusData.find(
      (status) => status.id === props.statusId,
    );
    if (currentStatus) {
      setBoardId(Number(currentStatus.description.split("|BOARD|")[1]) || 0);
    }
    return {
      title: currentStatus?.title || "",
      description: currentStatus?.description.split("|BOARD|")[0] || "",
    };
  });

  const submitStatus = async () => {
    if (updateStatusData.title === "" || updateStatusData.description === "")
      return;
    const payload = {
      title: updateStatusData.title,
      description: updateStatusData.description + "|BOARD|" + boardId,
    };
    const newStatusData =
      props.statusData.filter((item) => item.id !== props.statusId) || [];

    const currentStatus = props.statusData.find(
      (status) => status.id === props.statusId,
    );

    if (currentStatus) {
      currentStatus.title = updateStatusData.title;
      currentStatus.description =
        updateStatusData.description + "|BOARD|" + boardId;
      props.setStatusDataCB([...newStatusData, currentStatus]);
    }
    props.setIsStatusModalOpenCB(false);
    await updateStatus(props.statusId, payload);
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="mx-auto">
        <h1 className="text-4xl text-gray-800">Update List</h1>
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
              value={updateStatusData.title}
              className="border-2 border-gray-500 rounded-lg px-2 text-xl  text-gray-800"
              type="text"
              name="title"
              id="title"
              onChange={(e) =>
                setUpdateStatusData({
                  ...updateStatusData,
                  title: e.target.value,
                })
              }
            />
            <label className="text-xl text-center text-red-500">
              {updateStatusData.title === "" ? "Title is required" : ""}
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
              value={updateStatusData.description}
              className="border-2 border-gray-500 rounded-lg px-2 text-xl  text-gray-800"
              type="text"
              name="description"
              id="description"
              onChange={(e) =>
                setUpdateStatusData({
                  ...updateStatusData,
                  description: e.target.value,
                })
              }
            />
            <label className="text-xl text-center text-red-500">
              {updateStatusData.description === ""
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
            Update
          </button>
        </div>
      </form>
    </div>
  );
};
