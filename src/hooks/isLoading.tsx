import { createContext } from 'react'

export type LoadingContextType = {
  isLoading: boolean
  setIsLoading: (state: boolean) => void
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
/* @ts-ignore-next */
const LoadingContext = createContext<LoadingContextType>(false)

export default LoadingContext
