import React from 'react'
import Main from './Main';
import Search from './Search and Overlay';
import Loader from './Loader';

const Web = () => {
  return (
    <Router>
        <Routes>
          <Route exact path='/' element={<Search/>}/>
          <Route path='/home' element={<Main/>}/>
        </Routes>
      </Router>
  )
}

export default Web