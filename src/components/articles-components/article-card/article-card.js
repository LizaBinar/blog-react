import classes from "./article-card.module.css"
import {Typography} from "antd";
import UserCard from "../../user-card/user-card";
import ReactMarkdown from "react-markdown";
import ArticleHeader from "../articles-header/article-header";
import moment from 'moment';

function formatDate(date) {
    return moment(date).format('MMMM D, YYYY');
}

const {Paragraph} = Typography;

const ArticleCard = ({title, body, author, description, tagList, favoritesCount, createdAt}) => {
    const colorDescription = (body === undefined) ? "#000000" : "rgba(0,0,0,0.5)"
    const styleBody = (body === undefined) ? {display: "none"} : {display: "block"}
    return (
        <div className={classes.articleCard}>
            <div className={classes.articleLeft}>
                <div className={classes.spaceBetween}>
                    <ArticleHeader title={title} tagList={tagList} favoritesCount={favoritesCount}/>
                    <Paragraph style={{color: colorDescription}}>
                        <ReactMarkdown>
                            {description}
                        </ReactMarkdown>
                    </Paragraph>
                </div>
                <Paragraph style={styleBody}>
                    <ReactMarkdown>
                        {body}
                    </ReactMarkdown>
                </Paragraph>
            </div>
            <div className={classes.articleRight}>
                <UserCard author={author} comment={formatDate(createdAt)}/>
            </div>
        </div>
    )
}

export default ArticleCard
