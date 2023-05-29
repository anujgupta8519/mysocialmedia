import React from 'react'
import './navbar.scss'
import Avtar from '../Avtar/Avtar'
import {useNavigate} from 'react-router-dom'
import { AiOutlineLogout } from 'react-icons/ai';
import {  useSelector } from 'react-redux';
//import { setLoading } from '../../redux/slices/appconfigSlice';
import { KEY_ACCESS_TOKEN, removeItem } from '../../utils/localStroageManeger';
import { axiosClient } from '../../utils/axiosClient';


function NavBar() {

//const dispatch = useDispatch();
  const navigate = useNavigate();
  const myProfile = useSelector(state =>state.appConfigReducer.myProfile)
  async function handleLogOutClick(){
// dispatch(setLoading(true))
try {
  await axiosClient.post('/auth/logout');
removeItem(KEY_ACCESS_TOKEN)
navigate('/login');
  
} catch (error) {
  return new Promise(error);
}


  }
  return (
    <div className='NavBar'>
      
<div className="container">
  <h2 className="banner hover-link" onClick={()=>navigate('/')}>Social Media</h2>
    <div className="right-side">
      <div className="prifile hover-link"onClick={()=>navigate(`/profile/${myProfile?._id}`)}>
        <Avtar   src={myProfile?.avater?.url} />
      
      </div>
      <div className="log-out hover-link" onClick={handleLogOutClick}>
        <AiOutlineLogout/>

      </div>
    </div>

</div>


    </div>
  )
}

export default NavBar