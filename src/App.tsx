import { useRoutes } from "raviger";
import { lazy, Suspense } from "react";
import { ErrorPage } from "./components/ErrorPage";
import { LoadingScreen } from "./components/LoadingScreen";

const HomePage = lazy(() => import("./pages/homepage/HomePage"));
const Login = lazy(() => import("./pages/authenticate/auth/Login"));
const Signup = lazy(() => import("./pages/authenticate/auth/Signup"));
const Home = lazy(() => import("./pages/dashboard/home/Home"));
const AllBoards = lazy(() => import("./pages/dashboard/boards/AllBoards"));
const AllStatus = lazy(() => import("./pages/dashboard/status/AllStatus"));
const AllTodo = lazy(() => import("./pages/dashboard/todo/AllTodo"));

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
  return <Suspense fallback={<LoadingScreen />}>{useRoutes(routes)}</Suspense>;
};

export default App;
