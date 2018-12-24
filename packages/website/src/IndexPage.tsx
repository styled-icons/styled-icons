import React from 'react'
import Head from 'next/head'
import Loadable from 'react-loadable'

import {Badges} from './components/Badges'
import Layout from './components/Layout'

const IconExplorer = Loadable({
  loader: () => import('./components/IconExplorer'),
  loading: () => <div>Loading...</div>,
})

const IndexPage: React.SFC = () => (
  <Layout>
    <Head>
      <title>Styled Icons - a Styled Components icon library</title>
    </Head>
    <div>
      <h1>
        Styled Icons{' '}
        <span role="img" aria-label="icon">
          💅
        </span>
      </h1>
      <Badges />

      <p>
        Import icons from the <a href="https://feathericons.com/">Feather</a>,{' '}
        <a href="https://fontawesome.com/">Font Awesome (free)</a>,{' '}
        <a href="https://icomoon.io">Icomoon (free)</a>,{' '}
        <a href="https://material.io/icons/">Material</a>,{' '}
        <a href="https://octicons.github.com/">Octicons</a>, or{' '}
        <a href="https://boxicons.com/">Boxicons</a> icon packs as{' '}
        <a href="https://www.styled-components.com/">Styled Components</a>
      </p>

      <code className="demo">
        {`
import styled from 'styled-components'
import {Zap} from 'styled-icons/octicons/Zap'

const RedZap = styled(Zap)\`
  color: red;
\`

const App = () => <RedZap />
    `.trim()}
      </code>

      <p>
        <a href="https://github.com/jacobwgillespie/styled-icons">View documentation on GitHub</a>
      </p>

      <h2>Icon Explorer</h2>

      <IconExplorer />
    </div>
  </Layout>
)

export default IndexPage
