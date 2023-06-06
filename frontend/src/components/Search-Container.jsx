import React from 'react'
import Before from './Before'
import After from './After'

const SearchContainer = (props) => {
    const {isFirst} = props;
  return (
    <div className="searchcontainer">
          <div className="search-holder">
              <form action="">
                  <input type="text" placeholder='Search here' />
                  <button type='submit' className='form-btn'>Search</button>
              </form>
          </div>
          <div className="result-holder">
              {isFirst ? <Before/> : <After/>}
              
          </div>
      </div>
  )
}

export default SearchContainer