import React from 'react'
import {Routes,Route} from "react-router-dom"
import Sidebar from '../components/Sidebar'
import Homepage from '../components/Homepage'

export const AllRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/Sidebar' element={<Sidebar/>}/>
      
    </Routes>
  )
}
