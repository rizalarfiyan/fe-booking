import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '@components/Footer'
import HeaderPublic from '@components/Header/Public'

const Layout: React.FC = () => {
  return (
    <div>
      <HeaderPublic />
      <main className='container min-h-[calc(100dvh_-_306px)]'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export { Layout as default }
