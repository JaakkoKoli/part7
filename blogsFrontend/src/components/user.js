import React from 'react'
import { connect } from 'react-redux'

const User = (props) => {
  const user = props.users.find(u => u._id === props.id)
  if (user === undefined) {
    return (<div></div>)
  } else {
    return (
      <div>
        <h1>{user.name}</h1>
        <h2>Added blogs</h2>
        <ul>
          {user.blogs.map(blog => <li key={blog._id}>{blog.name} by {blog.author}</li>)}
        </ul>
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


export default connect(mapStateToProps)(User)