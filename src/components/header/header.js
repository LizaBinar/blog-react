import classes from "./header.module.css"
// import {} from "antd";
import {Button} from "antd";
import {Link} from "react-router-dom";
import Title from "antd/es/typography/Title";

function Header() {

    return (
        <header className={classes.header}>
            <Link to="/">
                <Title level={5}>Realworld Blog</Title>
            </Link>
            <div className={classes.btnGroup}>
                <Button type="text">Sign In</Button>
                <Button className={classes.btn}>Sign Up</Button>
            </div>
        </header>
    )
}

export default Header
