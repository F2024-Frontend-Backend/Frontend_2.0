import { Route, BrowserRouter, Routes } from 'react-router-dom'
import { CheckoutProvider } from './context/CheckoutProvider'
import BasketPage from './pages/BasketPage/BasketPage'
import CheckoutPage from './pages/CheckoutPage/CheckoutPage'
function App() {

  return (
    <CheckoutProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BasketPage/>} />
          <Route path="/checkout/*" element={<CheckoutPage />} />
          <Route path="/receipt" element={<h1>Receipt</h1>} />
        </Routes>
      </BrowserRouter>
    </CheckoutProvider>
  )
}

export default App
