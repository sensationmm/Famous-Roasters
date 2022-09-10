import { useRefinementList, UseRefinementListProps } from 'react-instantsearch-hooks-web'

import SingleSelect, { SelectItem } from './SingleSelect'

interface FilterProps extends UseRefinementListProps {
  defaultText: string
  big?: boolean
}

const SingleSelectFilter = (props: FilterProps) => {
  const { defaultText, big } = props
  const { items, refine } = useRefinementList({ sortBy: ['name:asc'], ...props })

  const defaultItem = { label: defaultText, value: '', isRefined: false }
  const options = [defaultItem].concat(items.filter((item) => item.value.length > 0))
  const currentItem: SelectItem = options.filter((item) => item.isRefined)[0] || defaultItem

  const handleOnChange = (option: SelectItem) => {
    refine(currentItem.value)
    refine(option.value)
  }

  return (
    <div>
      <SingleSelect items={options} value={currentItem} onChange={handleOnChange} big={big} />
    </div>
  )
}

export default SingleSelectFilter
