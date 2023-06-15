import React from 'react'
import 'animate.css/animate.min.css';
import { useInView } from 'react-intersection-observer';

const Info = () => {
  const [ref, inView] = useInView({
    triggerOnce: false, // Animation triggers more than once
  });
  const [ref2, inView2] = useInView({
    triggerOnce: false, // Animation triggers more than once
  });
  return (
    <>
    <h1 ref={ref} className={`heading animate__animated ${inView ? 'animate__fadeInRight' : ''}`}>Dev</h1>
    <p ref={ref2} className={`para animate__animated ${inView2 ? 'animate__fadeInLeft' : ''}`}>
    This site was developed not for commercial purposes but as an open source personal project. You still may find any bugs, errors or complications in any API.
    </p>
    <p ref={ref2} className={`para animate__animated ${inView2 ? 'animate__fadeInRight' : ''}`}>
      <a style={{"color":"inherit"}} href="https://github.com/HuzaifaInshal/ytmusic.git">Click here to get to the programm github...</a>
    </p>
    <p  ref={ref2} className={`para animate__animated ${inView2 ? 'animate__fadeInLeft' : ''}`}>
      <a href='http://localhost:4000/search?name=' style={{"color":"inherit","textDecoration":"none"}}>API to fetch info for youtube video: specify search in name query</a> 
    </p>
    <p  ref={ref2} className={`para animate__animated ${inView2 ? 'animate__fadeInRight' : ''}`}>
    <a href='http://localhost:4000/search/:id' style={{"color":"inherit","textDecoration":"none"}}>API to get playback audio url for youtube video: specify video id in params /search/</a>
    </p>
    <p  ref={ref2} className={`para animate__animated ${inView2 ? 'animate__fadeInRight' : ''}`}>
    <a href='http://localhost:4000/search/:id?similiar=true' style={{"color":"inherit","textDecoration":"none"}}>API to get playback audio url for youtube video along with similiar type videos for it: specify video id in params /search/</a>
    </p>
    <p  ref={ref2} className={`para animate__animated ${inView2 ? 'animate__fadeInLeft' : ''}`}>
    <a href='http://localhost:4000/download/:id' style={{"color":"inherit","textDecoration":"none"}}>API to download audio from youtube video: specify video id in params /download/</a>
    </p>
    </>

  )
}

export default Info