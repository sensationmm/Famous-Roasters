import React from 'react'
import { Footer, Navigation, NavigationTheme } from 'src/components'

interface LayoutProps {
  navigationTheme?: NavigationTheme
  children?: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ navigationTheme = NavigationTheme.Shop, children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation theme={navigationTheme} />
      {children}
      <Footer />
    </div>
  )
}
