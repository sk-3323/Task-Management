import { NavLink, Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./routes/Home";

function App() {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
}

export default App;
