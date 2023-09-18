import { Header } from "./Header";
import { Main } from "./Main";
import backgroundImg from "./background.jpg";

export const HomePage = () => {

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
