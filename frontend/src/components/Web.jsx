import React from 'react'
import Main from './Main';
import Search from './Search and Overlay';
import { Route, Routes } from 'react-router-dom';
import Test from './Test';



const Web = () => {
  return (

        <Routes>
          {/* <Route exact path='/' element={<Search/>}/> */}
          {/* <Route path='/home' element={<Main/>}/> */}
          <Route path='/' element={<Test/>}/>
        </Routes>




  
  )
}

export default Web