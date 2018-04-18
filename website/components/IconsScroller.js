import * as React from 'react'
import copy from 'copy-to-clipboard'

window.React = React

class IconDemo extends React.PureComponent {
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
      <div className="IconDemoContainer" onClick={() => this.copy()}>
        <div>
          <Icon size="48" />
        </div>
        <strong className="IconName">{name}</strong>
        <code className="IconCode">{this.state.copied ? 'Copied!' : this.iconImport}</code>
      </div>
    )
  }
}

export class IconsScroller extends React.PureComponent {
  state = {
    search: '',
  }

  updateSearch = event => {
    const search = event.target.value
    this.setState({search})
  }

  render() {
    const icons = this.state.icons

    const filteredIcons = this.state.search
      ? this.props.search.search(this.state.search)
      : this.props.icons

    return (
      <React.Fragment>
        <input className="SearchBox" type="text" onChange={this.updateSearch} />

        <div className="IconsContainer">
          {filteredIcons.map(({importPath, icon, name, pack}) => (
            <IconDemo Icon={icon} name={name} pack={pack} key={importPath} />
          ))}
        </div>
      </React.Fragment>
    )
  }
}
