import { formatBlogHtmlElement, formatHtmlElement, isAllowedHtmlElement, parseHtmlSafely } from '.'

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

  it('formatBlogHtmlElement processes paragraphs', () => {
    const element = document.createElement('p')
    element.innerHTML = 'hello world'
    expect(formatBlogHtmlElement(element).outerHTML).toEqual(
      '<p class="text-lg md:text-[20px] -tracking-[.02em] leading-7 mb-6">hello world</p>',
    )
  })

  it('formatHtmlElement processes headlines', () => {
    const element = document.createElement('h1')
    element.innerHTML = 'hello world'
    expect(formatHtmlElement(element).outerHTML).toEqual(
      '<h4 class="mb-4 text-lg leading-7 font-semibold">hello world</h4>',
    )
  })

  it('formatBlogHtmlElement processes headlines', () => {
    const element = document.createElement('h1')
    element.innerHTML = 'hello world'
    expect(formatBlogHtmlElement(element).outerHTML).toEqual(
      '<h1 class="mb-8 text-[24px] md:text-[32px] -tracking-[.02em] leading-8 md:leading-9 font-semibold font-syne">hello world</h1>',
    )
  })

  it('formatHtmlElement processes iframes', () => {
    const element = document.createElement('iframe')
    element.innerHTML = 'hello world'
    expect(formatHtmlElement(element).outerHTML).toEqual(
      '<div class="video-container mb-4"><iframe>hello world</iframe></div>',
    )
  })

  it('formatBlogHtmlElement processes iframes', () => {
    const element = document.createElement('iframe')
    element.innerHTML = 'hello world'
    expect(formatBlogHtmlElement(element).outerHTML).toEqual(
      '<div class="video-container mb-4"><iframe>hello world</iframe></div>',
    )
  })

  it('formatHtmlElement parses through other whitelisted elements on the first level', () => {
    const element = document.createElement('div')
    element.innerHTML = 'hello world'
    expect(formatHtmlElement(element).outerHTML).toEqual('<div>hello world</div>')
  })

  it('formatBlogHtmlElement parses through other whitelisted elements on the first level', () => {
    const element = document.createElement('div')
    element.innerHTML = 'hello world'
    expect(formatBlogHtmlElement(element).outerHTML).toEqual('<div>hello world</div>')
  })

  it('parseHtmlSafely works', () => {
    const htmlString = "<h1>Title</h1><script src='verymaliciouscode.js'></script><p>Paragraph</p>"
    expect(parseHtmlSafely(htmlString)).toEqual(
      '<h4 class="mb-4 text-lg leading-7 font-semibold">Title</h4><p class="mb-4">Paragraph</p>',
    )
  })

  it('parseHtmlSafely with custom formatter works', () => {
    const htmlString = "<h1>Title</h1><script src='verymaliciouscode.js'></script><p>Paragraph</p>"
    expect(parseHtmlSafely(htmlString, formatBlogHtmlElement)).toEqual(
      '<h1 class="mb-8 text-[24px] md:text-[32px] -tracking-[.02em] leading-8 md:leading-9 font-semibold font-syne">Title</h1><p class="text-lg md:text-[20px] -tracking-[.02em] leading-7 mb-6">Paragraph</p>',
    )
  })
})
