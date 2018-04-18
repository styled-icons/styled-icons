import * as React from 'react'

import {IconDemoContainer, IconCode, IconName, IconsContainer} from '../styled'

class IconDemo extends React.Component {
  mounted = false
  state = {copied: false}

  componentDidMount() {
    this.mounted = true
  }

  componentWillUnmount() {
    this.mounted = false
  }

  get iconImport() {
    return `styled-icons/${this.props.pack}/${this.props.name}`
  }

  copy = () => {
    copy(this.iconImport)
    this.setState({copied: true})

    setTimeout(() => {
      if (this.mounted) {
        this.setState({copied: false})
      }
    }, 2000)
  }

  render() {
    const {Icon, name} = this.props
    return (
      <IconDemoContainer onClick={() => this.copy()}>
        <div>
          <Icon size="48" />
        </div>
        <IconName>{name}</IconName>
        <IconCode>{this.state.copied ? 'Copied!' : this.iconImport}</IconCode>
      </IconDemoContainer>
    )
  }
}

export class IconsScroller extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      icons: nextProps.icons,
    }
  }

  render() {
    const icons = this.state.icons

    return (
      <IconsContainer>
        {icons.map(({importPath, icon, name, pack}) => (
          <IconDemo Icon={icon} name={name} pack={pack} key={importPath} />
        ))}
      </IconsContainer>
    )
  }
}
