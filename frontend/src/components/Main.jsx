import React from 'react'
import { useState,useEffect,useRef } from 'react';
import image1 from '../background images/1.jpg';
import image3 from '../background images/3.jpg';
import image4 from '../background images/4.jpg';
import image5 from '../background images/5.jpg';
// import image6 from '../background images/6.jpg';
import image7 from '../background images/7.jpg';
import image8 from '../background images/8.jpg';
// import image9 from '../background images/9.jpg';
import image10 from '../background images/10.jpg';
import image11 from '../background images/11.jpg';
import image12 from '../background images/12.jpg';
import image13 from '../background images/13.jpg';
import image14 from '../background images/14.jpg';
// import image15 from '../background images/15.jpg';
import Start from './Start';
import About from './About';
import Info from './Info';
import Logo from './Logo';
import { Link } from 'react-router-dom';



const Main = () => {
  const time = 3 //by setting time to less value the background changes more smoothly as compared to long values where it changes with white background
  const [backgroundImage, setBackgroundImage] = useState(image1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [count, setCount] = useState(time);

  const imageUrls = [
    image3,image4,image5,image7,image8,image10,image11,image12,image13,image14
  ];

  //which is displayed
  const headingRefs = [
    useRef(null),
    useRef(null),
    useRef(null)
  ];

  const [visibleHeadingIndex, setVisibleHeadingIndex] = useState(null);

  useEffect(() => {
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const headingIndex = parseInt(entry.target.dataset.index);
          setVisibleHeadingIndex(headingIndex);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    const observers = headingRefs.map((ref, index) => {
      const observer = new IntersectionObserver(handleIntersection, observerOptions);
      observer.observe(ref.current);
      return observer;
    });

    return () => {
      observers.forEach((observer) => {
        observer.disconnect();
      });
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const resetVisibleHeading = () => {
      setVisibleHeadingIndex(null);
    };

    window.addEventListener('beforeunload', resetVisibleHeading);

    return () => {
      window.removeEventListener('beforeunload', resetVisibleHeading);
    };
  }, []);

  //timer
        useEffect(() => {
          const timer = setInterval(() => {
            setCount((prevCount) => {
              if (prevCount === 0) {
                return time;
              } else {
                return prevCount - 1;
              }
            });
          }, 1000);
      
          return () => {
            clearInterval(timer);
          };
        }, []);

//changing background
        useEffect(()=>{
          if(count===0){
            setBackgroundImage(imageUrls[currentIndex])
            setCurrentIndex(currentIndex + 1)
            if(currentIndex===9){
              setCurrentIndex(0)
            }
          }
          // eslint-disable-next-line
        },[count])

//changing css root
        useEffect(()=>{
          if(visibleHeadingIndex === 1){document.documentElement.style.setProperty('--colora', 'blue');}
          else if(visibleHeadingIndex === 2){document.documentElement.style.setProperty('--colora', 'yellow');}
          else{document.documentElement.style.setProperty('--colora', 'red');}
        },[visibleHeadingIndex])
        

  return (
      <div className='container' style={{ backgroundImage: `url(${backgroundImage})` }}>
      
    <nav>
      <a href="#start">
      <Logo></Logo>
      </a>
      <ul>

        <li className={`test ${visibleHeadingIndex === 0 ? 'active' : ''}`} >
          <a href="#start">Start</a>
        </li>
        <li className={`test ${visibleHeadingIndex === 1 ? 'active' : ''}`} >
          <a href="#about">About</a>
        </li>
        <li className={`test ${visibleHeadingIndex === 2 ? 'active' : ''}`} >
          <a href="#info">Info</a>
        </li>
        <li>
          <Link to="/">
            <button className='btn-begin'>Lets Begin</button></Link>
        </li>
      </ul>
    </nav>

    <div className="holder">
    <div className="holder2">
    <section ref={headingRefs[0]} data-index={0} id='start'><Start/></section>
    <section ref={headingRefs[1]} data-index={1} id='about'><About/></section>
    <section ref={headingRefs[2]} data-index={2} id='info'><Info/></section>
    </div>
    </div>

    <div className="counter-holder">
    <p className='counter'>{count}</p>
    </div>
    {/* <p className='counter1'>Currently visible heading: {visibleHeadingIndex !== null ? `Heading ${visibleHeadingIndex + 1}` : 'None'}</p> */}
    </div>
  )
}

export default Main