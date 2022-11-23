import { ApolloProvider } from '@apollo/client'
import * as Sentry from '@sentry/react'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { I18nextProvider } from 'react-i18next'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { CartProvider, Loader } from 'src/components'
import { famousRoastersClient, hygraphClient, i18n, storeFrontClient } from 'src/config'
import {
  Account,
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
  TasteFinder,
} from 'src/views'

import LoadingContext from './hooks/isLoading'
import ScrollToTop from './ScrollToTop'

const App = () => {
  const [isBlog, setIsBlog] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useLayoutEffect(() => {
    const host = window.location.host
    setIsBlog(host.split('.').includes('blog'))
  }, [])

  useEffect(() => {
    document.body.style.overflow = isLoading ? 'hidden' : 'auto'
  }, [isLoading])

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
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
          <I18nextProvider i18n={i18n}>
            <BrowserRouter>
              <ScrollToTop />
              {isLoading && (
                <div className="fixed flex justify-center items-center top-0 left-0 w-screen h-screen bg-brand-grey-whisper/60 z-[1000]">
                  <Loader />
                </div>
              )}
              <Routes>
                <Route path="/" element={<Catalogue />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/catalogue" element={<Catalogue />} />
                <Route path="/catalogue/:productType" element={<Catalogue />} />
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
                <Route path="/account" element={<Account />} />
                <Route path="*" element={<Error />} />
              </Routes>
            </BrowserRouter>
          </I18nextProvider>
        </LoadingContext.Provider>
      </CartProvider>
    </ApolloProvider>
  )
}

export default Sentry.withProfiler(App)
