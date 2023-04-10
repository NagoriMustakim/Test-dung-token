import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage1 from './Home/Test/Homepage1'
import Main from './Cchess/Main'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage1 />}></Route>
        <Route path='/game' element={<Main />}></Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App