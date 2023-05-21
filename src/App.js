import classes from './App.module.css';


import {Route, Routes} from "react-router-dom";
import React from "react";
import ArticleList from "./pages/articles/article-list/article-list";
import Article from "./pages/articles/article/article";
import Layout from "./components/layout/layout";


const rootLoader = (el) => {
    console.log(el)
    return el.params
}

function App() {
    return (
        <div className={classes.app}>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/" element={<ArticleList/>}/>
                    <Route path="/articles" element={<ArticleList/>}/>
                    <Route path="/articles/:slug" element={<Article/>}/>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
