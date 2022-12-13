import React from 'react'

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Trustpilot?: any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataLayer: Record<string, any>[]
  }
}

// PLEASE NOTE: the negative margin -ml-5 was added to the trustpilot code to counter the
// spacing added by the trustpilot code itself, so the box is aligned with the rest of cotent

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
      className="trustpilot-widget -ml-5"
      data-locale="de-DE"
      data-template-id="53aa8807dec7e10d38f59f32"
      data-businessunit-id="62c454f8cb03c9a2269fadb6"
      data-style-height="150px"
      data-theme="dark"
    >
      <a href="https://de.trustpilot.com/review/60beans.com" target="_blank" rel="noopener">
        Trustpilot
      </a>
    </div>
  )
}
