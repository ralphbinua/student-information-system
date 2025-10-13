import React from 'react'
import {Route, Routes} from 'react-router-dom'
import EnrollmentForm from './pages/EnrollmentForm'

const App = () => {
  return (
    <div className="relative h-full w-full">
      <Routes>
        <Route path='/students' element={<EnrollmentForm/>}/>
      </Routes>
    </div>
  )
}

export default App
