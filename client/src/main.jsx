import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import { Home } from "./screens/Home.jsx";
import { Laptop } from "./screens/Laptop.jsx";
import { LaptopList } from "./screens/LaptopList.jsx";
import { NavBar } from "./components/NavBar.jsx";
import { Protocol } from "./screens/Protocol.jsx";
import { ProtocolList } from "./screens/ProtocolList.jsx";
import { ProtocolElement } from "./screens/ProtocolElement.jsx";
import { LaptopElement } from "./screens/LaptopElement.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/laptop",
    element: <Laptop />,
  },
  {
    path: "/laptop/list",
    element: <LaptopList />,
  },
  {
    path: "/laptop/:id",
    element: <LaptopElement />,
  },
  {
    path: "/protocol",
    element: <Protocol />,
  },
  {
    path: "/protocol/list",
    element: <ProtocolList />,
  },
  {
    path: "/protocol/:id",
    element: <ProtocolElement />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {router.state.location.pathname !== "/" ? <NavBar /> : null}
    <RouterProvider router={router} />
  </React.StrictMode>
);
