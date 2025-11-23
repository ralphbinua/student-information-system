import React from 'react'
import {Route, Routes} from 'react-router-dom'
import EnrollmentForm from './pages/EnrollmentForm'
import HomePage from './pages/HomePage'

const App = () => {
  return (
    <div className="relative h-full w-full">
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/students' element={<EnrollmentForm/>}/>
      </Routes>
    </div>
  )
}

export default App