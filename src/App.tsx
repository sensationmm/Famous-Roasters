import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Placeholder } from 'src/views'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Placeholder />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
