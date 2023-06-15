import React from 'react'
import 'animate.css/animate.min.css';
import { useInView } from 'react-intersection-observer';


const Start = () => {
  const [ref, inView] = useInView({
    triggerOnce: false, // Animation triggers more than once,
  });

  return (
    <>
    <h1 ref={ref} className={`youmusic ${inView ? 'animate__animated animate__fadeInLeft ' : ''}`}>YOUMUSIC</h1>
    </>
  )
}

export default Start