// Listen to an event, but call subscribers in a requestAnimationFrame
const performantEventObserver = (subscribe, unsubscribe) => {
  const callbacks = []
  let running = false

  const runCallbacks = e => {
    callbacks.forEach(callback => callback(e))
    running = false
  }

  const eventHandler = e => {
    if (running) return

    running = true

    if (window.requestAnimationFrame) {
      window.requestAnimationFrame(() => runCallbacks(e))
    } else {
      // 66ms is 15fps
      setTimeout(() => runCallbacks(e), 66)
    }
  }

  return {
    addEventListener: listener => {
      if (!callbacks.length) {
        subscribe(eventHandler)
      }

      const idx = callbacks.indexOf(listener)
      if (idx === -1) callbacks.push(listener)
    },

    removeEventListener: listener => {
      const idx = callbacks.indexOf(listener)
      if (idx !== -1) callbacks.splice(idx, 1)

      if (!callbacks.length) {
        unsubscribe(eventHandler)
      }
    },

    removeAllListeners() {
      unsubscribe(eventHandler)
    },
  }
}

export default performantEventObserver
