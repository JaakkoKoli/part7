import userService from '../services/users'

const reducer = (store = [], action) => {
  if (action.type === 'INITU') {
    return action.data
  } else if (action.type === 'RESET') {
    return []
  }
  return store
}

export const initUsers = () => {
  return async (dispatch) => {
    const response = await userService.getAll()
    dispatch({
      type: 'INITU',
      data: response
    })
  }
}

export default reducer