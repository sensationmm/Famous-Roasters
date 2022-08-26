export const isAllowedHtmlElement = (el: Element) => {
  const allowedNodes = ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'IFRAME', 'IMG', 'DIV', 'SPAN']
  // prevent script tag
  return el.innerHTML.indexOf('<script') === -1 && allowedNodes.indexOf(el.nodeName) >= 0
}

// used on the product page for content from Shopify
export const formatHtmlElement = (el: Element) => {
  el.removeAttribute('data-mce-fragment')
  const elementType = el.nodeName
  switch (elementType) {
    case 'H1':
    case 'H2':
    case 'H3':
    case 'H4':
    case 'H5':
    case 'H6': {
      // avoid seo clashes
      const headlineEl = document.createElement('h4')
      headlineEl.innerHTML = el.innerHTML
      headlineEl.setAttribute('class', 'mb-4 text-lg leading-7 font-semibold')
      return headlineEl
    }
    case 'P':
      el.setAttribute('class', 'mb-4')
      return el
    case 'IFRAME': {
      const containerEl = document.createElement('div')
      containerEl.setAttribute('class', 'video-container mb-4')
      containerEl.append(el)
      return containerEl
    }
    default:
      return el
  }
}

// used by the blog page for content from hygraph CMS
export const formatBlogHtmlElement = (el: Element) => {
  const elementType = el.nodeName
  switch (elementType) {
    case 'H1':
    case 'H2':
    case 'H3':
    case 'H4':
    case 'H5':
    case 'H6': {
      el.setAttribute(
        'class',
        'mb-8 text-[24px] md:text-[32px] -tracking-[.02em] leading-8 md:leading-9 font-semibold font-syne',
      )
      return el
    }
    case 'P': {
      el.setAttribute('class', 'text-lg md:text-[20px] -tracking-[.02em] leading-7 mb-6')
      return el
    }
    case 'IFRAME': {
      const containerEl = document.createElement('div')
      containerEl.setAttribute('class', 'video-container mb-4')
      containerEl.append(el)
      return containerEl
    }
    case 'IMG': {
      const containerEl = document.createElement('div')
      containerEl.setAttribute('class', 'flex justify-center h-[304px] md:h-[352px] my-[48px] overflow-hidden')
      containerEl.append(el)
      el.setAttribute('class', 'object-cover min-w-full min-h-full')
      return containerEl
    }
    default:
      return el
  }
}

export const parseHtmlSafely = (html: string, formatter: (el: Element) => Element = formatHtmlElement) => {
  const parser = new DOMParser()
  const children = Array.from(parser.parseFromString(html, 'text/html').body.children)
  const resultContainer = document.createElement('html')
  children.forEach((child) => isAllowedHtmlElement(child) && resultContainer.append(formatter(child)))
  return resultContainer.innerHTML
}
