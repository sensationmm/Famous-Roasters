import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Typography, TypographySize } from 'src/components'

export interface TabsDataItem {
  key: string
  translationKey: string
}

interface TabsNavigationProps {
  tabsData: TabsDataItem[]
  initialActiveTabKey?: string
  setParentActiveTab: (key: string) => void
}

export const TabsNavigation: React.FC<TabsNavigationProps> = ({
  tabsData,
  initialActiveTabKey = tabsData[0].key,
  setParentActiveTab,
}: TabsNavigationProps) => {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<string>(initialActiveTabKey)

  const handleTabItemClick = (key: string) => {
    setActiveTab(key)
    setParentActiveTab(key)
  }

  return (
    <div className="flex" role="tablist">
      {tabsData.map((tabsDataItem: TabsDataItem) => {
        const isActive = tabsDataItem.key === activeTab
        return (
          <button
            type="button"
            onClick={() => handleTabItemClick(tabsDataItem.key)}
            key={tabsDataItem.key}
            data-testid={`tab-${tabsDataItem.key}`}
            className="mr-6"
            role="tab"
            aria-selected={isActive}
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
          </button>
        )
      })}
    </div>
  )
}
