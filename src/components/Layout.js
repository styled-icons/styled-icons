import React from 'react'
import Helmet from 'react-helmet'
import {StaticQuery, graphql} from 'gatsby'
import {injectGlobal} from 'styled-components'

injectGlobal`
  html {
    height: 100%;
    font-family: 'Avenir Next', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial,
      sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    text-align: center;
    background-size: cover;
    background: linear-gradient(20deg, rgb(219, 112, 147), #daa357);
    background-repeat: no-repeat;
    background-attachment: fixed;
    color: #fff;
    overflow-x: hidden;
  }

  body {
    margin: 0 auto;
    padding: 1em;
    max-width: 1200px;
  }

  * {
    box-sizing: border-box;
  }

  a {
    color: #fff;
  }

  h1 {
    font-weight: 600;
    font-size: 1.7rem;
  }

  h2 {
    font-weight: 500;
    font-size: 1.4rem;
    margin-top: 4rem;
  }

  code {
    display: block;
    margin: 0 auto;
    white-space: pre;
    padding: 12px;
    text-align: left;
    color: #000;
    overflow-x: scroll;
  }

  code.demo {
    display: inline-block;
    margin-bottom: 12px;
    margin-top: 1em;
    background: rgba(0, 0, 0, 0.2);
  }

  .icon-card-wrapper {
    padding: 6px;
  }

  .icon-card {
    background: rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    padding: 1rem;
    cursor: pointer;
    color: #000;
    transition: transform 0.5s ease-out;
    will-change: transform;
    width: 100%;
    height: 100%;
  }

  .icon-card:hover {
    transform: scale(1.05);
  }

  .icon-card .name {
    font-weight: 500;
    overflow-x: scroll;
    width: 100%;
  }

  .icon-card code {
    width: 100%;
    text-align: center;
    padding: 0;
  }

  .icon-card ::-webkit-scrollbar {
    display: none;
  }

  .badges {
    padding: 0;
    min-height: 26px;
  }

  .badges > * {
    margin-right: 6px;
  }

  .badges > *:last-child {
    margin-right: 0;
  }

  .search-box {
    background: rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 4px;
    margin-bottom: 1.5em;
    padding: 12px;
    width: 100%;
    max-width: 400px;
    color: #000;
    font-weight: 300;
    outline: none;
    text-align: center;
    font-size: 1.2rem;
  }

  ::placeholder {
    color: rgba(0, 0, 0, 0.5);
  }

  @keyframes octocat-wave {
    0%,
    100% {
      transform: rotate(0);
    }
    20%,
    60% {
      transform: rotate(-25deg);
    }
    40%,
    80% {
      transform: rotate(10deg);
    }
  }

  .github-corner svg {
    fill: #151513;
    color: #fff;
    position: absolute;
    top: 0;
    border: 0;
    right: 0;
  }

  .github-corner .octo-arm {
    transform-origin: 130px 106px;
    will-change: transform;
  }

  .github-corner:hover .octo-arm {
    animation: octocat-wave 560ms ease-in-out;
  }

  .ReactVirtualized__Grid {
    outline: none;
  }

  @media (max-width: 500px) {
    .github-corner:hover .octo-arm {
      animation: none;
    }
    .github-corner .octo-arm {
      animation: octocat-wave 560ms ease-in-out;
    }
  }
`

const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`

const Layout = ({children}) => (
  <StaticQuery
    query={query}
    render={data => (
      <div>
        <a
          href="https://github.com/jacobwgillespie/styled-icons"
          className="github-corner"
          aria-label="View source on Github"
        >
          <svg width="80" height="80" viewBox="0 0 250 250" aria-hidden="true">
            <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z" />
            <path
              d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
              fill="currentColor"
              className="octo-arm"
            />
            <path
              d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
              fill="currentColor"
              className="octo-body"
            />
          </svg>
        </a>
        <Helmet title={data.site.siteMetadata.title}>
          <html lang="en" />
        </Helmet>
        {children}
      </div>
    )}
  />
)

export default Layout
