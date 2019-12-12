import * as React from 'react'

interface Props {}

interface State {
  loaded: boolean
}

export class Badges extends React.Component<Props, State> {
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
        <a href="https://github.com/jacobwgillespie/styled-icons/actions">
          <img src="https://github.com/jacobwgillespie/styled-icons/workflows/CI/badge.svg" alt="Build Status" />
        </a>
        <a href="https://www.npmjs.com/package/styled-icons">
          <img src="https://badgen.net/npm/dm/styled-icons" alt="npm" />
        </a>
        <a href="https://www.npmjs.com/package/styled-icons">
          <img src="https://badgen.net/npm/v/styled-icons" alt="npm" />
        </a>
        <a href="https://www.styled-components.com/">
          <img
            src="https://badgen.net/badge/built%20with/styled%20components/db7093"
            alt="Built with Styled Components"
          />
        </a>
        <img src="https://badgen.net/badge/powered%20by/typescript/blue" alt="Powered by TypeScript" />
      </div>
    )
  }
}
