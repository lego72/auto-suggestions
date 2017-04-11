import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import configureStore from './store/configureStore'

const store = configureStore()
document.body.appendChild(document.createElement('div')).setAttribute('id', 'root')
document.body.style.margin = 0

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)