import React from 'react'
import IndexPage from '../src/IndexPage'
import * as serviceWorker from '../src/serviceWorker'

serviceWorker.unregister()

export default () => <IndexPage />
