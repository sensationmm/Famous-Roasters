import React from 'react'
import { Footer, Navigation } from 'src/components'

interface LayoutProps {
  children?: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      {children}
      <Footer />
    </div>
  )
}
