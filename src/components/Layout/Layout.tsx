import React from 'react'

interface LayoutProps {
  children?: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
  return <div className="min-h-screen flex flex-col">{children}</div>
}
