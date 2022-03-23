import React, { useEffect } from 'react'
import { Layout } from 'src/components'

export const Catalogue: React.FC = () => {
  useEffect(() => {
    document.title = 'Famous Roasters | Catalogue'
  }, [])

  return (
    <Layout>
      <main className="flex-grow flex items-center justify-center bg-grey-whisper">
        <div>
          <div className="font-syne flex justify-center text-4xl md:text-5xl xl:text-6xl">
            <h1>
              <span>Famous</span> <span className="font-bold">Roasters</span>
            </h1>
          </div>
          <div className="text-center">Catalogue page</div>
        </div>
      </main>
    </Layout>
  )
}
