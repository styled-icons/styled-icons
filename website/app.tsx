import * as React from 'react'
import * as ReactDOM from 'react-dom'

// @ts-ignore
import copy from 'copy-to-clipboard'

import {faBrands, faRegular, faSolid, material, octicons, StyledIcon} from '..'

import {GitHubCorner} from './GitHubCorner'
import {
  Header,
  Badges,
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

    <Badges>
      <a href="https://travis-ci.org/jacobwgillespie/styled-icons">
        <img
          alt="Build Status"
          src="https://travis-ci.org/jacobwgillespie/styled-icons.svg?branch=master"
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
    </Badges>

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

    <Header>Icon Packs</Header>

    <p>
      <A href="#fa-brands">Font Awesome (brands)</A> |{' '}
      <A href="#fa-regular">Font Awesome (regular)</A> |{' '}
      <A href="#fa-solid">Font Awesome (solid)</A> | <A href="#material">Material Icons</A> |{' '}
      <A href="#octicons">Octicons</A>
    </p>

    <PackHeader id="fa-brands">Font Awesome (brands)</PackHeader>
    <p>
      <A href="#" onClick={() => window.scrollTo(0, 0)}>
        Back to Top
      </A>
    </p>
    <IconsContainer>{renderIconPack('fa-brands', faBrands)}</IconsContainer>

    <PackHeader id="fa-regular">Font Awesome (regular)</PackHeader>
    <p>
      <A href="#" onClick={() => window.scrollTo(0, 0)}>
        Back to Top
      </A>
    </p>
    <IconsContainer>{renderIconPack('fa-regular', faRegular)}</IconsContainer>

    <PackHeader id="fa-solid">Font Awesome (solid)</PackHeader>
    <p>
      <A href="#" onClick={() => window.scrollTo(0, 0)}>
        Back to Top
      </A>
    </p>
    <IconsContainer>{renderIconPack('fa-solid', faSolid)}</IconsContainer>

    <PackHeader id="material">Material Icons</PackHeader>
    <p>
      <A href="#" onClick={() => window.scrollTo(0, 0)}>
        Back to Top
      </A>
    </p>
    <IconsContainer>{renderIconPack('material', material)}</IconsContainer>

    <PackHeader id="octicons">Octicons</PackHeader>
    <p>
      <A href="#" onClick={() => window.scrollTo(0, 0)}>
        Back to Top
      </A>
    </p>
    <IconsContainer>{renderIconPack('octicons', octicons)}</IconsContainer>
  </>
)

ReactDOM.render(<App />, document.getElementById('root'))
