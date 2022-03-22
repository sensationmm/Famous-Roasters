import React, { useEffect } from 'react'

export const Checkout: React.FC = () => {
  useEffect(() => {
    document.title = 'Famous Roasters | Checkout'
  }, [])

  return (
    <main className="h-screen flex items-center justify-center bg-grey-whisper">
      <div>
        <div className="font-syne flex justify-center text-4xl md:text-5xl xl:text-6xl">
          <h1>
            <span>Famous</span> <span className="font-bold">Roasters</span>
          </h1>
        </div>
        <div className="text-center">Checkout page</div>
      </div>
    </main>
  )
}
