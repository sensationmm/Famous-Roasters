import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { Layout, NavigationTheme, StickyBottomNavigation } from 'src/components'

import {
  Acidity as AcidityPartial,
  Bitterness as BitternessPartial,
  Body as BodyPartial,
  Brewing as BrewingPartial,
  Sweetness as SweetnessPartial,
  Welcome as WelcomePartial,
  YourName as YourNamePartial,
} from './Steps'

enum TasteFinderStepsNames {
  Welcome = 'willkommen',
  YourName = 'deiner-name',
  Bitterness = 'stärke',
  Sweetness = 'süße',
  Acidity = 'lebendigkeit',
  Body = 'körper',
  Brewing = 'zubereitung',
  Adventurous = 'gewagt',
}

const TasteFinderSteps = [
  {
    index: 0,
    step: TasteFinderStepsNames.Welcome,
    value: 0,
  },
  {
    index: 1,
    step: TasteFinderStepsNames.YourName,
    value: 14.3,
  },
  {
    index: 2,
    step: TasteFinderStepsNames.Bitterness,
    value: 28.6,
  },
  {
    index: 3,
    step: TasteFinderStepsNames.Sweetness,
    value: 42.9,
  },
  {
    index: 4,
    step: TasteFinderStepsNames.Acidity,
    value: 57.2,
  },
  {
    index: 5,
    step: TasteFinderStepsNames.Body,
    value: 71.5,
  },
  {
    index: 6,
    step: TasteFinderStepsNames.Brewing,
    value: 85.8,
  },
  {
    index: 7,
    step: TasteFinderStepsNames.Adventurous,
    value: 100,
  },
]

export interface TasteFinderField {
  name: string
  value: string | undefined
}

export interface TasteFinderFieldHandlerProps {
  currentData: TasteFinderField[]
  updateData: (data: TasteFinderField) => void
}

export const TasteFinder: React.FC = () => {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const [actualStep, setActualStep] = useState<string>()
  const [tasteFinderFieldsData, setTasteFinderFieldsData] = useState<TasteFinderField[]>([])

  const navigateTo = (index: number) => {
    switch (index) {
      case 1:
        setActualStep(TasteFinderStepsNames.YourName)
        setSearchParams({ step: TasteFinderStepsNames.YourName })
        break
      case 2:
        setActualStep(TasteFinderStepsNames.Bitterness)
        setSearchParams({ step: TasteFinderStepsNames.Bitterness })
        break
      case 3:
        setActualStep(TasteFinderStepsNames.Sweetness)
        setSearchParams({ step: TasteFinderStepsNames.Sweetness })
        break
      case 4:
        setActualStep(TasteFinderStepsNames.Acidity)
        setSearchParams({ step: TasteFinderStepsNames.Acidity })
        break
      case 5:
        setActualStep(TasteFinderStepsNames.Body)
        setSearchParams({ step: TasteFinderStepsNames.Body })
        break
      case 6:
        setActualStep(TasteFinderStepsNames.Brewing)
        setSearchParams({ step: TasteFinderStepsNames.Brewing })
        break
      default:
        setActualStep(TasteFinderStepsNames.Welcome)
        setSearchParams({ step: TasteFinderStepsNames.Welcome })
        break
    }
  }

  const renderStep = (key: string) => {
    switch (key) {
      case TasteFinderStepsNames.YourName:
        return <YourNamePartial currentData={getCurrentData(['name'])} updateData={handleData} />
      case TasteFinderStepsNames.Bitterness:
        return <BitternessPartial currentData={getCurrentData(['bitterness'])} updateData={handleData} />
      case TasteFinderStepsNames.Sweetness:
        return <SweetnessPartial currentData={getCurrentData(['sweetness'])} updateData={handleData} />
      case TasteFinderStepsNames.Acidity:
        return <AcidityPartial currentData={getCurrentData(['acidity'])} updateData={handleData} />
      case TasteFinderStepsNames.Body:
        return <BodyPartial currentData={getCurrentData(['body'])} updateData={handleData} />
      case TasteFinderStepsNames.Brewing:
        return <BrewingPartial currentData={getCurrentData(['brewing'])} updateData={handleData} />
      case TasteFinderStepsNames.Welcome:
      default:
        return <WelcomePartial next={() => navigateTo(1)} />
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
      navigateTo(0)
    }
  }, [searchParams])

  const handleData = (data: TasteFinderField) => {
    setTasteFinderFieldsData((prev) => [...prev.filter((p) => p.name !== data.name), data])
  }

  const getCurrentData = (currentDataItems: string[]): TasteFinderField[] => {
    const res: TasteFinderField[] = []
    currentDataItems.forEach((currentDataItem) => {
      const searchRes = tasteFinderFieldsData.find((item) => item.name === currentDataItem)
      if (searchRes) res.push(searchRes)
    })
    return res
  }

  const getPercentage = (key: string): number => {
    const percentage = TasteFinderSteps.find((p) => p?.step === key)
    return percentage ? percentage.value : 0
  }

  const handleNextClicked = (currentStep: string) => {
    const currentStepData = TasteFinderSteps.find((x) => x.step === currentStep)
    currentStepData && navigateTo(currentStepData.index + 1)
  }

  const handlePrevClicked = (currentStep: string) => {
    const currentStepData = TasteFinderSteps.find((x) => x.step === currentStep)
    currentStepData && navigateTo(currentStepData.index - 1)
  }

  const isNextDisabledInStep = (key: string) => {
    switch (key) {
      case TasteFinderStepsNames.YourName: {
        const field = getCurrentData(['name'])[0]
        return field === undefined || field.value?.length == 0
      }
      case TasteFinderStepsNames.Bitterness: {
        const field = getCurrentData(['bitterness'])[0]
        return field === undefined || field.value === undefined
      }
      case TasteFinderStepsNames.Sweetness: {
        const field = getCurrentData(['sweetness'])[0]
        return field === undefined || field.value === undefined
      }
      case TasteFinderStepsNames.Acidity: {
        const field = getCurrentData(['acidity'])[0]
        return field === undefined || field.value === undefined
      }
      case TasteFinderStepsNames.Body: {
        const field = getCurrentData(['body'])[0]
        return field === undefined || field.value === undefined
      }
      case TasteFinderStepsNames.Brewing: {
        const field = getCurrentData(['brewing'])[0]
        return field === undefined || field.value === undefined
      }
      default:
        return true
    }
  }

  return (
    <Layout navigationTheme={NavigationTheme.Home}>
      <main className="flex flex-col" style={{ minHeight: 'calc(100vh - 66px)' }}>
        {actualStep !== undefined && renderStep(actualStep)}
        {actualStep !== undefined && actualStep !== TasteFinderStepsNames.Welcome && (
          <StickyBottomNavigation
            percentage={getPercentage(actualStep)}
            isNextDisabled={isNextDisabledInStep(actualStep)}
            prevClicked={() => handlePrevClicked(actualStep)}
            nextClicked={() => handleNextClicked(actualStep)}
          />
        )}
      </main>
    </Layout>
  )
}
