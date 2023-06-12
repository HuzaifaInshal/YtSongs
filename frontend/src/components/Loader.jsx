import React from 'react'

const Loader = ({text, height, width}) => {
  return (
    <div className="loader" style={{"height":height,"width":width}}>
        <img src="./external assets/loader.gif" alt="" className='loader-loader'/>
        <p className="loader-text">{text}</p>
    </div>
  )
}

export default Loader