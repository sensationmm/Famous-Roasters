import { ChevronDownIcon } from '@heroicons/react/outline'
import { useClearRefinements, useRefinementList, UseRefinementListProps } from 'react-instantsearch-hooks-web'

interface FilterProps extends UseRefinementListProps {
  defaultText: string
}

const SingleSelectFilter = (props: FilterProps) => {
  const { items, refine } = useRefinementList({ sortBy: ['name:asc'], ...props })
  const { refine: clearRefinements } = useClearRefinements()
  const { defaultText } = props

  return (
    <div>
      <select
        onChange={(e) => {
          const value = e.target.value
          clearRefinements()
          value.length && refine(e.target.value)
        }}
        className="nochevron text-xl leading-7 font-semibold border-b-2 minimal pb-2 pr-7 bg-white"
      >
        <option value="">{defaultText}</option>
        {items.map((item) => (
          <option key={item.value} defaultValue={item.value}>
            {item.value}
          </option>
        ))}
      </select>
      <ChevronDownIcon className="-ml-5 -mt-1 h-6 w-6 inline" aria-hidden="true" />
    </div>
  )
}

export default SingleSelectFilter
