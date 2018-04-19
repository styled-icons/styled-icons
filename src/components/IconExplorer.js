import * as React from 'react'

import {IconCard} from './IconCard'

export class IconExplorer extends React.PureComponent {
  state = {
    search: '',
  }

  updateSearch = event => {
    const search = event.target.value

    if (search.length === 0 || search.length > 2) {
      this.setState({search})
    }
  }

  render() {
    const filteredIcons = this.state.search
      ? this.props.search.search(this.state.search)
      : this.props.icons

    return (
      <div>
        <input
          className="search-box"
          type="text"
          onChange={this.updateSearch}
          placeholder="search icons"
        />

        <div className="icons-container">
          {filteredIcons.map(({importPath, icon, name, pack}) => (
            <IconCard Icon={icon} name={name} pack={pack} key={importPath} />
          ))}
        </div>
      </div>
    )
  }
}
