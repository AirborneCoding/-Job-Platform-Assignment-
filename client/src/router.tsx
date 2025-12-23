import { createBrowserRouter } from "react-router-dom";
import { HomePage, PositionsPage, PositionsDetails, AdminPage } from "./pages";
import NotFound from "./custom/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/positions",
    element: <PositionsPage />,
  },
  {
    path: "/positions/:id",
    element: <PositionsDetails />,
  },
  {
    path: "/admin",
    element: <AdminPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
