import React, { forwardRef, Ref, useState } from 'react'
import { Typography, TypographySize, TypographyType } from 'src/components'

type TextAreaProps = {
  id: string
  ref?: Ref<HTMLTextAreaElement>
  rows?: number
  value: string
  setValue: (val: string) => void
  limit?: number
}
//sdfsdf
export const TextArea: React.FC<TextAreaProps> = forwardRef(
  ({ id, rows = 5, value, setValue, limit = 0 }: TextAreaProps, ref) => {
    const [charCount, setCharCount] = useState(0)

    const setFormattedContent = (text: string) => {
      if (limit) {
        if (text.length <= limit) {
          setValue(text)
        }
      } else {
        setValue(text)
      }
    }

    React.useEffect(() => {
      setCharCount(value.length)
    }, [value])

    return (
      <div className="border border-coreUI-text-secondary p-2">
        <textarea
          data-testid="component-textarea"
          id={id}
          ref={ref}
          rows={rows}
          onChange={(event) => setFormattedContent(event.target.value)}
          className="w-full resize-none focus:ring-0 focus:outline-0"
          value={value}
        />
        {limit !== 0 && (
          <Typography
            type={TypographyType.Label}
            size={TypographySize.Tiny}
            className={`flex justify-end w-full text-right font-normal ${
              value.length < limit ? 'text-coreUI-text-secondary' : 'text-negative'
            }`}
          >
            {charCount}/{limit}
          </Typography>
        )}
      </div>
    )
  },
)
