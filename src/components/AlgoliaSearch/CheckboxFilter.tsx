import { useTranslation } from 'react-i18next'
import { useRefinementList, UseRefinementListProps } from 'react-instantsearch-hooks-web'

import { Checkbox } from '../Checkbox'

const CheckboxFilter = (props: UseRefinementListProps) => {
  const { items, refine } = useRefinementList(props)
  const { t } = useTranslation()
  const { attribute } = props
  const isSelected = items.find((item) => item.value === 'true')?.isRefined || false

  const onToggle = () => {
    refine('true')
  }

  return (
    <Checkbox
      name={attribute}
      text={t(`pages.catalogue.filters.${attribute}`)}
      selected={isSelected}
      disabled={items.length < 2}
      toggleSelected={onToggle}
    />
  )
}

export default CheckboxFilter
