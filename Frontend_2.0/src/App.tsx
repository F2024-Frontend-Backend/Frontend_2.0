import { Route, BrowserRouter, Routes } from 'react-router-dom'
import { CheckoutProvider } from './context/CheckoutProvider'
import { BasketProvider } from './context/BasketProvider'
import BasketPage from './pages/BasketPage/BasketPage'
import CheckoutPage from './pages/CheckoutPage/CheckoutPage'
import { createContext, useEffect, useState } from 'react'
import { initSession } from './api/axios'
import { OrderResponseProvider } from './context/OrderResponseProvider'
import Receipt from './pages/CheckoutPage/components/Receipt'

export const SessionContext = createContext(false)


function App() {
  console.log("App component rendered")
  const [session, setSession] = useState(false)

  useEffect(() => {
    const initializeSession = async () => {
      try {
        await initSession()
        setSession(true)
      } catch (error) {
        console.error("Failed to initialize session", error)
        setSession(false)
      }
    }
    initializeSession()
  }
    , [])

  return (
    <SessionContext.Provider value={session}>
      <BasketProvider>
        <CheckoutProvider>
          <OrderResponseProvider>
            <BrowserRouter>
              <Routes>
              <Route path="/" element={<BasketPage />} />
              <Route path="/checkout/*" element={<CheckoutPage />} />
              <Route path="/receipt" element={<Receipt />} />
               
              </Routes>
            </BrowserRouter>
          </OrderResponseProvider>
        </CheckoutProvider>
      </BasketProvider>
    </SessionContext.Provider>
  )
}

export default App
