import React from 'react'
import ReactDOM from 'react-dom'
import store from './store'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App store={store} />
    </Provider>,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)