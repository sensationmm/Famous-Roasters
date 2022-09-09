import React from 'react'

const placeholderClasses = 'block bg-coreUI-text-tertiary rounded'
const placeholderTextClasses = 'h-1.5 mr-1.5 mb-3'

export const ProductTileLoaderImage: React.FC = () => (
  <div className="flex justify-center items-center shrink-0 self-center relative w-36 h-36">
    <div className="flex justify-center items-center rounded-full bg-coreUI-background-images w-36 h-36">
      <div className={`${placeholderClasses} w-2/5 h-3/5`} />
    </div>
  </div>
)

export const ProductTileLoader: React.FC = () => {
  return (
    <div className="relative flex pt-8 md:px-6">
      <ProductTileLoaderImage />
      <div className="flex flex-col w-full justify-center pl-4">
        <div className="flex">
          <div className={`${placeholderClasses} ${placeholderTextClasses} w-10`} />
          <div className={`${placeholderClasses} ${placeholderTextClasses} w-14`} />
          <div className={`${placeholderClasses} ${placeholderTextClasses} w-4`} />
        </div>
        <div className={`${placeholderClasses} ${placeholderTextClasses} w-20`} />
        <div className={`${placeholderClasses} ${placeholderTextClasses} w-24`} />
        <div className={`${placeholderClasses} ${placeholderTextClasses} w-12`} />
        <div className="flex">
          <div className={`${placeholderClasses} ${placeholderTextClasses} w-8`} />
          <div className={`${placeholderClasses} ${placeholderTextClasses} w-14`} />
        </div>
      </div>
      <div className="absolute block left-20 w-3 h-full bg-gradient-to-r from-transparent via-white/70 to-transparent animate-swipe" />
    </div>
  )
}
