import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button, ButtonEmphasis, ButtonSize } from 'src/components'

interface StickyBottomNavigationProps {
  isNextDisabled?: boolean
  percentage?: number
  nextClicked?: () => void
  prevClicked?: () => void
}

export const StickyBottomNavigation: React.FC<StickyBottomNavigationProps> = ({
  isNextDisabled = false,
  percentage,
  nextClicked,
  prevClicked,
}) => {
  const { t } = useTranslation()

  return (
    <div className="sticky bottom-0 bg-white">
      {percentage ? (
        <div className="h-1 bg-coreUI-border">
          <div className={`h-1 bg-brand-black transition-all`} style={{ width: `${percentage}%` }} />
        </div>
      ) : (
        <div className="h-0.5 border-b border-brand-grey-whisper" />
      )}
      <div className="flex space-x-2 py-4 items-center justify-center">
        <Button
          type="button"
          emphasis={ButtonEmphasis.Tertiary}
          size={ButtonSize.md}
          className="flex justify-center min-w-[10rem]"
          data-testid="prevButton"
          onClick={() => prevClicked && prevClicked()}
        >
          {t('cta.prev')}
        </Button>
        <Button
          type="button"
          emphasis={ButtonEmphasis.Primary}
          size={ButtonSize.md}
          className="flex justify-center min-w-[10rem]"
          data-testid="nextButton"
          disabled={isNextDisabled}
          onClick={() => nextClicked && nextClicked()}
        >
          {t('cta.next')}
        </Button>
      </div>
    </div>
  )
}
