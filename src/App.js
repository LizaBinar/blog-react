import classes from "./App.module.css";

import { Route, Routes } from "react-router-dom";
import ArticleList from "./pages/articles/article-list/article-list";
import Article from "./pages/articles/article/article";
import Layout from "./components/layout/layout";
import SignUp from "./pages/authentication/sign-up/sign-up";
import SignIn from "./pages/authentication/sign-in/sign-in";
import EditUser from "./pages/authentication/edit-user/edit-user";
import EditArticle from "./pages/articles/edit-article/edit-article";
import NewArticle from "./pages/articles/new-article/new-article";

function App() {
  return (
    <div className={classes.app}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<ArticleList />} />
          <Route path="/:paginate" element={<ArticleList />} />
          <Route path="/articles" element={<ArticleList />} />
          <Route path="/new-article" element={<NewArticle />} />
          <Route path="/articles/:slug" element={<Article />} />
          <Route path="/articles/:slug/edit" element={<EditArticle />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/profile" element={<EditUser />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
