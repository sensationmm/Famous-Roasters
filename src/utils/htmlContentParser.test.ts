import { formatHtmlElement, isAllowedHtmlElement, parseHtmlSafely } from '.'

describe('HTML content parser utils', () => {
  it('isAllowedHtmlElement works for allowed elements', () => {
    const element = document.createElement('p')
    element.innerHTML = 'hello world'
    expect(isAllowedHtmlElement(element)).toBe(true)
  })

  it('isAllowedHtmlElement works for not allowed elements', () => {
    const element = document.createElement('br')
    expect(isAllowedHtmlElement(element)).toBe(false)
  })

  it('isAllowedHtmlElement prevents script tags', () => {
    const element = document.createElement('div')
    element.innerHTML = "<script src='verymaliciouscode.js'></script>"
    expect(isAllowedHtmlElement(element)).toBe(false)
  })

  it('formatHtmlElement processes paragraphs', () => {
    const element = document.createElement('p')
    element.innerHTML = 'hello world'
    expect(formatHtmlElement(element).outerHTML).toEqual('<p class="mb-4">hello world</p>')
  })

  it('formatHtmlElement processes headlines', () => {
    const element = document.createElement('h1')
    element.innerHTML = 'hello world'
    expect(formatHtmlElement(element).outerHTML).toEqual('<h4 class="mb-4 font-semibold">hello world</h4>')
  })

  it('formatHtmlElement processes iframes', () => {
    const element = document.createElement('iframe')
    element.innerHTML = 'hello world'
    expect(formatHtmlElement(element).outerHTML).toEqual('<iframe class="mb-4">hello world</iframe>')
  })

  it('formatHtmlElement parses through other whitelisted elements on the first level', () => {
    const element = document.createElement('div')
    element.innerHTML = 'hello world'
    expect(formatHtmlElement(element).outerHTML).toEqual('<div>hello world</div>')
  })

  it('parseHtmlSafely works', () => {
    const htmlString = "<h1>Title</h1><script src='verymaliciouscode.js'></script><p>Paragraph</p>"
    expect(parseHtmlSafely(htmlString)).toEqual(
      '<h4 class="mb-4 font-semibold">Title</h4><p class="mb-4">Paragraph</p>',
    )
  })
})
