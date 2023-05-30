import classes from "./articles-header.module.css";
import { HeartOutlined, HeartTwoTone } from "@ant-design/icons";
import { Tag, Typography } from "antd";
import {
  addFavoriteArticle,
  removeFavoriteArticle,
} from "../../../api/articles";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { statusActions } from "../../../reducers/status-reducer";
import PropTypes from "prop-types";

const { Text } = Typography;

function renderTags(tagList) {
  return tagList.map((tag, index) => <Tag key={index}>{tag}</Tag>);
}

const ArticleHeader = ({
  favorited = false,
  status,
  title,
  tagList,
  favoritesCount,
  slug,
}) => {
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(favorited);
  const [likeCount, setLikeCount] = useState(favoritesCount);

  const addLike = async () => {
    try {
      dispatch(statusActions.search());
      await addFavoriteArticle(slug);
      dispatch(statusActions.ok());
      setLiked(true);
      setLikeCount((state) => state + 1);
    } catch {
      dispatch(statusActions.error());
    }
  };

  const removeLike = async () => {
    try {
      dispatch(statusActions.search());
      await removeFavoriteArticle(slug);
      dispatch(statusActions.ok());
      setLiked(false);
      setLikeCount((state) => state - 1);
    } catch {
      dispatch(statusActions.error());
    }
  };

  const generateBtnLike = () => {
    if (status) {
      if (!liked) {
        return (
          <button onClick={() => addLike()}>
            <HeartOutlined />
          </button>
        );
      } else {
        return (
          <button onClick={() => removeLike()}>
            <HeartTwoTone />
          </button>
        );
      }
    } else return <HeartOutlined />;
  };

  return (
    <div className={classes.articleHeader}>
      <div className={classes.articleUp}>
        <Link to={`/articles/${slug}`}>
          <Text className={classes.title}>{title}</Text>
        </Link>
        <div className={classes.likes}>
          {generateBtnLike()}
          <Text>{likeCount}</Text>
        </div>
      </div>
      <div className={classes.tagList}>{renderTags(tagList)}</div>
    </div>
  );
};

ArticleHeader.propTypes = {
  favorited: PropTypes.bool,
  status: PropTypes.bool,
  title: PropTypes.string,
  tagList: PropTypes.array,
  favoritesCount: PropTypes.number,
  slug: PropTypes.string,
};

export default ArticleHeader;
