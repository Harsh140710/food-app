import React from 'react'
import AppRoutes from './routes/AppRoutes'
import { Toaster } from 'sonner';

const App = () => {
  return (
    <>
      <Toaster position="bottom-center" richColors />
      <AppRoutes />
    </>
  )
}

export default App