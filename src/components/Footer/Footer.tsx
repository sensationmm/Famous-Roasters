import React from 'react'

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="md:order-1">
          <p className="text-center text-base text-gray-400">
            &copy; {new Date().getFullYear()} Famous Roasters. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
