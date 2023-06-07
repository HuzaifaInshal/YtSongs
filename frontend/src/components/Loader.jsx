import React from 'react'

const Loader = ({text, height}) => {
  return (
    <div className="loader" style={{"height":`${height}`}}>
        <img src="./external assets/loader.gif" alt="" className='loader-loader'/>
        <p className="loader-text">{text}</p>
    </div>
  )
}

export default Loader