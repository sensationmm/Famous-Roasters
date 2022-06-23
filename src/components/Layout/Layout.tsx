import React from 'react'
import { Footer, Navigation, NavigationTheme } from 'src/components'

interface LayoutProps {
  navigationTheme?: NavigationTheme
  showFooter?: boolean
  children?: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({
  navigationTheme = NavigationTheme.Shop,
  showFooter = true,
  children,
}: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col text-brand-black">
      <Navigation theme={navigationTheme} />
      {children}
      {showFooter && <Footer />}
    </div>
  )
}
