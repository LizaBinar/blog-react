import classes from "./article-list.module.css"
import ArticleCard from "../../../components/articles-components/article-card/article-card";
import MyPagination from "../../../components/UI/my-pagination/my-pagination";
import {getArticles} from "../../../api/articles";
import {useEffect, useState} from "react";
import SearchStatus from "../../../components/search-status/search-status";
import {Link} from "react-router-dom";

const generateArticles = (articles) => {
    return articles.map(article => {
        const {slug, title, author, description, tagList, favoritesCount, createdAt} = article
        return (
            <Link
                className={classes.link}
                to={`articles/${slug}`}
                key={slug}
            >
                <ArticleCard
                    slug={slug}
                    title={title}
                    author={author}
                    description={description}
                    tagList={tagList}
                    favoritesCount={favoritesCount}
                    createdAt={createdAt}
                />
            </Link>
        )
    })
}

const ArticleList = () => {
    const [articles, setArticles] = useState([])
    const [articlesCount, setArticlesCount] = useState(0)
    const [current, setCurrent] = useState(1)
    const [status, setStatus] = useState("search") // "error" "ok"

    const fetchArticles = async (page) => {
        try {
            const res = await getArticles(page)
            setArticlesCount(res.articlesCount)
            setArticles(res.articles)
            setStatus("ok")
        } catch {
            setStatus("error")
        }
    }

    const pagination = (num) => {
        setStatus("search")
        setCurrent(num)
        fetchArticles(num)
    }

    useEffect(() => {
        fetchArticles(1)
    }, [])

    return (
        <>
            <div className={classes.articleList}>
                {generateArticles(articles)}
                <MyPagination paginationCount={articlesCount} onChange={pagination} current={current}/>
            </div>
            <SearchStatus status={status}/>
        </>
    )
}

export default ArticleList
