import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'
import { Typography, TypographySize } from 'src/components'

export interface TabsDataItem {
  key: string
  translationKey: string
}

interface TabsNavigationProps {
  tabsData: TabsDataItem[]
}

export const TabsNavigation: React.FC<TabsNavigationProps> = ({ tabsData }: TabsNavigationProps) => {
  const { t } = useTranslation()
  const { productType = 'coffee' } = useParams()

  return (
    <div className="flex" role="tablist">
      {tabsData.map((tabsDataItem: TabsDataItem) => {
        const isActive = tabsDataItem.key === productType
        return (
          <Link
            to={`/catalogue/${tabsDataItem.key}`}
            className="mr-6"
            key={tabsDataItem.key}
            data-testid={`tab-${tabsDataItem.key}`}
          >
            <Typography
              size={TypographySize.Small}
              className={
                isActive
                  ? 'text-brand-black font-semibold border-b-2 pb-1.5'
                  : 'text-coreUI-text-secondary hover:text-coreUI-text-primary pb-1.5'
              }
            >
              {t(tabsDataItem.translationKey)}
            </Typography>
          </Link>
        )
      })}
    </div>
  )
}
