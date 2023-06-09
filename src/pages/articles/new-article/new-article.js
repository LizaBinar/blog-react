import Card from "../../../components/UI/card/card";
import useAuthenticationProtect from "../../../hooks/use-authentication-protect";
import classes from "./new-article.module.css";
import ArticleForm from "../../../components/articles-components/article-form/article-form";
import { createArticle } from "../../../api/articles";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { statusActions } from "../../../reducers/status-reducer";
import { convertObjectToList } from "../../../components/UI/tag-form/tag-form";

const NewArticle = () => {
  useAuthenticationProtect();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const article = convertObjectToList(values);

    const data = {
      article: article,
    };
    try {
      dispatch(statusActions.search());
      const { article } = await createArticle(data);
      dispatch(statusActions.ok());
      navigate(`/articles/${article.slug}`);
    } catch {
      dispatch(statusActions.error());
    }
  };

  return (
    <Card className={classes.main}>
      <ArticleForm onFinish={onFinish} />
    </Card>
  );
};

export default NewArticle;
