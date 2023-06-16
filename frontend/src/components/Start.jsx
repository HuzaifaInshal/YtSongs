import React,{useState,useEffect} from 'react'
import 'animate.css/animate.min.css';
import { useInView } from 'react-intersection-observer';


const Start = () => {
  const [ref, inView] = useInView({
    triggerOnce: false, // Animation triggers more than once,
  });

  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <>
    <h1 ref={ref} className={`youmusic ${windowSize > 600 ? `${inView ? 'animate__animated animate__fadeInLeft' : ''}` : ''}`}>YOUMUSIC</h1>
    </>
  )
}

export default Start