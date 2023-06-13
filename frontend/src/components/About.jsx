import React from 'react'
import 'animate.css/animate.min.css';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true, // Animation triggers more than once
    threshold: 0.01, // Percentage of element visibility required to trigger animation
  });
  const [ref2, inView2] = useInView({
    triggerOnce: true, // Animation triggers more than once
    threshold: 0.01, // Percentage of element visibility required to trigger animation
  });
  return (
    <>
    <h1 ref={ref} className={`heading animate__animated ${inView ? 'animate__fadeInUp' : ''}`}>About</h1>
    <p ref={ref2} className={`para animate__animated ${inView2 ? 'animate__fadeInDown' : ''}`}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus commodi, maxime doloremque officiis dicta minus? Sapiente asperiores voluptatibus quae? Iure eum modi deleniti nihil sed fugiat, quod nesciunt dolor. Atque quidem odit voluptatem maiores sunt assumenda, ipsa nulla ab consequuntur quae inventore voluptatum? Tempore veniam quaerat recusandae perferendis consequatur reiciendis?</p>
    </>)
}

export default About