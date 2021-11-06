import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Success from './components/Success';
import ErrorMessage from './components/ErrorMessage'
import BlogFrom from './components/CreateBlog'
import LoginForm from './components/Login'
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null)
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [blogVisible, setBlogVisible] = useState(false)
  const [loginVisible, setLoginVisible] = useState(false)

  //creating logout button function
  const logout = (event) => {
    setUser(null);
    window.localStorage.removeItem("loggedBlogAppUser");
  };
  // creating handle login button function
  const handlelogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      setUser(user);
      blogService.setToken(user.token);
      setUsername("");
      setPassword("");
      
    } catch (exception) {
      setErrorMessage('wrong username or password');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      
    }
  };

  //creating add blog button function
  const addBlog = async (event) =>{
    event.preventDefault();
    const newObj ={
      title: title,
      author: author,
      url:url
    }
    const blogNew = await blogService.create(newObj)
    
    setSuccessMessage(`a new blog ${title} by ${author} is added`)
    setTimeout(()=>{
      setSuccessMessage(null)
    },5000)
    console.log(successMessage)
    setBlogs(blogs.concat(blogNew))
  
    
    setTitle('')
    setAuthor('')
    setUrl('')

  }
const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handlelogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }
  
 

  const toggleVisibility = () => {
    setBlogVisible(false)
    setSuccessMessage(null)

  }

  const blogForm =()=>{
    const hideWhenVisible = {display: blogVisible ? 'none' : ''}
    const showWhenVisible = {display: blogVisible ? '' : 'none'}
    return(
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setBlogVisible(true)}>Add Blog</button>
        </div>
        <div style={showWhenVisible}>
        <BlogFrom 
        addBlog = {addBlog}
        title = {title}
        author = {author}
        url = {url}
        handleTitleChange = {({ target })=> setTitle(target.value)}
        handleAuthorChange = {({ target })=> setAuthor(target.value)}
        handleUrlChange= {({ target })=> setUrl(target.value)}
        toggleVisibility={toggleVisibility}
        />
        <button onClick={toggleVisibility}>cancel</button>
        </div>
      </div>
    )
  }

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  if (user === null) {
    return (
      <div>
        <h2>Log in to the application</h2>
        <ErrorMessage message={errorMessage} />
        {loginForm()}
      </div>
    );
  }
  return (
    <div>
      <h2>blogs</h2>
      <Success message={successMessage} />
        {user.name} is logged in <button onClick={logout}> logout</button>
        {blogForm()}
      
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;