import * as React from 'react'

import performantEventListener from '../utils/performantEventObserver'

const calculateWindowSize = () => {
  const {innerWidth, innerHeight, outerWidth, outerHeight} = window

  return {
    innerWidth,
    innerHeight,
    outerWidth,
    outerHeight,
  }
}

// Component monitors the window size and provides it to children
class WindowSize extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = calculateWindowSize()
  }

  componentDidMount() {
    this.resizeListener.addEventListener(this.handleResize)
  }

  componentWillUnmount() {
    this.resizeListener.removeAllListeners()
  }

  resizeListener = performantEventListener(
    listener => window.addEventListener('resize', listener, {passive: true}),
    listener => window.removeEventListener('resize', listener),
  )

  handleResize = e => {
    if (this.props.skipEvent && this.props.skipEvent(e)) return

    this.setState(calculateWindowSize())
  }

  render() {
    const {innerWidth, innerHeight, outerWidth, outerHeight} = this.state

    return innerHeight != null && innerWidth != null && outerWidth != null && outerHeight != null
      ? this.props.children({
          innerWidth,
          innerHeight,
          outerWidth,
          outerHeight,
        })
      : null
  }
}

export default WindowSize
