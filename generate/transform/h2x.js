const {transform} = require('h2x-core')
const jsx = require('h2x-plugin-jsx').default

const extractChildren = () => ({
  visitor: {
    HTMLElement: {
      enter(path, state) {
        if (path.node.tagName !== 'svg') return
        state.children = Array.from(path.node.childNodes)
      },
    },
  },
})

const replaceChildren = () => ({
  visitor: {
    HTMLElement: {
      enter(path, state) {
        if (path.node.tagName !== 'svg') return
        path.replace(state.replacement)
      },
    },
  },
})

const stripAttribute = attribute => () => ({
  visitor: {
    JSXAttribute: {
      enter(path) {
        if (path.node.name === attribute) {
          path.remove()
        }
      },
    },
  },
})

const removeComments = () => ({
  visitor: {
    JSXComment: {
      enter(path) {
        path.remove()
      },
    },
  },
})

const removeStyle = () => ({
  visitor: {
    JSXElement: {
      enter(path) {
        if (path.node.name === 'style') {
          path.remove()
        }
      },
    },
  },
})

const processSVG = () => ({
  visitor: {
    HTMLElement: {
      enter(path, state) {
        if (path.node.tagName === 'svg') {
          const attributes = Array.from(path.node.attributes)

          state.attrs = attributes.reduce(
            (attrs, attr) => ({...attrs, [attr.name]: attr.value}),
            {},
          )

          const heightAttribute = attributes.find(attr => attr.name === 'height')
          const widthAttribute = attributes.find(attr => attr.name === 'width')
          const viewBoxAttribute = attributes.find(attr => attr.name === 'viewBox')

          state.height = heightAttribute ? heightAttribute.value : null
          state.width = widthAttribute ? widthAttribute.value : null
          state.viewBox = viewBoxAttribute ? viewBoxAttribute.value : null

          state.children = Array.from(path.node.children)
        }
      },
    },
  },
})

module.exports = (code, state) => {
  // First pass to extract out attributes and children
  transform(code, {plugins: [extractChildren, processSVG], state})

  // Second pass over the extracted children
  return state.children.map(replacement =>
    transform('<svg />', {
      plugins: [
        replaceChildren,
        jsx,
        stripAttribute('xmlns'),
        stripAttribute('path'),
        removeComments,
        removeStyle,
      ],
      state: {replacement},
    }),
  )
}
