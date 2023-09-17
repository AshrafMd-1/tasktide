import { HomePage } from "./homepage/HomePage";
import { useRoutes } from "raviger";
import { Login } from "./authenticate/Login";
import { Signup } from "./authenticate/Signup";

const routes = {
  "/": () => <HomePage />,
  "/login": () => <Login />,
  "/signup": () => <Signup />,
};

export default function App() {
  return useRoutes(routes);
}
