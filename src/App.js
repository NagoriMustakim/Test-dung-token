import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Test from './Component/Test'
import Homepage1 from './Home/Test/Homepage1'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Test />}></Route>
        <Route path='/home/test/homepage1.html' element={<Homepage1 />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App