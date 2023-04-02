import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage1 from './Home/Test/Homepage1'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage1 />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App