import * as React from 'react'

export class Badges extends React.Component {
  state = {
    loaded: false,
  }

  onload = () => {
    this.setState({loaded: true})
  }

  componentDidMount() {
    window.addEventListener('load', this.onload)
  }

  componentWillUnmount() {
    window.removeEventListener('load', this.onload)
  }

  render() {
    if (!this.state.loaded) {
      return <div className="badges" />
    }

    return (
      <div className="badges">
        <a href="https://travis-ci.org/jacobwgillespie/styled-icons">
          <img
            alt="Build Status"
            src="https://img.shields.io/travis/jacobwgillespie/styled-icons/master.svg"
          />
        </a>
        <a href="https://www.npmjs.com/package/styled-icons">
          <img alt="npm" src="https://img.shields.io/npm/dm/styled-icons.svg" />
        </a>
        <a href="https://www.npmjs.com/package/styled-icons">
          <img alt="npm" src="https://img.shields.io/npm/v/styled-icons.svg" />
        </a>
        <img
          alt="Built with Styled Components"
          src="https://img.shields.io/badge/built%20with-styled%20components-db7093.svg"
        />
        <img
          alt="Powered by TypeScript"
          src="https://img.shields.io/badge/powered%20by-typescript-blue.svg"
        />
      </div>
    )
  }
}
