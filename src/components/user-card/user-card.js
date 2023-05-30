import classes from "./user-card.module.css";
import { Avatar, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
const { Text } = Typography;
import PropTypes from "prop-types";

const UserCard = ({ user, comment }) => {
  const { image, username } = user;
  const style = !comment ? { marginTop: "8px" } : null;
  return (
    <div className={classes.user}>
      <div className={classes.text} style={style}>
        <Text className={classes.name}>{username}</Text>
        <Text className={classes.date}>{comment}</Text>
      </div>
      <Avatar size={46} src={image} icon={<UserOutlined />} />
    </div>
  );
};

UserCard.propTypes = {
  user: PropTypes.object,
  comment: PropTypes.string,
};

export default UserCard;
