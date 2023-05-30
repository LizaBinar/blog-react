import classes from "./header.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";
import { getProfile } from "../../api/users";
import { clearUser } from "../../reducers/user-reducer";
import UserCard from "../user-card/user-card";
import { Link } from "react-router-dom";
import Title from "antd/es/typography/Title";

function Header() {
  const userFromSession = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [user, setUser] = useState({});

  const handleUser = async () => {
    if (userFromSession) {
      const res = await getProfile(userFromSession.username);
      setUser(res.profile);
    } else {
      setUser({});
    }
  };

  useEffect(() => {
    handleUser();
  }, [userFromSession]);

  const handleLogout = () => {
    dispatch(clearUser());
  };

  const renderRight = () => {
    if (Object.keys(user).length !== 0) {
      return (
        <>
          <Link to="/new-article">
            <Button type="text">New Article</Button>
          </Link>
          <Link to="/profile">
            <UserCard user={user} />
          </Link>
          <Button type="text" onClick={handleLogout}>
            Log Out
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Link to="/sign-in">
            <Button type="text">Sign In</Button>
          </Link>
          <Link to="/sign-up">
            <Button className={classes.btn}>Sign Up</Button>
          </Link>
        </>
      );
    }
  };

  return (
    <header className={classes.header}>
      <Link to="/">
        <Title level={5}>Realworld Blog</Title>
      </Link>
      <div className={classes.btnGroup}>{renderRight()}</div>
    </header>
  );
}

export default Header;
