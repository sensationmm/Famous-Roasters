import React from 'react'

interface LoaderProps extends React.HTMLAttributes<HTMLElement> {
  center?: boolean
  isSmall?: boolean
}

const getLoaderClassNames = (isSmall: LoaderProps['isSmall']): string => {
  const classNames: string[] = ['text-brand-grey-mine', 'animate-spin', 'fill-brand-grey-bombay']
  if (isSmall) {
    classNames.push('w-6', 'h-6')
  } else {
    classNames.push('w-12', 'h-12')
  }
  return classNames.join(' ')
}

export const Loader: React.FC<LoaderProps> = ({ center = true, isSmall = false }: LoaderProps) => {
  return (
    <div className={center ? 'flex justify-center' : undefined}>
      <svg
        role="status"
        className={getLoaderClassNames(isSmall)}
        viewBox="0 0 58 58"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M54 29C54 34.2537 52.3449 39.3739 49.2697 43.6335C46.1944 47.8932 41.8554 51.0758 36.8687 52.7294C31.882 54.383 26.5011 54.4236 21.4901 52.8454C16.479 51.2672 12.0925 48.1504 8.95337 43.9376C5.81425 39.7249 4.08209 34.6302 4.00284 29.3771C3.9236 24.124 5.5013 18.9794 8.51192 14.6739C11.5225 10.3683 15.8131 7.12065 20.7742 5.39202C25.7354 3.66339 31.1151 3.54164 36.1494 5.04408"
          stroke="black"
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  )
}
