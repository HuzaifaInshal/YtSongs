import React from 'react'
import 'animate.css/animate.min.css';
import { useInView } from 'react-intersection-observer';

const Start = () => {
  const [ref, inView] = useInView({
    triggerOnce: false, // Animation triggers more than once
    threshold: 0.01, // Percentage of element visibility required to trigger animation
  });
  return (
    <>
    <h1 ref={ref} className={`youmusic animate__animated ${inView ? 'animate__fadeInLeft' : ''}`}>YOUMUSIC</h1>
    </>
  )
}

export default Start