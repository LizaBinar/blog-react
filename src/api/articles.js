import { get, post } from './api';
import axios from "./axios";
const PAGE_SIZE = 5

export const getArticles = async (page) => {
    page = page - 1
    const offset = PAGE_SIZE * page
    const res = await get(`articles?limit=${PAGE_SIZE}&offset=${offset}`);
    return {
        articlesCount: res.articlesCount,
        articles: res.articles,
    }
};

export const getArticleBySlug = async (slug) => {
    const res = await get(`articles/${slug}`);
    return {
        article: res.article
    }
};

export const createArticle = async (obj) => {
    const data = await post('articles', obj);
    return data
};

export const deleteArticle = async (slug) => {
    try {
        const response = await axios.delete(`/articles/${slug}`);
        console.log(response);
        return response.data
    } catch (error) {
        console.error(error);
    }
}

export const updateArticle = async (slug, articleData) => {
    try {
        const response = await axios.put(`/articles/${slug}`, { article: articleData });
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const addFavoriteArticle = async (slug) => {
    try {
        const response = await axios.post(`/articles/${slug}/favorite`);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const removeFavoriteArticle = async (slug) => {
    try {
        const response = await axios.delete(`/articles/${slug}/favorite`);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
