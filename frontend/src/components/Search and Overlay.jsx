import React, {useState} from 'react'
import Logo from './Logo'
import { Link } from 'react-router-dom';
import Before from './Before'
import After from './After'

const Search = () => {
    const [up,setUp] = useState(false)
    const [isFirst, setIsFirst] = useState(true)
    const openOverlay = () =>{setUp(true)}
    const closeOverlay = ()=>{setUp(false)}
  return (
      <div className='search-and-overlay'>
    <div className="title-holder">
      <Link to="/home"  style={{"text-decoration":"none"}}>
      <div className="title-logo">
        <img src="./external assets/logo2.png" alt="" className="title2" />
        <h1 className="title">YOUMUSIC</h1>
      </div>
      </Link>
      <div className="form-holder">
        <form action="">
          <input type="text" placeholder='Search here...' />
          <button className="form-btn">Search</button>
        </form>
      </div>
    </div>

    <div className="result-holder">
      {isFirst ? <Before/> : <After/>}     
    </div>

    <div className="overlay" style={up ? {"height" : "100%"} : {"height" : "0%"}}>
    <div className="player2">
      <div className="seca">
        <div className="closer" onClick={closeOverlay}><i class="fa-2x fa-solid fa-arrow-down"></i></div>
        <div className="video-title-controls-holder">
          <div className="mm">
          <div className="video-title-holder">
            <p className="video-description">Currently playing...</p>
            <h1 className="video-title">Song TItle</h1>
          </div>
          <div className="video-controls-holder">
            <button className="controls">Watch on youtube</button>
            <button className="controls">Download Audio</button>
            <button className="controls">Download Video</button>
          </div>
          </div>
        </div>
      </div>
      <div className="secb">
      <div className="similiar-videos-heading-holder">
        <h1 className='similiar-videos-heading'>Similiar results..</h1>
      </div>
      <div className="similiar-videos-holder"></div>
      </div>
        
    </div>
    
    </div>
    <div className="player1">
    
    </div>
    <div className="up" style={up ? {"display":"none"} : {"display":"flex"}} onClick={openOverlay}><i class="fa-2x fa-solid fa-arrow-up"></i></div>
      </div>
  )
}

export default Search