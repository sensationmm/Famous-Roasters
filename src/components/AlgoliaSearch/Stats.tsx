import { useTranslation } from 'react-i18next'
import { useInstantSearch } from 'react-instantsearch-hooks-web'

const Stats: React.FC = () => {
  const search = useInstantSearch()
  const { t } = useTranslation()

  const {
    results: { nbHits },
  } = search
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: t('pages.catalogue.search.stats', { nbHits, interpolation: { escapeValue: false } }),
      }}
    />
  )
}

export default Stats
