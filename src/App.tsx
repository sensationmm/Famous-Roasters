import { ApolloProvider } from '@apollo/client'
import React, { useLayoutEffect, useState } from 'react'
import { I18nextProvider } from 'react-i18next'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { CartProvider } from 'src/components'
import { famousRoastersClient, hygraphClient, i18n, storeFrontClient } from 'src/config'
import {
  Auth,
  Blog,
  BlogListByCategory,
  Cart,
  Catalogue,
  CategoryList,
  Error,
  FeaturedProduct,
  Orders,
  Product,
  Profile,
  ProfileSub,
  TasteFinder,
} from 'src/views'

import ScrollToTop from './ScrollToTop'

const App = () => {
  const [isBlog, setIsBlog] = useState(false)
  // const [isLocalhost, setIsLocalhost] = useState(false)

  useLayoutEffect(() => {
    const host = window.location.host
    // setIsLocalhost(host.startsWith('localhost')) // TODO: work out what to do here
    setIsBlog(host.split('.').includes('blog'))
  }, [])

  if (isBlog) {
    return (
      <ApolloProvider client={hygraphClient()}>
        <I18nextProvider i18n={i18n}>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/en/" element={<CategoryList locale="de_en" />} />
              <Route path="/de/" element={<CategoryList locale="de_de" />} />

              <Route path="/en/:category" element={<BlogListByCategory locale="de_en" />} />
              <Route path="/de/:category" element={<BlogListByCategory locale="de_de" />} />

              <Route path="/en/:category/:slug" element={<Blog locale="de_en" />} />
              <Route path="/de/:category/:slug" element={<Blog locale="de_de" />} />

              <Route path="/" element={<Navigate to="/de/" replace />} />
              <Route path="*" element={<Navigate to="/de/" replace />} />
            </Routes>
          </BrowserRouter>
        </I18nextProvider>
      </ApolloProvider>
    )
  }

  return (
    <ApolloProvider client={storeFrontClient()}>
      <CartProvider>
        <I18nextProvider i18n={i18n}>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Catalogue />} />
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
              <Route
                path="/orders"
                element={
                  <ApolloProvider client={famousRoastersClient()}>
                    <Orders />
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
