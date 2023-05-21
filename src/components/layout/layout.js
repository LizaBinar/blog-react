import classes from "./layout.module.css"
import Header from "../header/header";
import {Outlet} from "react-router-dom";

const Layout = () => {
    return (
        <div>
            <Header />
            <div className={classes.main}>
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
