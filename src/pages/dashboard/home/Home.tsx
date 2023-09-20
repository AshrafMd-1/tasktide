import { DashboardContainer } from "../DashboardContainer";
import { useEffect, useState } from "react";
import { CurrentUser } from "../../../types/User";
import { ErrorPage } from "../../../components/ErrorPage";
import { LoadingScreen } from "../../../components/LoadingScreen";
import { getProfile } from "../../../utils/FetchRequests";

export const Home = () => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfile()
      .then((res) => {
        setCurrentUser(res);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
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
        <h1 className="text-5xl font-bold text-center text-gray-800 ">
          Overview
        </h1>
        <p className="text-gray-500 text-center ">
          Current status of your account
        </p>
        <hr className="my-5" />
      </div>
    </DashboardContainer>
  );
};
