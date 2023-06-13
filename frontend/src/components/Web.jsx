import React from 'react'
import Main from './Main';
import Search from './Search and Overlay';
import { Route, Routes } from 'react-router-dom';



const Web = () => {
  return (

        <Routes>
          <Route exact path='/' element={<Search/>}/>
          <Route path='/home' element={<Main/>}/>
        </Routes>




  
  )
}

export default Web