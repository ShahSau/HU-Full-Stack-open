import React, { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import ErrorMessage from './components/ErrorMessage'
import BlogFrom from './components/CreateBlog'
import Togglable from './components/Togglable'
import LoginForm from './components/Login'
import Heading from './components/Heading'
import AllBlogs from './components/AllBlog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  // eslint-disable-next-line no-unused-vars
  const [blogVisible, setBlogVisible] = useState(false)
  const [loginVisible, setLoginVisible] = useState(false)

  //creating logout button function
  // eslint-disable-next-line no-unused-vars
  const logout = (event) => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogAppUser')
  }
  // creating handle login button function
  const handlelogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  //creating add blog button function
  const addBlog = async (event) => {
    event.preventDefault()
    const newObj ={
      title: title,
      author: author,
      url:url
    }
    const blogNew = await blogService.create(newObj)
    setSuccessMessage(`a new blog ${title} by ${author} is added`)
    setTimeout(() => {
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

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  const likeButton = (event) => {
    const id = event.target.value
    const already_blog = blogs.find((name) => name.id === id)
    const new_Obj = { ...already_blog, likes: already_blog.likes + 1 }
    console.log({ already_blog })

    blogService.update(already_blog.id, new_Obj).then((new_data) => {
      setBlogs(
        blogs.map((blog) => (blog.id !== already_blog.id ? blog : new_data))
      )
    })
    console.log(already_blog.likes)
  }

  const deleteButton = (event) => {
    const id = event.target.value
    const delete_blog = blogs.find((name) => name.id === id)
    console.log(`coming from delete blog ${delete_blog.user}`)
    console.log(user.username)
    try {
      if (window.confirm(`Remove blog ${delete_blog.title} by ${delete_blog.author}`)) {
        blogService.deleteBlog(delete_blog.id)
        let blogs2 = blogs.filter( blog => blog.id !== delete_blog.id)
        setBlogs(blogs2)
      }
    }catch (exception) {
      setErrorMessage(`something went wrong while deleting ${delete_blog.title}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }


  if (user === null) {
    return (
      <div>
        <h2>Log in to the application</h2>
        <ErrorMessage message={errorMessage} />
        {loginForm()}
      </div>
    )
  }
  return (
    <div>
      <Heading
        successMessage={successMessage}
        user={user}
        logout={logout}
      />
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogFrom
          addBlog={addBlog}
          title={title}
          author={author}
          url={url}
          handleTitleChange={({ target }) => setTitle(target.value)}
          handleAuthorChange={({ target }) => setAuthor(target.value)}
          handleUrlChange={({ target }) => setUrl(target.value)}
          toggleVisibility={toggleVisibility}
        />
      </Togglable>
      <AllBlogs blogs={blogs} likeButton={likeButton} deleteButton={deleteButton}/>
    </div>
  )
}

export default App