import { StrictMode } from "react";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/Home.jsx";
import { getAllTasks, getTaskById } from "./lib/loader.js";
import AddTask from "./routes/AddTask.jsx";
import Login from "./routes/Login.jsx";
import { Provider } from "react-redux";
import store from "./store/index.js";
import Signup from "./routes/Signup.jsx";
import UpdateTask from "./routes/UpdateTask.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        loader: getAllTasks,
        element: <Home />,
      },
      {
        path: "/add-task",
        element: <AddTask />,
      },
      {
        path: "/edit-task/:id",
        loader: getTaskById,
        element: <UpdateTask />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
