import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Routes,
  Route,
} from "react-router-dom";

import Main from "../pages/Main";
import Signup from "../pages/Signup";
import VideoPage from "../pages/VideoPage";
import Login from "../pages/Login";

function Router() {
  const router = createBrowserRouter([
    { path: "/", element: <Main></Main> },
    { path: "/signup", element: <Signup /> },
    { path: "/video/:id", element: <VideoPage /> },
    { path: "/login", element: <Login /> },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default Router;
