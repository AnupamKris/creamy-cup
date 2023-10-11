import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useSelector, useDispatch } from "react-redux";
import { setUser, setToken } from "../authStateSlice";

const Root = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};

export default Root;
