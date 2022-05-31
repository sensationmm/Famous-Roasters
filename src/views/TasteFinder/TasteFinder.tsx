import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { Layout, NavigationTheme } from 'src/components'

import { Name } from './Steps/Name'
import { Welcome } from './Steps/Welcome'

export const TasteFinder: React.FC = () => {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const [actualStep, setActualStep] = useState<string>()

  const toggleItem = (index: number) => {
    switch (index) {
      case 1:
        setActualStep('your-name')
        setSearchParams({ step: 'your-name' })
        break
      default:
        setActualStep('welcome')
        setSearchParams({ step: 'welcome' })
        break
    }
  }

  useEffect(() => {
    document.title = `${t('brand.name')} | ${t('pages.tasteFinder.title')}`
  }, [])

  useEffect(() => {
    const step = searchParams.get('step')
    if (step) {
      setActualStep(step)
    } else {
      toggleItem(0)
    }
  }, [searchParams])

  const renderStep = (key: string) => {
    switch (key) {
      case 'welcome':
        return <Welcome next={() => toggleItem(1)} />
      case 'your-name':
        return <Name />
      default:
        return <span>Wrong</span>
    }
  }

  return <Layout navigationTheme={NavigationTheme.Home}>{actualStep !== undefined && renderStep(actualStep)}</Layout>
}
