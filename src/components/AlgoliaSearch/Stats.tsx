import { useTranslation } from 'react-i18next'
import { useInstantSearch } from 'react-instantsearch-hooks-web'

const Stats: React.FC = () => {
  const search = useInstantSearch()
  const { t } = useTranslation()

  const count = search?.results?.nbHits

  return typeof count !== 'undefined' ? (
    <div
      className={`mt-4${count === 0 ? ' text-coreUI-text-tertiary' : ''}`}
      dangerouslySetInnerHTML={{
        __html: t(count > 0 ? 'pages.catalogue.search.stats' : 'pages.catalogue.noResults.stats', {
          count,
          interpolation: { escapeValue: false },
        }),
      }}
    />
  ) : null
}

export default Stats
