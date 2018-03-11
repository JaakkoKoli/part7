import React from 'react'
import { connect } from 'react-redux'
import { comment } from '../reducers/blogReducer'
import { Button, Icon, Form } from 'semantic-ui-react'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      comment: ''
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.comment(this.props.blog, this.state.comment)
    this.setState({ comment: '' })
  }

  render() {
    const { blog, like } = this.props

    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    if (blog !== undefined) {
      if (typeof blog.user === typeof '') {
        blog.user = this.props.users.find(u => u._id === blog.user)
      }

      const adder = blog.user ? blog.user.name : 'anonymous'

      return (
        <div style={blogStyle}>
          {blog.author}
          <div>
            <a href={blog.url}>{blog.url}</a>
          </div>
          <div>
            {blog.likes} likes <Button onClick={like} color="black"><Icon name="thumbs up" color="white" />like</Button>
          </div>
          <div>
            added by {adder}
          </div>
          <br/>
          <b>comments</b><br />
          <ul>
            {blog.comments.map((c, index) => <li key={index}>{c}</li>)}
          </ul>
          <Form onSubmit={this.handleSubmit}>
            <div>
              <label><b>New comment</b></label>
              <input name='comment' value={this.state.comment} onChange={this.handleChange} autoComplete="off" />
            </div>
            <Button type="submit" color="black"><Icon name="send" color="white" />comment</Button>
          </Form>
        </div>
      )
    } else {
      return (<div></div>)
    }
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    blogs: state.blogs
  }
}


export default connect(mapStateToProps, { comment })(Blog)