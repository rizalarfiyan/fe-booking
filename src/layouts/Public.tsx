import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '@components/Footer'
import Header from '@components/Header'

const Layout: React.FC = () => {
  return (
    <div>
      <Header />
      <main className='container min-h-[calc(100dvh_-_306px)]'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export { Layout as default }
