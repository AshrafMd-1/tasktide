import { useRoutes } from "raviger";
import { HomePage } from "./homepage/HomePage";
import { Login } from "./authenticate/Login";
import { Signup } from "./authenticate/Signup";
import { Home } from "./dashboard/home/Home";

const routes = {
  "/": () => <HomePage />,
  "/login": () => <Login />,
  "/signup": () => <Signup />,
  "/dashboard": () => <Home />,
};

const App = () => {
  return useRoutes(routes);
};

export default App;
