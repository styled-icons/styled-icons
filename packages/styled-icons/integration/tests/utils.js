async function screenshotDOMElement(selector, padding = 0) {
  const rect = await page.evaluate(selector => {
    const element = document.querySelector(selector)
    const {x, y, width, height} = element.getBoundingClientRect()
    return {left: x, top: y, width, height, id: element.id}
  }, selector)

  return await page.screenshot({
    clip: {
      x: rect.left - padding,
      y: rect.top - padding,
      width: rect.width + padding * 2,
      height: rect.height + padding * 2,
    },
  })
}

module.exports = function screenshotIcon() {
  return screenshotDOMElement('.icon-card svg')
}
