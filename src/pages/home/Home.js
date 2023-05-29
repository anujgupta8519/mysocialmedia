import React, { useEffect } from 'react'
import NavBar from '../../components/NavBar/NavBar'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getMyInfo } from '../../redux/slices/appconfigSlice';

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyInfo())
  }, [dispatch])
  return (
    <div>
      <NavBar/>
      <div style={{marginTop:"60px"}}>
      <Outlet/>
      </div>
 
    </div>
  )
}

export default Home