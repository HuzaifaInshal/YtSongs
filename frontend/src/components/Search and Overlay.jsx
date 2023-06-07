import React, {useState} from 'react'
import SearchContainer from './Search-Container'
import Logo from './Logo'
import { Link } from 'react-router-dom';
import Before from './Before'
import After from './After'

const Search = () => {
    const [up,setUp] = useState(false)
    const [isFirst, setIsFirst] = useState(false)
    const openOverlay = () =>{
        setUp(true)
    }
  return (
      <>
      <nav>
      <Link to="/home">
      <Logo/>
      </Link>
      <div className="searchcontainer">
          <div className="search-holder">
              <form action="">
                  <input type="text" placeholder='Search here' />
                  <button type='submit' className='form-btn'>Search</button>
              </form>
          </div>
      </div>
    </nav>
    <div className="result-holder">
      {isFirst ? <Before/> : <After/>}     
    </div>

    <div className="overlay" style={up ? {"height" : "100%"} : {"height" : "0%"}}>
    <div className="player2">
        
    </div>
    <div className="player1">
    <a onClick={openOverlay}><div className="up">H</div></a>
    </div>
    </div>
      </>
  )
}

export default Search