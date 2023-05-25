import classes from "./article-list.module.css";
import ArticleCard from "../../../components/articles-components/article-card/article-card";
import MyPagination from "../../../components/UI/my-pagination/my-pagination";
import { getArticles } from "../../../api/articles";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { statusActions } from "../../../reducers/status-reducer";

const generateArticles = (articles) => {
  return articles.map((article) => {
    const {
      slug,
      title,
      author,
      description,
      tagList,
      favoritesCount,
      createdAt,
      favorited,
    } = article;
    return (
      <div className={classes.block} key={slug}>
        <ArticleCard
          slug={slug}
          title={title}
          author={author}
          description={description}
          tagList={tagList}
          favoritesCount={favoritesCount}
          createdAt={createdAt}
          favorited={favorited}
        />
      </div>
    );
  });
};

const ArticleList = () => {
  const dispatch = useDispatch();
  const [articles, setArticles] = useState([]);
  const [articlesCount, setArticlesCount] = useState(0);
  const [current, setCurrent] = useState(1);

  const fetchArticles = async (page) => {
    try {
      dispatch(statusActions.search());
      const res = await getArticles(page);
      setArticlesCount(res.articlesCount);
      setArticles(res.articles);
      dispatch(statusActions.ok());
    } catch {
      dispatch(statusActions.error());
    }
  };

  const pagination = (num) => {
    setCurrent(num);
    fetchArticles(num);
  };

  useEffect(() => {
    fetchArticles(1);
  }, []);

  return (
    <>
      <div className={classes.articleList}>
        {generateArticles(articles)}
        <MyPagination
          paginationCount={articlesCount}
          onChange={pagination}
          current={current}
        />
      </div>
    </>
  );
};

export default ArticleList;
