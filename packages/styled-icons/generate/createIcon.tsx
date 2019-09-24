import * as React from 'react'
import {StyledIconBase, StyledIconProps} from './templates/StyledIconBase'

type SVGProps<T = SVGElement> = React.SVGProps<T>

const SVG_ATTRS = [
  'fill',
  'fillOpacity',
  'fillRule',
  'stroke',
  'strokeDasharray',
  'strokeDashoffset',
  'strokeLinecap',
  'strokeLinejoin',
  'strokeMiterlimit',
  'strokeOpacity',
] as const

const coloringProps = ['stroke', 'fill'] as const
const allowedValues = ['none', 'currentColor']

const unallowedElements = ['script', 'title', 'style', 'desc', 'metadata']
const unallowedProps = ['xlmns', 'style']

// Quick and Dirty SVGO implementation
function svgo(element: JSX.Element) {
  // Remove unallowed elements
  if (unallowedElements.includes(element.type)) return
  // Handle element  without props
  if (!element.props) return element
  // Remove unallowed props
  // TODO: Object.fromEntries
  const optimizedProps = Object.keys(element.props)
    .filter(prop => !unallowedProps.includes(prop))
    .reduce<SVGProps>((acc, key) => {
      // @ts-ignore
      acc[key] = element.props[key]
      return acc
    }, {})

  // Handle stroke and fill explicitly
  coloringProps.forEach(prop => {
    if (optimizedProps[prop] && !allowedValues.includes(optimizedProps[prop]!)) {
      delete optimizedProps[prop]
    }
  })

  if (element.props.children) {
    optimizedProps.children = React.Children.map(element.props.children, svgo)
  }

  return React.createElement(element.type, optimizedProps)
}

const defaultSize = 24

export default function createIcon(
  svg: JSX.Element,
  {
    width: defaultWidth = defaultSize,
    height: defaultHeight = defaultSize,
    verticalAlign = 'middle',
  }: Partial<{
    width: number | string
    height: number | string
    verticalAlign: string
  }> = {},
) {
  if (process.env.NODE_ENV !== 'production') {
    if (!React.isValidElement(svg)) {
      throw new Error('An element must be provided')
    }
    if (svg.type !== 'svg') {
      throw new Error(
        `Invalid Element of type ${svg.type} provided. You must provide an svg element`,
      )
    }
  }

  // Optimize SVG
  const optimizedSvg = svgo(svg)!
  const svgProps = optimizedSvg.props

  // Quick and dirty H2X processSVG
  const height = svgProps.height || defaultHeight
  const width = svgProps.width || defaultWidth
  const {viewBox = `0 0 ${width} ${height}`, children} = svgProps
  const attrs: SVGProps<SVGSVGElement> = {
    fill: 'currentColor',
    xmlns: 'http://www.w3.org/2000/svg',
  }

  // Pick specific attrs to pass through
  for (const attr of SVG_ATTRS) {
    if (attr in svgProps) {
      // @ts-ignore
      attrs[attr] = svgProps[attr]
    }
  }

  // Create Icon
  return Object.assign(
    React.forwardRef<SVGSVGElement, StyledIconProps>((props, ref) => (
      <StyledIconBase
        iconAttrs={attrs}
        iconVerticalAlign={verticalAlign}
        iconViewBox={viewBox}
        {...props}
        ref={ref}
      >
        {children}
      </StyledIconBase>
    )),
    {dimensions: {width, height}},
  )
}
