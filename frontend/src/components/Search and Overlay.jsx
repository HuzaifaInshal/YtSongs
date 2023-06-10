import React, {useState} from 'react'
import Logo from './Logo'
import { Link } from 'react-router-dom';
import Before from './Before'
import After from './After'
import MusicPlayer from './MusicPlayer';

const Search = () => {
    const [up,setUp] = useState(false)
    const [isFirst, setIsFirst] = useState(true)
    const openOverlay = () =>{setUp(true)}
    const closeOverlay = ()=>{setUp(false)}
    const [inputValue, setInputValue] = useState('');
    const [dataJSON, setData] = useState([]);
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/search?name=${inputValue}`);
        const jsonData = await response.json();
        setData(jsonData);
        console.log(jsonData);
        console.log(inputValue);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    const handleInputChange = (e) => {
      setInputValue(e.target.value);
    };
    const handleSubmit = (e) => {
      e.preventDefault(); 
       fetchData();
       setIsFirst(false);
    };
  return (
      <div className='search-and-overlay'>
    <div className="title-holder">
      <Link to="/home"  style={{"textDecoration":"none"}}>
      <div className="title-logo">
        <img src="./external assets/logo2.png" alt="" className="title2" />
        <h1 className="title">YOUMUSIC</h1>
      </div>
      </Link>
      <div className="form-holder">
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder='Search here...' value={inputValue} onChange={handleInputChange} />
          <button type='submit' className="form-btn">Search</button>
        </form>
      </div>
    </div>

    <div className="result-holder">
      {isFirst ? <Before/> : dataJSON.map((video)=>(
              <div key={video.videoId}>
                <h2>{video.title}</h2>
                <img src={video.thumbnail} alt={video.title} />
              </div>
      ))}     
    </div>

    <div className="overlay" style={up ? {"height" : "100%"} : {"height" : "0%"}}>
    <div className="player2">
      <div className="seca">
        <div className="closer" onClick={closeOverlay}><i className="fa-2x fa-solid fa-arrow-down"></i></div>
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
      <MusicPlayer audioURL=""/>
    </div>
    <div className="up" style={up ? {"display":"none"} : {"display":"flex"}} onClick={openOverlay}><i className="fa-2x fa-solid fa-arrow-up"></i></div>
      </div>
  )
}

export default Search