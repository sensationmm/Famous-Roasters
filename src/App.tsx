import { ApolloProvider } from '@apollo/client'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CartProvider } from 'src/components'
import { i18n, storeFrontClient } from 'src/config'
import {
  About,
  Account,
  Cart,
  Catalogue,
  Checkout,
  Contact,
  Error,
  FeaturedProduct,
  Home,
  OurRoasters,
  Product,
  TasteFinder,
} from 'src/views'

const App = () => {
  return (
    <ApolloProvider client={storeFrontClient()}>
      <CartProvider>
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
              <Route path="/featured/:id" element={<FeaturedProduct />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </BrowserRouter>
        </I18nextProvider>
      </CartProvider>
    </ApolloProvider>
  )
}

export default App
