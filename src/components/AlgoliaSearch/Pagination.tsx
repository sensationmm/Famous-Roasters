import { usePagination, UsePaginationProps } from 'react-instantsearch-hooks-web'

import { Pagination } from '../Pagination'

const MyPagination = (props: UsePaginationProps) => {
  const { currentRefinement, isFirstPage, isLastPage, refine } = usePagination(props)
  return (
    <Pagination
      hasPreviousPage={!isFirstPage}
      hasNextPage={!isLastPage}
      previous={() => refine(currentRefinement - 1)}
      next={() => refine(currentRefinement + 1)}
    />
  )
}

export default MyPagination
