import React from 'react'
import { connect } from 'react-redux'
import { Button, Icon } from 'semantic-ui-react'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: props.visible
    }
  }
  render() {
    const { blog, like, deletable, remove } = this.props

    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    const contentStyle = {
      display: this.state.visible ? '' : 'none',
      margin: 5,
    }

    if (typeof blog.user === typeof '') {
      blog.user = this.props.users.find(u => u._id === blog.user)
    }

    const adder = blog.user ? blog.user.name : 'anonymous'

    return (
      <div style={blogStyle}>
        <div
          onClick={() => this.setState({ visible: !this.state.visible })}
          className='name'
        >
          <a onClick={() => this.props.history.push('/blogs/' + blog._id)}>{blog.title} {blog.author}</a>
        </div>
        <div style={contentStyle} className='content'>
          <div>
            <a href={blog.url}>{blog.url}</a>
          </div>
          <div>
            {blog.likes} likes <Button color="black" onClick={like}><Icon name="thumbs up" color="white" /> like</Button>
          </div>
          <div>
            added by {adder}
          </div>
          {deletable && <div><Button onClick={remove}>delete</Button></div>}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    blogs: state.blogs
  }
}


export default connect(mapStateToProps)(Blog)