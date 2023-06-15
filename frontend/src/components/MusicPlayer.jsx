import React, { useState, useRef } from 'react';
import { useEffect } from 'react';

const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');
  return `${formattedMinutes}:${formattedSeconds}`;
};

const MusicPlayer = ({audioURL}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(100);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  useEffect(()=>{
    setIsPlaying(true)
  },[audioURL])

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const mute = () =>{
    if(audioRef.current.volume === 0){
    audioRef.current.volume = 1;
    setVolume(100);}
    else{
    audioRef.current.volume = 0;
    setVolume(0);
    }
  }

  const handleTimeUpdate = () => {
    const currentTime = audioRef.current.currentTime;
    const duration = audioRef.current.duration;
    const progressPercent = (currentTime / duration) * 100;
    setProgress(progressPercent);
    setCurrentTime(currentTime);
    setDuration(duration);
  };

  const handleProgressBarChange = (e) => {
    const progressValue = e.target.value;
    const duration = audioRef.current.duration;
    const currentTime = (progressValue / 100) * duration;
    audioRef.current.currentTime = currentTime;
    setProgress(progressValue);
    setCurrentTime(currentTime);
  };

  const handleVolumeChange = (e) => {
    const volumeValue = e.target.value;
    audioRef.current.volume = volumeValue / 100;
    setVolume(volumeValue);
  };

  return (
    <>
    {!audioURL ? <div className='empty'>Please search and select a song first to play</div> : 
    <div className='player-holder'>
      <audio
      autoPlay
        ref={audioRef}
        src={audioURL}
        onTimeUpdate={handleTimeUpdate}
      />
      <div className="player-controls">
          <div className="player-controllers-holder">
            {/* <a className="player-controllers">
                <i className="fa-sharp fa-solid fa-backward"></i>
                </a> */}
                
                <a onClick={handlePlayPause} className="player-controllers">
                {isPlaying ? <i className="fa-sharp fa-solid fa-pause"></i> : <i className="fa-sharp fa-solid fa-play"></i>}
                </a>
                {/* <a className="player-controllers">
                <i className="fa-sharp fa-solid fa-forward"></i>
                </a> */}
          </div>
        <div className='jojo'>
          <span className='current-time'>{formatTime(currentTime)}</span> 
        <input
          type="range"
          className='duration'
          min={0}
          max={100}
          value={progress}
          onChange={handleProgressBarChange}
        />
        <span className='current-time'>{formatTime(duration)}</span>
        </div>
        <a onClick={mute} className="player-controllers">{volume>20 ? <i className="fa-sharp fa-solid fa-volume-up"></i> : <i className="fa-sharp fa-solid fa-volume-down"></i>}</a>
        <input
          type="range"
          className='volume'
          min={0}
          max={100}
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>
    </div>
    }
    </>
  );
};

export default MusicPlayer;
