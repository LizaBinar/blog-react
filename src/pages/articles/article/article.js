import { useParams } from "react-router-dom";
import { getArticleBySlug } from "../../../api/articles";
import { useEffect, useState } from "react";
import ArticleCard from "../../../components/articles-components/article-card/article-card";
import { useDispatch } from "react-redux";
import { statusActions } from "../../../reducers/status-reducer";

const Article = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const [article, setArticle] = useState(null);

  const fetchArticle = async () => {
    try {
      const res = await getArticleBySlug(slug);
      setArticle(res.article);
      dispatch(statusActions.ok());
    } catch {
      dispatch(statusActions.error());
    }
  };

  useEffect(() => {
    fetchArticle();
    dispatch(statusActions.search());
  }, []);

  let content = <></>;
  if (article !== null) {
    const {
      title,
      author,
      description,
      body,
      tagList,
      favoritesCount,
      createdAt,
      favorited,
    } = article;

    content = (
      <ArticleCard
        slug={slug}
        title={title}
        body={body}
        author={author}
        description={description}
        tagList={tagList}
        favoritesCount={favoritesCount}
        createdAt={createdAt}
        favorited={favorited}
      />
    );
  }
  return <>{content}</>;
};

export default Article;
