const reducer = (store = { message: '', type: 'info' }, action) => {
  if (action.type === 'NEW') {
    return { message: action.content, type: action.nType }
  } else if (action.type === 'RESET') {
    return { message: '', type: 'info' }
  }
  return store
}

export const reset = () => {
  return {
    type: 'RESET'
  }
}

export const notify = (content, time, type) => {
  return async (dispatch) => {
    dispatch({
      type: 'NEW',
      content: content,
      nType: type
    })
    window.setTimeout(() => dispatch(reset()), time * 1000)
  }
}

export default reducer