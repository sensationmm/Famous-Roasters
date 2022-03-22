import React, { useEffect } from 'react'

export const Cart: React.FC = () => {
  useEffect(() => {
    document.title = 'Famous Roasters | Cart'
  }, [])

  return (
    <main className="h-screen flex items-center justify-center bg-grey-whisper">
      <div>
        <div className="font-syne flex justify-center text-4xl md:text-5xl xl:text-6xl">
          <h1>
            <span>Famous</span> <span className="font-bold">Roasters</span>
          </h1>
        </div>
        <div className="text-center">Cart page</div>
      </div>
    </main>
  )
}
