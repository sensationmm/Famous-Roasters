import React from 'react'

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Trustpilot?: any
  }
}

export const TrustPilot = () => {
  const ref = React.useRef(null)
  React.useEffect(() => {
    if (window.Trustpilot) {
      window.Trustpilot.loadFromElement(ref.current, true)
    }
  }, [])
  return (
    <div
      ref={ref}
      className="trustpilot-widget"
      data-locale="de-DE"
      data-template-id="53aa8807dec7e10d38f59f32"
      data-businessunit-id="62c454f8cb03c9a2269fadb6"
      data-style-height="150px"
      data-style-width="100%"
      data-theme="dark"
    >
      <a href="https://de.trustpilot.com/review/60beans.com" target="_blank" rel="noopener">
        Trustpilot
      </a>
    </div>
  )
}
