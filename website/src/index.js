import React from 'react'
import ReactDOM from 'react-dom'
import IndexPage from './IndexPage'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(<IndexPage />, document.getElementById('root'))

serviceWorker.unregister()
