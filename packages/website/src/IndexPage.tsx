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
        Import icons from the following icon packs as <a href="https://www.styled-components.com/">Styled Components</a>
        :
      </p>

      <p>
        <ul>
          <li>
            <a href="https://boxicons.com/">Boxicons</a>
          </li>
          <li>
            <a href="http://cryptoicons.co">Crypto Icons</a>
          </li>
          <li>
            <a href="http://www.entypo.com/">Entypo</a>
          </li>
          <li>
            <a href="https://evil-icons.io">Evil Icons</a>
          </li>
          <li>
            <a href="https://feathericons.com/">Feather</a>
          </li>
          <li>
            <a href="https://fontawesome.com/">Font Awesome</a>
          </li>
          <li>
            <a href="https://zurb.com/playground/foundation-icon-fonts-3">Foundation</a>
          </li>
          <li>
            <a href="https://github.com/refactoringui/heroicons">Heroicons</a>
          </li>
          <li>
            <a href="https://icomoon.io">Icomoon</a>
          </li>
          <li>
            <a href="https://material.io/icons/">Material Design</a>
          </li>
          <li>
            <a href="https://octicons.github.com/">Octicons</a>
          </li>
          <li>
            <a href="https://www.npmjs.com/package/open-iconic">Open Iconic</a>
          </li>
          <li>
            <a href="https://www.s-ings.com/typicons/">Typicons</a>
          </li>
          <li>
            <a href="https://www.zondicons.com/">Zondicons</a>
          </li>
        </ul>
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
