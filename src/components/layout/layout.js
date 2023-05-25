import classes from "./layout.module.css";
import Header from "../header/header";
import { Outlet } from "react-router-dom";
import SearchStatus from "../search-status/search-status";
import { useSelector } from "react-redux";

const Layout = () => {
  const status = useSelector((state) => {
    return state.status.status;
  });

  return (
    <div>
      <Header />
      <div className={classes.main}>
        <Outlet />
      </div>

      <SearchStatus status={status} />
    </div>
  );
};

export default Layout;
