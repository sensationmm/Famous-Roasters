import { ApolloProvider } from '@apollo/client'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CartProvider } from 'src/components'
import { famousRoastersClient, i18n, storeFrontClient } from 'src/config'
import {
  Auth,
  Blog,
  Cart,
  Catalogue,
  Error,
  FeaturedProduct,
  Home,
  Product,
  Profile,
  ProfileSub,
  TasteFinder,
} from 'src/views'

import ScrollToTop from './ScrollToTop'

const App = () => {
  return (
    <ApolloProvider client={storeFrontClient()}>
      <CartProvider>
        <I18nextProvider i18n={i18n}>
          <BrowserRouter>
            <ScrollToTop />
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
              <Route path="/en/coffee-knowledge/:id" element={<Blog />} />
              <Route path="/de/kaffeewissen/:id" element={<Blog />} />

              <Route path="/login" element={<Auth authState={'signIn'} />} />
              <Route path="/register" element={<Auth authState={'signUp'} />} />
              <Route path="/register-confirm" element={<Auth authState={'confirmSignUp'} />} />
              <Route path="/reset-password" element={<Auth authState={'forgotPassword'} />} />
              <Route
                path="/profile"
                element={
                  <ApolloProvider client={famousRoastersClient()}>
                    <Profile />
                  </ApolloProvider>
                }
              />
              <Route path="/profile/:slug" element={<ProfileSub />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </BrowserRouter>
        </I18nextProvider>
      </CartProvider>
    </ApolloProvider>
  )
}

export default App
