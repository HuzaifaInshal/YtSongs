import React from 'react'
import 'animate.css/animate.min.css';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: false, // Animation triggers more than once
  });
  const [ref2, inView2] = useInView({
    triggerOnce: false, // Animation triggers more than once
  });
  return (
    <>
    <h1 ref={ref} className={`heading animate__animated ${inView ? 'animate__fadeInUp' : ''}`}>About</h1>
    <p ref={ref2} className={`para animate__animated ${inView2 ? 'animate__fadeInDown' : ''}`}>
      Do you want to download your favourite audio/song from youtube but are fed up with pop ups and ads on other sites.. no problem youmusic is thir to help you. Now you can listen to your favourite audio and download it without any complexity on this web. 
    </p>
    <p ref={ref2} className={`para animate__animated ${inView2 ? 'animate__fadeInDown' : ''}`}>
    If you're looking for a convenient way to download and enjoy audio from YouTube, our website is the perfect solution. With a simple interface and user-friendly features, you can easily convert YouTube videos into high-quality audio files. Whether you want to create a playlist for offline listening or extract audio from your favorite videos, our platform offers a seamless experience. Streamline your music listening with our website and never miss a beat.
    </p>
    </>)
}

export default About