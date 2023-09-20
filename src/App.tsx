import { useRoutes } from "raviger";
import { HomePage } from "./pages/homepage/HomePage";
import { Login } from "./pages/authenticate/auth/Login";
import { Signup } from "./pages/authenticate/auth/Signup";
import { Home } from "./pages/dashboard/home/Home";
import { ErrorPage } from "./components/ErrorPage";
import { AllBoards } from "./pages/dashboard/boards/AllBoards";
import { AllStatus } from "./pages/dashboard/status/AllStatus";
import { AllTodo } from "./pages/dashboard/todo/AllTodo";

const routes = {
  "/": () => <HomePage />,
  "/login": () => <Login />,
  "/signup": () => <Signup />,
  "/dashboard": () => <Home />,
  "/boards": () => <AllBoards />,
  "/boards/:id": ({ id }: { id: string }) => <AllStatus id={id} />,
  "/todo": () => <AllTodo />,
  "*": () => (
    <ErrorPage
      status={"404"}
      message={"Page not found"}
      description={
        "Oops! The page you are looking for does not exist. It might have been moved or deleted."
      }
    />
  ),
};

const App = () => {
  return useRoutes(routes);
};

export default App;
