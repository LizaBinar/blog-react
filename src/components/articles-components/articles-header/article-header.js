import classes from "./articles-header.module.css";
import {HeartOutlined} from "@ant-design/icons";
import {Tag, Typography} from "antd";

const {Text} = Typography;

function renderTags(tagList) {
    return tagList.map((tag, index) => (
        <Tag key={index}>{tag}</Tag>
    ));
}

const ArticleHeader = ({title, tagList, favoritesCount}) => {
    return (
        <div className={classes.articleHeader}>
            <div className={classes.articleUp}>
                <Text className={classes.title}>{title}</Text>
                <div className={classes.likes}>
                    <HeartOutlined/>
                    <Text>{favoritesCount}</Text>
                </div>
            </div>
            <div className={classes.tagList}>
                {renderTags(tagList)}
            </div>
        </div>
    );
};

export default ArticleHeader;
