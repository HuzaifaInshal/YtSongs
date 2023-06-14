import React, { useState, useEffect } from 'react'
import 'animate.css/animate.min.css';
import { useInView } from 'react-intersection-observer';

const Start = () => {
  const [screenSize, setScreenSize] = useState(getCurrentDimension());
  const [stated,setState]=useState(1)

  function getCurrentDimension(){
    return {
        width: window.innerWidth,
        height: window.innerHeight
    }
  }

  useEffect(() => {
      const updateDimension = () => {
          setScreenSize(getCurrentDimension())
          if(screenSize.width >= 600){
            setState(0.01)
          }else{
            setState(1)
          }
      }
      window.addEventListener('resize', updateDimension);
  
  
      return(() => {
          window.removeEventListener('resize', updateDimension);
      })
  }, [screenSize])



  const [ref, inView] = useInView({
    triggerOnce: false, // Animation triggers more than once
    // threshold: (screenSize.width >= 600 ? 0.01 : 1), // Percentage of element visibility required to trigger animation
    threshold:stated,
  });
  return (
    <>
    <h1 ref={ref} className={`youmusic animate__animated ${inView ? 'animate__fadeInLeft' : ''}`}>YOUMUSIC</h1>
    </>
  )
}

export default Start