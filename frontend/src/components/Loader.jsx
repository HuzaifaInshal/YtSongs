import React from 'react'

const Loader = ({text}) => {
  return (
    <div className="loader">
        <img src="./external assets/loader.gif" alt="" className='loader-loader'/>
        <p className="loader-text">{text}</p>
    </div>
  )
}

export default Loader