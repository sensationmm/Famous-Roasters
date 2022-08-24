import { useTranslation } from 'react-i18next'
import { useInstantSearch } from 'react-instantsearch-hooks-web'

const Stats: React.FC = () => {
  const search = useInstantSearch()
  const { t } = useTranslation()

  const nbHits = search?.results?.nbHits

  return nbHits ? (
    <div
      className="mt-4"
      dangerouslySetInnerHTML={{
        __html: t('pages.catalogue.search.stats', { nbHits, interpolation: { escapeValue: false } }),
      }}
    />
  ) : null
}

export default Stats
