import React from 'react'
import UserImg  from '../../Assests/user.png'
import './avtar.scss'

function Avtar({src}) {
  
  return (
    <div className='Avatr'>

     <img src={src?src:UserImg} alt="userImg" />

    </div>
  )
}

export default Avtar