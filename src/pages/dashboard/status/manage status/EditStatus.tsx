import { useEffect, useState } from "react";
import { ManageStatus } from "../../../../types/RequestTypes";
import { getStatusDetail, updateStatus } from "../../../../utils/FetchRequests";
import { ErrorPage } from "../../../../components/ErrorPage";
import { LoadingScreen } from "../../../../components/LoadingScreen";

export const EditStatus = (props: {
  setIsStatusModalOpenCB: (value: boolean) => void;
  statusId: number;
}) => {
  const [statusData, setStatusData] = useState<ManageStatus>({
    title: "",
    description: "",
  });
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const [boardId, setBoardId] = useState<number>(0);

  useEffect(() => {
    const fetchStatusDetails = async () => {
      return await getStatusDetail(props.statusId);
    };
    fetchStatusDetails()
      .then((res) => {
        if (res.title.length === 0) {
          setNotFound(true);
          return;
        }
        setStatusData({
          ...statusData,
          title: res.title,
          description: res.description.split("|")[0],
        });
        setBoardId(res.description.split("|BOARD|")[1]);
        setLoading(false);
      })
      .catch((err) => {
        setNotFound(true);
        console.log(err);
      });
  }, [props.statusId]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (notFound) {
    return (
      <ErrorPage
        status="204"
        message="No Content Found"
        description="The requested content could not be found."
      />
    );
  }

  const submitStatus = async () => {
    if (statusData.title === "" || statusData.description === "") return;

    const payload = {
      title: statusData.title,
      description: statusData.description + "|BOARD|" + boardId,
    };
    await updateStatus(props.statusId, payload);
    window.location.reload();
    setStatusData({
      title: "",
      description: "",
    });
    props.setIsStatusModalOpenCB(false);
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="mx-auto">
        <h1 className="text-4xl text-gray-800">Edit Board</h1>
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
              value={statusData.title}
              className="border-2 border-gray-500 rounded-lg px-2 text-xl  text-gray-800"
              type="text"
              name="title"
              id="title"
              onChange={(e) =>
                setStatusData({ ...statusData, title: e.target.value })
              }
            />
            <label className="text-xl text-center text-red-500">
              {statusData.title === "" ? "Title is required" : ""}
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
              value={statusData.description}
              className="border-2 border-gray-500 rounded-lg px-2 text-xl  text-gray-800"
              type="text"
              name="description"
              id="description"
              onChange={(e) =>
                setStatusData({ ...statusData, description: e.target.value })
              }
            />
            <label className="text-xl text-center text-red-500">
              {statusData.description === "" ? "Description is required" : ""}
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
