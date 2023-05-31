import classes from "./article-card.module.css";
import { Button, Typography } from "antd";
import UserCard from "../../user-card/user-card";
import ReactMarkdown from "react-markdown";
import ArticleHeader from "../articles-header/article-header";
import moment from "moment";
import Card from "../../UI/card/card";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DeleteBtn from "../../UI/delete-btn/delete-btn";
import { statusActions } from "../../../reducers/status-reducer";
import PropTypes from "prop-types";
import { deleteArticle } from "../../../api/articles";

function formatDate(date) {
  return moment(date).format("MMMM D, YYYY");
}

const { Paragraph } = Typography;

const ArticleCard = ({
  title,
  body,
  author,
  description,
  tagList,
  favoritesCount,
  createdAt,
  slug,
  favorited,
}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const loginStatus = () => {
    return user !== null;
  };

  const checkItsMe = () => {
    if (loginStatus()) {
      return user.username === author.username && body !== undefined;
    }
    return false;
  };

  const onDelete = async () => {
    try {
      dispatch(statusActions.search());
      await deleteArticle(slug);
      dispatch(statusActions.ok());
      navigate("/");
    } catch {
      dispatch(statusActions.error());
    }
  };

  const generateUsersButtons = () => {
    if (checkItsMe()) {
      return (
        <div className={classes.btnGroup}>
          <DeleteBtn onDelete={onDelete} />
          <Button onClick={() => navigate("edit/")}>Edit</Button>
        </div>
      );
    } else {
      return null;
    }
  };

  const colorDescription = body === undefined ? "#000000" : "rgba(0,0,0,0.5)";
  const styleBody =
    body === undefined ? { display: "none" } : { display: "block" };
  return (
    <Card className={classes.articleCard}>
      <div className={classes.articleLeft}>
        <div className={classes.articleTop}>
          <div className={classes.spaceBetween}>
            <ArticleHeader
              favorited={favorited}
              status={loginStatus()}
              title={title}
              tagList={tagList}
              favoritesCount={favoritesCount}
              slug={slug}
            />
          </div>
          <UserCard user={author} comment={formatDate(createdAt)} />
        </div>
        <div className={classes.description}>
          <Paragraph ellipsis={{ rows: 2 }} style={{ color: colorDescription }}>
            <ReactMarkdown>{description}</ReactMarkdown>
          </Paragraph>
          {generateUsersButtons()}
        </div>
        <Paragraph style={styleBody}>
          <ReactMarkdown>{body}</ReactMarkdown>
        </Paragraph>
      </div>
    </Card>
  );
};

ArticleCard.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  author: PropTypes.object,
  description: PropTypes.string,
  tagList: PropTypes.array,
  favoritesCount: PropTypes.number,
  createdAt: PropTypes.string,
  slug: PropTypes.string,
  favorited: PropTypes.bool,
};

export default ArticleCard;
