import React from 'react'
import { Button, ButtonColor, ButtonEmphasis, ButtonSize } from 'src/components'

export const Placeholder: React.FC = () => {
  return (
    <main className="h-screen flex items-center justify-center bg-grey-whisper">
      <div>
        <div className="font-syne flex justify-center text-4xl md:text-5xl xl:text-6xl">
          <h1>
            <span>Famous</span> <span className="font-bold">Roasters</span>
          </h1>
        </div>
        <div className="flex justify-center mt-12">
          <Button size={ButtonSize.sm} onClick={() => alert('Coffee!')} className="mr-4">
            Primary contained
          </Button>
          <Button size={ButtonSize.sm} color={ButtonColor.Secondary} onClick={() => alert('Coffee!')} className="mr-4">
            Secondary contained
          </Button>
          <Button
            size={ButtonSize.sm}
            color={ButtonColor.Primary}
            emphasis={ButtonEmphasis.Outlined}
            onClick={() => alert('Coffee!')}
            className="mr-4"
          >
            Outlined
          </Button>
          <Button size={ButtonSize.sm} emphasis={ButtonEmphasis.Text} onClick={() => alert('Coffee!')}>
            Text button
          </Button>
        </div>
        <div className="flex justify-center mt-6">
          <Button onClick={() => alert('Coffee!')} className="mr-4">
            Primary contained
          </Button>
          <Button color={ButtonColor.Secondary} onClick={() => alert('Coffee!')} className="mr-4">
            Secondary contained
          </Button>
          <Button
            color={ButtonColor.Primary}
            emphasis={ButtonEmphasis.Outlined}
            onClick={() => alert('Coffee!')}
            className="mr-4"
          >
            Outlined
          </Button>
          <Button emphasis={ButtonEmphasis.Text} onClick={() => alert('Coffee!')}>
            Text button
          </Button>
        </div>
        <div className="flex justify-center mt-6">
          <Button size={ButtonSize.lg} onClick={() => alert('Coffee!')} className="mr-4">
            Primary contained
          </Button>
          <Button size={ButtonSize.lg} color={ButtonColor.Secondary} onClick={() => alert('Coffee!')} className="mr-4">
            Secondary contained
          </Button>
          <Button
            size={ButtonSize.lg}
            color={ButtonColor.Primary}
            emphasis={ButtonEmphasis.Outlined}
            onClick={() => alert('Coffee!')}
            className="mr-4"
          >
            Outlined
          </Button>
          <Button size={ButtonSize.lg} emphasis={ButtonEmphasis.Text} onClick={() => alert('Coffee!')} className="mr-4">
            Text button
          </Button>
        </div>
      </div>
    </main>
  )
}
