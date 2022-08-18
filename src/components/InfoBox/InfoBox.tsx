import React from 'react'
import { Icon, IconName, Typography, TypographySize } from 'src/components'
import useBreakpoint from 'src/hooks/useBreakpoint'

type InfoBoxProps = {
  title: string
  text?: string
}

export const InfoBox: React.FC<InfoBoxProps> = ({ title, text }) => {
  const breakpoint = useBreakpoint()

  return (
    <div
      className={`flex ${breakpoint !== 'lg' ? 'items-start' : 'items-center'} px-5 py-3 bg-coreUI-background-images`}
    >
      <Icon name={IconName.Info} />
      <div className={`flex pl-3 ${breakpoint !== 'lg' ? 'flex-col' : 'flex-row'}`}>
        <Typography size={TypographySize.Tiny} className="font-bold pr-2">
          {title}
        </Typography>
        {text && <Typography size={TypographySize.Tiny}>{text}</Typography>}
      </div>
    </div>
  )
}
