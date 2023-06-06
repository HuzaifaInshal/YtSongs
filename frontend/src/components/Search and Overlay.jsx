import React, {useState} from 'react'
import SearchContainer from './Search-Container'
import Logo from './Logo'
import { Link } from 'react-router-dom';

const Search = () => {
    
    const [isFirst, setIsFirst] = useState(false)
    const [up,setUp] = useState(false)

    const openOverlay = () =>{
        setUp(true)
    }
  return (
      <>
    <nav>
      <Link to="/home">
      <Logo/>
      </Link>
    </nav>
    <SearchContainer isFirst={isFirst}/>


    <div className="player" style={up ? {"height" : "100%"} : {"height" : "max-content"}}>
    <div className="player2">
        
    </div>
    <div className="player1">
        <div className="up"><button onClick={openOverlay}>Hello</button></div>
    </div>
    </div>
      </>
  )
}

export default Search