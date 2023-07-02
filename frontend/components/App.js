import React, { useState } from 'react'
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom'
import Articles from './Articles'
import LoginForm from './LoginForm'
import Message from './Message'
import ArticleForm from './ArticleForm'
import Spinner from './Spinner'
import axios from 'axios'
import { useEffect } from 'react'
import  axiosWithAuth  from '../axios'


export default function App() {
  // ✨ MVP can be achieved with these states
  const [message, setMessage] = useState('')
  const [articles, setArticles] = useState([])
  const [currentArticleId, setCurrentArticleId] = useState()
  const [spinnerOn, setSpinnerOn] = useState(false)


  // ✨ Research `useNavigate` in React Router v.6
  const navigate = useNavigate()
  const redirectToLogin = () => {
    const token = localStorage.getItem('token');
      if (!token) {
      navigate('/');
    }
  }

  const redirectToArticles = () => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/articles');
    }
  };

  useEffect(() => {

  }, [])

  const logout = () => {
    const token = localStorage.getItem('token');
    localStorage.removeItem('token');
    setMessage('Goodbye!');
    //redirectToLogin();
    // ✨ implement
    // If a token is in local storage it should be removed,
    // and a message saying "Goodbye!" should be set in its proper state.
    // In any case, we should redirect the browser back to the login screen,
    // using the helper above.
  }

  const login = (credentials) => {
    setSpinnerOn(true);
    setMessage("");
    axios.post('http://localhost:9000/api/login', credentials).then(res => {
      //console.log(res)
      localStorage.setItem('token', res.data.token);
      setMessage(res.data.message);
      navigate("/articles");
      setSpinnerOn(false);
    }).catch(err => console.error(err));
  }

  const getArticles = () => {
    setSpinnerOn(true);
    setMessage("");
    axiosWithAuth()
    .get('/articles')
    .then(res => {
      setMessage(res.data.message);
      setArticles(res.data.articles);
    })
    .catch(err => console.error(err))
    .finally(setSpinnerOn(false))
    // ✨ implement
    // We should flush the message state, turn on the spinner
    // and launch an authenticated request to the proper endpoint.
    // On success, we should set the articles in their proper state and
    // put the server success message in its proper state.
    // If something goes wrong, check the status of the response:
    // if it's a 401 the token might have gone bad, and we should redirect to login.
    // Don't forget to turn off the spinner!
  }

  //getArticles();

  const postArticle = article => {
    // ✨ implement
    // The flow is very similar to the `getArticles` function.
    // You'll know what to do! Use log statements or breakpoints
    // to inspect the response from the server.
  }

  const updateArticle = ({ article_id, article }) => {
    // ✨ implement
    // You got this!
  }

  const deleteArticle = article_id => {
    // ✨ implement
  }

  return (
    // ✨ fix the JSX: `Spinner`, `Message`, `LoginForm`, `ArticleForm` and `Articles` expect props ❗
    <>
      <Spinner />
      <Message />
      <button id="logout" onClick={logout}>Logout from app</button>
      <div id="wrapper" style={{ opacity: spinnerOn ? "0.25" : "1" }}> {/* <-- do not change this line */}
        <h1>Advanced Web Applications</h1>
        <nav>
          <NavLink id="loginScreen" to="/">Login</NavLink>
          <NavLink id="articlesScreen" to="/articles">Articles</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<LoginForm login={login} />} />
          <Route path="articles" element={
            <>
              <ArticleForm />
              <Articles articles={articles}/>
            </>
          } />
        </Routes>
        <footer>Bloom Institute of Technology 2022</footer>
      </div>
    </>
  )
}
