import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import Before from './Before'
import MusicPlayer from './MusicPlayer';
import Loader from './Loader'
import { useEffect } from 'react';
import {downloadFile} from './DownloadFunc'




const Search = () => {
  const [loadingText,setLoadingText]=useState('loading..')
    const [up,setUp] = useState(false)
    const [isFirst, setIsFirst] = useState(true)
    const openOverlay = () =>{setUp(true)}
    const closeOverlay = ()=>{setUp(false)}
    const [inputValue, setInputValue] = useState('');
    const [dataJSON, setData] = useState([]);
    const [loading, setLoading] =useState(false);
    const [myArray, setMyArray] = useState([]);
    const [img,setImg]=useState('');
    const [preURL,setPreURL] = useState();
    const [URL,setURL]=useState();
    const [musicTitle,setMusicTitle]= useState();
    const [id,setId] = useState();
    const [box,setBox]=useState(false);

 

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:4000/search?name=${inputValue}`);
        const jsonData = await response.json();
        setData(jsonData.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setLoading(false);
    };
    const handleInputChange = (e) => {
      setInputValue(e.target.value);
    };
    const handleSubmit = (e) => {
      e.preventDefault(); 
       fetchData();
       setIsFirst(false);
    };

    const fetchURLPlay =async (videoId,title,thumbnail)=>{
      setImg(thumbnail)
      setId(videoId)
      setMusicTitle(title)
      setLoading(true);
      const foundItem = myArray.find((item) => item.videoId === videoId);
      if(foundItem){
        setPreURL(foundItem.url)
      }else{
        try {
          const response = await fetch(`http://localhost:4000/search/${videoId}`);
          const jsonData = await response.json();
          setMyArray([...myArray,{videoId:videoId,url:jsonData.audioURL}])   
          setPreURL(jsonData.audioURL)     
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
      setLoading(false);
    };


    const handleDownload = (videoId,title)=>{
      setBox(true);
      downloadFile(videoId,title) 

    }

    const handlePlay = (videoId,title,thumbnail) =>{
      fetchURLPlay(videoId,title,thumbnail);
    };


    useEffect(()=>{
      if(preURL){
        setURL(preURL);
        setUp(true)
      }
    },[preURL])

    const cross = ()=>{
      setBox(false)
    }
    

  return (
    <>
    {!box ? '': <div className='box' style={{"height":"70vh","width":"70vw"}}>
      <a className="boxx" onClick={cross}><i className='fa-solid fa-xmark'></i></a>
    <p className="loader-text">Your file is in process download will be started soon..</p>
      </div>}

    {loading ? <Loader text={loadingText} height="70vh" width="70vw"/> : ''}
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
              
              <div key={video.videoId} className="result-holder-div">
                <img src={video.thumbnail} alt={video.title} className="result-holder-image"/>
                <h4 className='result-holder-h4'>{video.title}</h4>
                <div className="result-holder-button-box">
                  <button className="play_button" style={{"width":"100px"}} onClick={() => handlePlay(video.videoId,video.title,video.thumbnail)}>PLAY</button>
                  <button className="play_button" onClick={() => handleDownload(video.videoId,video.title)}><i className="fa-sharp fa-solid fa-download"></i></button>
                </div>
              </div>
      ))}     
    </div>

    <div className="overlay" style={up ? {"height" : "100%"} : {"height" : "0%"}}>
    <div className="player2" style={{"backgroundImage":`url(${img})`}}>
      <div className="seca">
        <div className="closer" onClick={closeOverlay}><i className="fa-2x fa-solid fa-arrow-down"></i></div>
        <div className="video-title-controls-holder">
          <div className="mm">
          <div className="video-title-holder">
            <p className="video-description">Currently playing...</p>
            <h1 className="video-title">{musicTitle}</h1>
          </div>
          <div className="video-controls-holder">
          <a href={`https://www.youtube.com/watch?v=${id}`} rel="noreferrer"target="_blank" style={{"textDecoration":"none"}}><button className="controls">Watch on youtube</button></a>
          <button className="controls" onClick={() => handleDownload(id,musicTitle)}>Download Audio</button>
          <a href={`https://www.ssyoutube.com/watch?v=${id}`} rel="noreferrer" target="_blank" style={{"textDecoration":"none"}}><button className="controls">Download Video</button></a>
          </div>
          </div>
        </div>
      </div>
      {/* <div className="secb">
      <div className="similiar-videos-heading-holder">
        <h1 className='similiar-videos-heading'>Next in Queue..</h1>
      </div>
      <div className="similiar-videos-holder">
        {filteredArray.map((single)=>(
          <div key={single.videoId} className="singleBox">
            <img src={single.thumbnail} alt="" className="singleImg" />
            <h4 className='result-holder-h4'>{single.title}</h4>
            <button className="play_button" style={{"width":"100px"}} onClick={() => handleFromQ(single.videoId,single.title,single.thumbnail)}>PLAY</button>
          </div>
        ))}
      </div>
      </div> */}
    </div>
    </div>

    <div className="player1">
      <MusicPlayer audioURL={URL}/>
    </div>
     {!URL ? '' :<div className="up" style={up ? {"display":"none"} : {"display":"flex"}} onClick={openOverlay}><i className="fa-2x fa-solid fa-arrow-up"></i></div>
}      
      </div>
      </>
  )
}

export default Search