import * as React from 'react'
import * as ReactDOM from 'react-dom'

// @ts-ignore
import copy from 'copy-to-clipboard'

import {material, octicons, StyledIcon} from '..'

import {GitHubCorner} from './GitHubCorner'
import {
  Header,
  PackHeader,
  CodeExample,
  IconDemoContainer,
  IconCode,
  IconName,
  IconsContainer,
  A,
} from './styled'

interface IconDemoProps {
  Icon: StyledIcon
  name: string
  pack: string
}

interface IconDemoState {
  copied: boolean
}

class IconDemo extends React.Component<IconDemoProps, IconDemoState> {
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

const renderIconPack = (pack: string, icons: {[name: string]: StyledIcon}) =>
  Object.keys(icons).map(icon => <IconDemo Icon={icons[icon]} name={icon} pack={pack} key={icon} />)

const App = () => (
  <>
    <GitHubCorner />
    <Header>Styled Icons 💅</Header>
    <p>
      Import icons from the <A href="https://material.io/icons/">Material</A> or{' '}
      <A href="https://octicons.github.com/">Octicons</A> icon packs as{' '}
      <A href="https://www.styled-components.com/">Styled Components</A>
    </p>

    <CodeExample>$ yarn install styled-icons</CodeExample>
    <CodeExample>
      {`
import {Alarm} from 'styled-icons/material/Alarm'

const App = () => <Alarm />
    `.trim()}
    </CodeExample>

    <p>
      <A href="https://github.com/jacobwgillespie/styled-icons">Usage Information</A>
    </p>
    <PackHeader>Material Icons</PackHeader>
    <IconsContainer>{renderIconPack('material', material)}</IconsContainer>
    <PackHeader>Octicons</PackHeader>
    <IconsContainer>{renderIconPack('octicons', octicons)}</IconsContainer>
  </>
)

ReactDOM.render(<App />, document.getElementById('root'))
