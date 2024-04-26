// import React from 'react'
import { AddTransaction, Dashboard, Reports, Transactions } from './_root/pages'
import RootLayout from './_root/RootLayout'
import { Toaster } from 'react-hot-toast'
import './globals.css'
import { Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <main className='flex h-screen bg-bg-right'>
      <Routes>
        <Route element={<RootLayout />}>
          {/* <Route path="/" element={<Dashboard />} /> */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="addTransaction" element={<AddTransaction />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="reports" element={<Reports />} />
        </Route>
      </Routes>
      <Toaster position="bottom-right"/>
    </main>
  )
}

export default App
