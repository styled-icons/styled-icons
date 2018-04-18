import * as React from 'react'

import performantEventListener from '../utils/performantEventObserver'

const scrollTo = scrollTop => {
  window.scroll(window.pageXOffset, scrollTop)
}

const calculateScrollPosition = () => ({scrollTop: window.pageYOffset})

// Component monitors the window scroll position and provides it to children
class ScrollPosition extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = Object.assign(
      {
        isScrolling: false,
      },
      calculateScrollPosition(),
    )
  }

  componentDidMount() {
    this.scrollListener.addEventListener(this.handleScroll)

    if (this.props.scrollTop != null) scrollTo(this.props.scrollTop)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.scrollTop && prevProps.scrollTop !== this.props.scrollTop) {
      scrollTo(this.props.scrollTop)
    }
  }

  componentWillUnmount() {
    this.scrollListener.removeAllListeners()
  }

  scrollListener = performantEventListener(
    listener => window.addEventListener('scroll', listener, {passive: true}),
    listener => window.removeEventListener('scroll', listener),
  )

  handleScroll = e => {
    if (this.props.skipEvent && this.props.skipEvent(e)) return

    if (this.isScrollingTimeout) clearTimeout(this.isScrollingTimeout)

    this.isScrollingTimeout = setTimeout(() => {
      this.isScrollingTimeout = null
      this.setState({isScrolling: false})
    }, 150)

    this.setState(
      Object.assign(
        {
          isScrolling: true,
        },
        calculateScrollPosition(),
      ),
    )
  }

  isScrollingTimeout = undefined

  render() {
    const {isScrolling, scrollTop} = this.state

    return scrollTop != null ? this.props.children({scrollTop, isScrolling}) : null
  }
}

export default ScrollPosition
