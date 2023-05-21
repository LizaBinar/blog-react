import {useParams} from "react-router-dom";
import classes from "./article.module.css"
import {HeartOutlined} from "@ant-design/icons";
import {Typography} from "antd";
import {getArticleBySlug, getArticles} from "../../../api/articles";
import {useEffect, useState} from "react";
import SearchStatus from "../../../components/search-status/search-status";
import ArticleHeader from "../../../components/articles-components/articles-header/article-header";
import ReactMarkdown from "react-markdown";
import UserCard from "../../../components/user-card/user-card";
import ArticleCard from "../../../components/articles-components/article-card/article-card";

const {Paragraph} = Typography;

const Article = () => {
    const {slug} = useParams();
    const [article, setArticle] = useState(null)
    const [status, setStatus] = useState("search") // "error" "ok"


    const fetchArticle = async () => {
        try {
            console.log(slug)
            const res = await getArticleBySlug(slug)
            setArticle(res.article)
            setStatus("ok")
        } catch {
            setStatus("error")
        }
    }

    useEffect(() => {
        fetchArticle()
    }, [])


    let content = <></>
    if (article !== null) {
        console.log(article)
        const { title, author, description, body, tagList, favoritesCount, createdAt } = article

        content = <ArticleCard
                    title={title}
                    body={body}
                    author={author}
                    description={description}
                    tagList={tagList}
                    favoritesCount={favoritesCount}
                    createdAt={createdAt}
                />
    }
    return (
        <>
            {content}
            <SearchStatus status={status}/>
        </>
    )
}

export default Article
