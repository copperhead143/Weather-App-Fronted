import React from 'react'
import { Header } from './layoutHeader'
import { Footer } from './layoutFooter'

interface LayoutProps {
    children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({children}) => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            <Header />
            <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default Layout