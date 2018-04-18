import * as React from 'react'

import {IconCard} from './IconCard'

export class IconExplorer extends React.PureComponent {
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
      <div>
        <input className="search-box" type="text" onChange={this.updateSearch} />

        <div className="icons-container">
          {filteredIcons.map(({importPath, icon, name, pack}) => (
            <IconCard Icon={icon} name={name} pack={pack} key={importPath} />
          ))}
        </div>
      </div>
    )
  }
}
