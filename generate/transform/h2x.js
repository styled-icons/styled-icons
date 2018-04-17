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
    JSXElement: {
      enter(path, state) {
        if (path.node.name === 'svg') {
          const heightAttribute = path.node.attributes.filter(attr => attr.name === 'height')[0]
          const widthAttribute = path.node.attributes.filter(attr => attr.name === 'width')[0]
          const viewBoxAttribute = path.node.attributes.filter(attr => attr.name === 'viewBox')[0]

          state.height = heightAttribute ? heightAttribute.value : null
          state.width = widthAttribute ? heightAttribute.value : null
          state.viewBox = viewBoxAttribute ? heightAttribute.value : null

          path.node.attributes = []

          state.children = path.node.children
        }
      },
    },
  },
})

module.exports = (code, state) => {
  const firstPass = transform(code, {plugins: [extractChildren, processSVG], state})

  return state.children.map(replacement =>
    transform('<svg />', {
      plugins: [replaceChildren, jsx, stripAttribute('xmlns'), removeComments, removeStyle],
      state: {replacement},
    }),
  )
}
