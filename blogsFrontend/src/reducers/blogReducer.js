import blogService from '../services/blogs'

const reducer = (store = [], action) => {
  if (action.type === 'INITB') {
    return action.data
  } else if (action.type === 'NEW') {
    return store.filter(b => b !== undefined).concat(action.data)
  } else if (action.type === 'DELETE') {
    return store.filter(b => b !== undefined).filter(b => b._id !== action.id)
  }else if (action.type === 'LIKE') {
    return store.filter(b => b !== undefined).filter(b => b._id !== action.updated._id).concat(action.updated)
  }
  return store
}


export const initBlogs = () => {
  return async (dispatch) => {
    const response = await blogService.getAll()
    dispatch({
      type: 'INITB',
      data: response
    })
  }
}

export const newBlog = (blog) => {
  return async (dispatch) => {
    const response = await blogService.create(blog)
    dispatch({
      type: 'NEW',
      data: response
    })
  }
}

export const comment = (blog, comment) => {
  return async (dispatch) => {
    blog.comments=blog.comments.concat(comment)
    const response = await blogService.update(blog._id, blog)
    dispatch({
      type: 'LIKE',
      updated: response
    })
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch({
      type: 'DELETE',
      id: id
    })
  }
}

export const likeBlog = (id, updated) => {
  return async (dispatch) => {
    await blogService.update(id, updated)
    dispatch({
      type: 'LIKE',
      updated
    })
  }
}

export default reducer