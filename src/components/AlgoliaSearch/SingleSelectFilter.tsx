import { ChevronDownIcon } from '@heroicons/react/outline'
import { useRefinementList, UseRefinementListProps } from 'react-instantsearch-hooks-web'

interface FilterProps extends UseRefinementListProps {
  defaultText: string
}

const SingleSelectFilter = (props: FilterProps) => {
  const { items, refine } = useRefinementList({ sortBy: ['name:asc'], ...props })
  const { defaultText } = props

  return (
    <span>
      <select
        onChange={(e) => {
          refine(e.target.value)
        }}
        className="nochevron text-xl leading-7 font-semibold border-b-2 minimal pb-2 pr-7"
      >
        <option value="">{defaultText}</option>
        {items.map((item) => (
          <option key={item.value}>{item.value}</option>
        ))}
      </select>
      <ChevronDownIcon className="-ml-5 h-6 w-6 inline" aria-hidden="true" />
    </span>
  )
}

export default SingleSelectFilter
