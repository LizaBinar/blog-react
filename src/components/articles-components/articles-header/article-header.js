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
  const maxTagLength = 12;

  let list = tagList.map((tag, index) => {
    const truncatedTag =
      tag.length > maxTagLength ? `${tag.slice(0, maxTagLength)}...` : tag;
    return <Tag key={index}>{truncatedTag}</Tag>;
  });
  if (list.length > 5) {
    list = list.slice(0, 5);
    list[5] = (
      <Tag color="red" key="more...">
        more...
      </Tag>
    );
  }
  return list;
}

const TruncatedText = ({ className, text, maxLength }) => {
  if (text.length <= maxLength) {
    return <Text className={className}>{text}</Text>;
  }

  const truncatedText = text.substring(0, maxLength) + "...";

  return <Text className={className}>{truncatedText}</Text>;
};

TruncatedText.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  maxLength: PropTypes.number,
};

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
          <TruncatedText
            className={classes.title}
            text={title}
            maxLength={48}
          />
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
