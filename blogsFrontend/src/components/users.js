import React from 'react'
import { connect } from 'react-redux'

const Users = (props) => {
  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr><td></td><td><b>blogs added</b></td></tr>
          {props.users.map(user => <tr key={user._id}><td><a onClick={() => props.history.push('/users/' + user._id)}>{user.name}</a></td><td>{user.blogs.length}</td></tr>)}
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    blogs: state.blogs
  }
}


export default connect(mapStateToProps)(Users)