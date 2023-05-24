import Card from "../../../components/UI/card/card";
import useAuthenticationProtect from "../../../hooks/use-authentication-protect";
import classes from "./new-article.module.css"
import ArticleForm from "../../../components/articles-components/new-article-content/article-form";
import {createArticle} from "../../../api/articles";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {statusActions} from "../../../reducers/status-reducer";
import {convertObjectToList} from "../../../components/UI/tag-form-field/tag-form-field";

const NewArticle = () => {
    useAuthenticationProtect();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        const article = convertObjectToList(values);

        const data = {
            "article": article
        }
        try {
            dispatch(statusActions.search())
            const res = await createArticle(data)
            dispatch(statusActions.ok())
            navigate(`/articles/${res.article.slug}`)
        } catch {
            dispatch(statusActions.error())
        }
    }



    return (
        <Card className={classes.main}>
            <ArticleForm onFinish={onFinish}/>
        </Card>
    );
};

export default NewArticle;
