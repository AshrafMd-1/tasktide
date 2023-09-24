import { Header } from "./Header";
import { Main } from "./Main";
import backgroundImg from "./assets/images/background.jpg";
import { useEffect, useState } from "react";
import { navigate } from "raviger";

const HomePage = () => {
  const [currentUser] = useState(() => {
    const user =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (user) {
      return user;
    }
    return null;
  });

  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard");
    }
  }, [currentUser]);

  return (
    <div
      className="bg-cover  bg-fixed"
      style={{
        backgroundImage: `url(${backgroundImg})`,
      }}
    >
      <div className="flex flex-col min-h-screen">
        <Header />
        <Main />
      </div>
    </div>
  );
};

export default HomePage;
