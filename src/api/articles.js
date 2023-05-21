import { get, post } from './api';
const PAGE_SIZE = 5

export const getArticles = async (page) => {
    page = page - 1
    const offset = PAGE_SIZE * page
    const res = await get(`articles?limit=${PAGE_SIZE}&offset=${offset}`);
    return {
        articlesCount: res.data.articlesCount,
        articles: res.data.articles,
    }
};

export const getArticleBySlug = async (slug) => {
    const res = await get(`articles/${slug}`);
    return {
        article: res.data.article
    }
};

export const createArticle = (data) => {
    return post('articles', data);
};
