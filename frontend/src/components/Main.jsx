import React from 'react'
import { useState,useEffect } from 'react';
import image1 from '../background images/1.jpeg';
import image2 from '../background images/2.jpeg';
import image3 from '../background images/3.jpeg';
import image4 from '../background images/4.jpeg';
import image5 from '../background images/5.jpeg';
import image6 from '../background images/6.jpeg';
import Start from './Start';
import About from './About';
import Info from './Info';
import Logo from './Logo';


const Main = () => {
  const [backgroundImage, setBackgroundImage] = useState(image1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [count, setCount] = useState(5);

  const imageUrls = [
    image2,image3,image4,image5,image6
  ];
        const [activeSection, setActiveSection] = useState('');
      
        useEffect(() => {
          const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const sections = document.querySelectorAll('section');
      
            sections.forEach((section) => {
              const sectionTop = section.offsetTop;
              const sectionHeight = section.offsetHeight;
      
              if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                setActiveSection(section.id);
              }
            });
          };
          window.addEventListener('scroll', handleScroll);
          return () => {
            window.removeEventListener('scroll', handleScroll);
          };
        }, []);

        useEffect(() => {
          const timer = setInterval(() => {
            setCount((prevCount) => {
              if (prevCount === 0) {
                return 5;
              } else {
                return prevCount - 1;
              }
            });
          }, 1000);
      
          return () => {
            clearInterval(timer);
          };
        }, []);

        // useEffect(()=>{
        //   if(count===0){
        //     setBackgroundImage(imageUrls[currentIndex])
        //     setCurrentIndex(currentIndex + 1)
        //     if(currentIndex===4){
        //       setCurrentIndex(0)
        //     }
        //   }
        //   // eslint-disable-next-line
        // },[count])
        

  return (
      <div className='container' style={{ backgroundImage: `url(${backgroundImage})` }}>
      
    <nav>
      <a href="#start">
      <Logo></Logo>
      </a>
      <ul>
        <li className={activeSection === 'start' ? 'active' : ''} style={activeSection === 'start' ? { '--colora': 'red' } : { '--colora': 'yellow' }}>
          <a href="#start">Start</a>
        </li>
        <li className={activeSection === 'about' ? 'active' : ''} style={activeSection === 'about' ? { '--colora': 'blue' } : { '--colora': 'yellow' }}>
          <a href="#about">About</a>
        </li>
        <li className={activeSection === 'info' ? 'active' : ''} style={activeSection === 'info' ? { '--colora': 'yello' } : { '--colora': 'yellow' }}>
          <a href="#info">Info</a>
        </li>
        <li>
            <button className='btn-begin'>Lets Begin</button>
        </li>
      </ul>
    </nav>
    <div className="holder">
    <div className="holder2">
    <section id='start'><Start/></section>
    <section id='about'><About/></section>
    <section id='info'><Info/></section>
    </div>
    </div>
    <div className="counter-holder">
    <p className='counter'>{count}</p>
    </div>
    </div>
  )
}

export default Main