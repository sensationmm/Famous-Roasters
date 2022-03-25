import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {
  About,
  Account,
  Cart,
  Catalogue,
  Checkout,
  Contact,
  Error,
  Home,
  OurRoasters,
  Product,
  TasteFinder,
} from 'src/views'

import { i18n } from './config'

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/account" element={<Account />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/our-roasters" element={<OurRoasters />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/taste-finder" element={<TasteFinder />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </I18nextProvider>
  )
}

export default App
