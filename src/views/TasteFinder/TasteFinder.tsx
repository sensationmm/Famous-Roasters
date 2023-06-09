import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Layout, NavigationTheme, StickyBottomNavigation } from 'src/components'
import { useLocalStorage } from 'src/utils'

import {
  Acidity as AcidityPartial,
  Adventurous as AdventurousPartial,
  Bitterness as BitternessPartial,
  Body as BodyPartial,
  Brewing as BrewingPartial,
  Processing as ProcessingPartial,
  Sweetness as SweetnessPartial,
  Welcome as WelcomePartial,
  YourName as YourNamePartial,
} from './Steps'

enum TasteFinderStepsNames {
  Welcome = 'willkommen',
  YourName = 'dein-name',
  Bitterness = 'stärke',
  Sweetness = 'süße',
  Acidity = 'lebendigkeit',
  Body = 'körper',
  Brewing = 'zubereitung',
  Adventurous = 'gewagt',
  Processing = 'bearbeiten',
}

const TasteFinderSteps = [
  {
    index: 0,
    step: TasteFinderStepsNames.Welcome,
    stepID: 'welcome',
    value: 0,
  },
  {
    index: 1,
    step: TasteFinderStepsNames.YourName,
    stepID: 'name',
    value: 14.3,
  },
  {
    index: 2,
    step: TasteFinderStepsNames.Bitterness,
    stepID: 'bitterness',
    value: 28.6,
  },
  {
    index: 3,
    step: TasteFinderStepsNames.Sweetness,
    stepID: 'sweetness',
    value: 42.9,
  },
  {
    index: 4,
    step: TasteFinderStepsNames.Acidity,
    stepID: 'acidity',
    value: 57.2,
  },
  {
    index: 5,
    step: TasteFinderStepsNames.Body,
    stepID: 'body',
    value: 71.5,
  },
  {
    index: 6,
    step: TasteFinderStepsNames.Brewing,
    stepID: 'grindType',
    value: 85.8,
  },
  {
    index: 7,
    step: TasteFinderStepsNames.Adventurous,
    stepID: 'adventurous',
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
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [actualStep, setActualStep] = useState<string>()
  const [tasteFinderState, setTasteFinderState] = useState<TasteFinderField[]>([])
  const [tasteFinderLocalStorage, setTasteFinderLocalStorage] = useLocalStorage('tasteFinder', '')

  useEffect(() => {
    const tasteFinderData = tasteFinderLocalStorage
    if (tasteFinderData) {
      setTasteFinderState(JSON.parse(tasteFinderData))
    } else {
      navigateTo(0)
    }
  }, [])

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
      case 7:
        setActualStep(TasteFinderStepsNames.Adventurous)
        setSearchParams({ step: TasteFinderStepsNames.Adventurous })
        break
      case 8:
        setActualStep(TasteFinderStepsNames.Processing)
        setSearchParams({ step: TasteFinderStepsNames.Processing })
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
        return <BrewingPartial currentData={getCurrentData(['grindType'])} updateData={handleData} />
      case TasteFinderStepsNames.Adventurous:
        return <AdventurousPartial currentData={getCurrentData(['adventurous'])} updateData={handleData} />
      case TasteFinderStepsNames.Processing:
        return <ProcessingPartial currentData={tasteFinderState} updateData={handleData} />
      case TasteFinderStepsNames.Welcome:
      default:
        return <WelcomePartial next={() => navigateTo(1)} />
    }
  }

  useEffect(() => {
    const step = searchParams.get('step')
    if (step) {
      setActualStep(step)
    } else {
      navigateTo(0)
    }
  }, [searchParams])

  const handleData = (data: TasteFinderField) => {
    // updates the state
    setTasteFinderState((prev) => [...prev.filter((p) => p.name !== data.name), data])
    // stores in localstorage
    setTasteFinderLocalStorage(JSON.stringify([...tasteFinderState.filter((p) => p.name !== data.name), data]))
    // redirect when complete
    if (data.name === 'recommendations' && data.value && data.value.length > 0) {
      navigate(`/featured/${(data.value[0] as unknown as { shopifyId: string }).shopifyId}`, { replace: true })
    }
  }

  const getCurrentData = (currentDataItems: string[]): TasteFinderField[] => {
    const res: TasteFinderField[] = []
    currentDataItems.forEach((currentDataItem) => {
      const searchRes = tasteFinderState.find((item) => item.name === currentDataItem)
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
        const field = getCurrentData(['grindType'])[0]
        return field === undefined || field.value === undefined
      }
      case TasteFinderStepsNames.Adventurous: {
        const field = getCurrentData(['adventurous'])[0]
        return field === undefined || field.value === undefined
      }
      default:
        return true
    }
  }

  return (
    <Layout navigationTheme={NavigationTheme.Home} showFooter={false}>
      <Helmet>
        <title>
          {t('brand.name')} | {t('pages.tasteFinder.title')}
        </title>
        <link rel="canonical" href={`${process.env.REACT_APP_DOMAIN_SHOP}/taste-finder`} />
      </Helmet>
      <main className="flex flex-col" style={{ minHeight: 'calc(100vh - 66px)' }}>
        {actualStep !== undefined && renderStep(actualStep)}
        {actualStep !== undefined &&
          actualStep !== TasteFinderStepsNames.Welcome &&
          actualStep !== TasteFinderStepsNames.Processing && (
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
