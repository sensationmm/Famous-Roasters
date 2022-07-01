import { ApolloProvider } from '@apollo/client'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CartProvider } from 'src/components'
import { famousRoastersClient, i18n, storeFrontClient } from 'src/config'
import { useAuth } from 'src/config/cognito'
import { Auth, Cart, Catalogue, Error, FeaturedProduct, Home, Product, TasteFinder } from 'src/views'

const App = () => {
  const [user] = useAuth()
  console.log('user', user)
  return (
    <ApolloProvider client={storeFrontClient()}>
      <CartProvider>
        <I18nextProvider i18n={i18n}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/catalogue" element={<Catalogue />} />
              <Route path="/product/:id" element={<Product />} />
              <Route
                path="/taste-finder"
                element={
                  <ApolloProvider client={famousRoastersClient()}>
                    <TasteFinder />
                  </ApolloProvider>
                }
              />
              <Route path="/featured/:id" element={<FeaturedProduct />} />
              <Route path="/login" element={<Auth key={'signIn'} />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </BrowserRouter>
        </I18nextProvider>
      </CartProvider>
    </ApolloProvider>
  )
}

export default App
