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
            src="https://img.shields.io/travis/jacobwgillespie/styled-icons.svg"
          />
        </a>
        <a href="https://www.npmjs.com/package/styled-icons">
          <img alt="npm" src="https://img.shields.io/npm/dm/styled-icons.svg" />
        </a>
        <a href="https://www.npmjs.com/package/styled-icons">
          <img alt="npm" src="https://img.shields.io/npm/v/styled-icons.svg" />
        </a>
        <img
          alt="Built with TypeScript"
          src="https://img.shields.io/badge/built%20with-typescript-blue.svg"
        />
      </div>
    )
  }
}
