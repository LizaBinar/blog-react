import classes from "./user-card.module.css";
import {Avatar, Typography} from "antd";
import {UserOutlined} from "@ant-design/icons";
const {Text} = Typography;

const UserCard = ({ author, comment }) => {
    const { image, username } = author
    return (
        <div className={classes.user}>
            <div className={classes.text}>
                <Text className={classes.name}>{username}</Text>
                <Text className={classes.date}>{comment}</Text>
            </div>
            <Avatar size={46} src={image} icon={<UserOutlined/>}/>
        </div>
    )
}

export default UserCard
