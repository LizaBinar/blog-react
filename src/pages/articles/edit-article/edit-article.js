import classes from "./edit-article.module.css";
import ArticleForm from "../../../components/articles-components/article-form/article-form";
import Card from "../../../components/UI/card/card";
import { useEffect, useState } from "react";
import { getArticleBySlug, updateArticle } from "../../../api/articles";
import { useNavigate, useParams } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { statusActions } from "../../../reducers/status-reducer";
import { convertObjectToList } from "../../../components/UI/tag-form/tag-form";
import useAuthenticationProtect from "../../../hooks/use-authentication-protect";

const EditArticle = () => {
  useAuthenticationProtect();
  const navigate = useNavigate();
  const { slug } = useParams();
  const { user } = useSelector(state => state.user)
  const dispatch = useDispatch();
  const [article, setArticle] = useState(null);

  const getArticleData = async () => {
    dispatch(statusActions.search());
    const { article } = await getArticleBySlug(slug);
    if (user.username !== article.author.username) {
      navigate("/")
    }
    setArticle(article);
    dispatch(statusActions.ok());
  };

  const onFinish = async (values) => {
    const newValues = convertObjectToList(values);
    try {
      dispatch(statusActions.search());
      const { article } = await updateArticle(slug, newValues);
      dispatch(statusActions.ok());
      navigate(`/articles/${article.slug}`);
    } catch {
      dispatch(statusActions.error());
    }
  };

  useEffect(() => {
    getArticleData();
  }, []);

  const render = () => {
    if (article === null) {
      return null;
    } else {
      return (
        <ArticleForm
          onFinish={onFinish}
          title={article.title}
          description={article.description}
          tagList={article.tagList}
          body={article.body}
        />
      );
    }
  };

  return <Card className={classes.main}>{render()}</Card>;
};

export default EditArticle;
