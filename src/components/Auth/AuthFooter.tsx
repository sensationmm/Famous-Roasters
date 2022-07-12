import React from 'react'
import { Link } from 'react-router-dom'
import { Typography, TypographySize, TypographyType } from 'src/components'
import i18n from 'src/config/i18n'

export const AuthFooter: React.FC = () => {
  return (
    <>
      <div className="flex">
        <div className="border-t border-brand-grey-whisper absolute w-full left-0" />
      </div>
      <div className="w-full mt-4 flex justify-center">
        <Link to="//www.notion.so/Datenschutzhinweise-ad5b45261a964166a74883d2770e28ea" target="_blank">
          <Typography
            as="div"
            type={TypographyType.Paragraph}
            size={TypographySize.Tiny}
            className="font-normal border-b"
          >
            {i18n.t<string>('auth.footer.privacyLink')}
          </Typography>
        </Link>
        <Link
          to="//slender-petunia-c3c.notion.site/Imprint-33b18fd9e469471ab768eef8155da968"
          target="_blank"
          className="ml-10"
        >
          <Typography
            as="div"
            type={TypographyType.Paragraph}
            size={TypographySize.Tiny}
            className="font-normal border-b"
          >
            {i18n.t<string>('auth.footer.imprintLink')}
          </Typography>
        </Link>
      </div>
    </>
  )
}
