import React from 'react'
import { connect } from 'react-redux'
import Blog from './Blog'

const Blogs = (props) => {
  const byLikes = (b1, b2) => b2.likes - b1.likes
  const blogsInOrder = props.blogs.filter(b => b !== undefined).sort(byLikes)
  return (
    <div>
      <h2>Blogs</h2>
      {blogsInOrder.map(blog =>
        <Blog
          key={blog._id}
          history={props.history}
          blog={blog}
          like={props.like(blog._id)}
          remove={props.remove(blog._id)}
          deletable={blog.user === undefined || blog.user.username === props.username}
        />
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    blogs: state.blogs
  }
}


export default connect(mapStateToProps)(Blogs);