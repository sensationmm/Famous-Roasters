import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Cart, Catalogue, Checkout, Error, Home, Product } from 'src/views'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/catalogue" element={<Catalogue />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
