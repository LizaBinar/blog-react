import classes from "./edit-article.module.css"
import ArticleForm from "../../../components/articles-components/new-article-content/article-form";
import Card from "../../../components/UI/card/card";
import {useEffect, useState} from "react";
import {getArticleBySlug, updateArticle} from "../../../api/articles";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {statusActions} from "../../../reducers/status-reducer";
import {convertObjectToList} from "../../../components/UI/tag-form-field/tag-form-field";
import useAuthenticationProtect from "../../../hooks/use-authentication-protect";

const EditArticle = () => {
    useAuthenticationProtect()
    const navigate = useNavigate()
    const {slug} = useParams();
    const dispatch = useDispatch();
    const [article, setArticle] = useState(null)

    const getArticleData = async () => {
        dispatch(statusActions.search())
        const { article } = await getArticleBySlug(slug)
        setArticle(article)
        dispatch(statusActions.ok())
    }

    const onFinish = async (values) => {
        console.log(values)
        const newValues = convertObjectToList(values)
        try {
            dispatch(statusActions.search())
            const data = await updateArticle(slug, newValues)
            dispatch(statusActions.ok())
            console.log(data)
            navigate("/")
        } catch {
            dispatch(statusActions.error())
        }
    }

    useEffect(() => {
        getArticleData()
    }, [])

    const render = () => {
        if (article === null) {
            return null
        } else {
            return <ArticleForm onFinish={onFinish} title={article.title} description={article.description} tagList={article.tagList} body={article.body}/>
        }
    }

    return (
        <Card className={classes.main}>
            {render()}
        </Card>
    );
};

export default EditArticle;
