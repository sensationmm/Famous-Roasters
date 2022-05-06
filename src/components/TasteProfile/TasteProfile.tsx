import React from 'react'

interface TestProfileProps {
  sweetness: number
  body: number
  bitterness: number
  acidity: number
}

export const TasteProfile: React.FC<TestProfileProps> = ({
  sweetness,
  body,
  bitterness,
  acidity,
}: TestProfileProps) => {
  return (
    <div>
      Values are: sweetness({sweetness}), body({body}), bitterness({bitterness}), acidity({acidity}).
    </div>
  )
}
