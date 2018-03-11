import React from 'react'
import SingleBlog from './components/SingleBlog'
import Blogs from './components/blogs'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { initBlogs, deleteBlog, newBlog, likeBlog } from './reducers/blogReducer'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import { notify } from './reducers/notificationReducer'
import { initUsers } from './reducers/userReducer'
import { connect } from 'react-redux'
import Users from './components/users'
import User from './components/user'
import { Container, Button, Form, Icon } from 'semantic-ui-react'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      username: '',
      password: '',
      title: '',
      author: '',
      url: ''
    }
  }

  componentWillMount() {
    this.props.initUsers()
    this.props.initBlogs()
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }

  notify = (message, type = 'info') => {
    this.props.notify(message, 3, type)
  }

  like = (id) => async () => {
    const liked = this.props.blogs.find(b => b._id === id)
    const updated = { ...liked, likes: liked.likes + 1 }
    this.props.likeBlog(id, updated)
    this.notify(`you liked '${updated.title}' by ${updated.author}`)
  }

  remove = (id) => async () => {
    const deleted = this.props.blogs.find(b => b._id === id)
    const ok = window.confirm(`remove blog '${deleted.title}' by ${deleted.author}?`)
    if (ok === false) {
      return
    }

    this.notify(`blog '${deleted.title}' by ${deleted.author} removed`)
    this.props.deleteBlog(id)
  }

  addBlog = async (event) => {
    event.preventDefault()
    const blog = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url,
      comments: []
    }

    this.props.newBlog(blog)
    this.notify(`blog '${blog.title}' by ${blog.author} added`)
  }

  logout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    this.notify('logged out')
    this.setState({ user: null })
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.notify('welcome back!')
      this.setState({ username: '', password: '', user })
    } catch (exception) {
      this.notify('käyttäjätunnus tai salasana virheellinen', 'error')
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  handleLoginChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    if (this.state.user === null) {
      return (
        <Container>
          <Notification />
          <h2>Kirjaudu sovellukseen</h2>
          <Form onSubmit={this.login}>
            <div>
              <label>käyttäjätunnus</label>
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleLoginChange}
              />
            </div>
            <div>
              <label>salasana</label>
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleLoginChange}
              />
            </div>
            <br />
            <Button type="submit"><Icon name="key" />kirjaudu</Button>
          </Form>
        </Container>
      )
    }

    const linkStyle = {
      background: 'green',
      border: 'solid 5px black',
      borderRadius: '20px 50px',
      padding: '10px',
      color: 'red',
      fontSize: '24px',
      textShadow: '2px 2px black'
    }

    return (
      <Container>
        <Notification />
        <Router>
          <div>
            <div style={linkStyle}>
            &nbsp;&nbsp;&nbsp;<NavLink to="/users" activeStyle={{ fontWeight: 'bold', background: 'darkgreen' }}>users</NavLink> &nbsp;&nbsp;&nbsp;
              <NavLink to="/blogs" activeStyle={{ fontWeight: 'bold', background: 'darkgreen' }}>blogs</NavLink> &nbsp;&nbsp;&nbsp;
              {this.state.user.name} logged in &nbsp;&nbsp;&nbsp; <Button inverted color='black' onClick={this.logout}><Icon name="sign out" color="white" />logout</Button>
            </div>

            <Route exact path="/" render={() => <div><Blogs like={this.like} remove={this.remove} username={this.state.username} /><Togglable buttonLabel='uusi blogi'><BlogForm handleChange={this.handleLoginChange} title={this.state.title} author={this.state.author} url={this.state.url} handleSubmit={this.addBlog} /></Togglable></div>} />
            <Route exact path="/blogs" render={({ history }) => <div><Blogs history={history} like={this.like} remove={this.remove} username={this.state.username} /><Togglable buttonLabel='uusi blogi'><BlogForm handleChange={this.handleLoginChange} title={this.state.title} author={this.state.author} url={this.state.url} handleSubmit={this.addBlog} /></Togglable></div>} />
            <Route exact path="/users" render={({ history }) => <Users history={history} />} />
            <Route path="/users/:id" render={({ match }) =>
              <User id={match.params.id} />}
            />
            <Route path="/blogs/:id" render={({ match }) =>
              <SingleBlog blog={this.props.blogs.find(b => b._id === match.params.id)}
                like={this.like(match.params.id)} />}
            />
          </div>
        </Router>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    blogs: state.blogs
  }
}


export default connect(mapStateToProps, { notify, initUsers, initBlogs, deleteBlog, newBlog, likeBlog })(App)