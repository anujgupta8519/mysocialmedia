import React, { useEffect, useState } from 'react'
import Avtar from '../Avtar/Avtar'
import './follower.scss'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { followAndUnfollowUser } from '../../redux/slices/feedSlice';
import { showTost } from '../../redux/slices/appconfigSlice';
import { TOAST_SUCESS } from '../../App';


function Follower({user}) {
  const navigate = useNavigate();
       const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
       const dispatch = useDispatch();
       const feedData = useSelector(state=>state.feedReducer.feedData);
      //  const isMyProfile = myProfile._id !==user._id
      const [isFollowing,setIsFollowing] = useState();
      const [isMyProfile,setIsMyProfile] = useState();

      useEffect(()=>{
        setIsFollowing(feedData.following.find(item=>item._id===user._id))
        setIsMyProfile(myProfile._id !==user._id)

      },[feedData])
  function handleClick(){
    navigate(`/profile/${user?._id}`)
    
  }
  function handleuserFollow(){
    dispatch(followAndUnfollowUser({
      userIdToFollow:user._id
    }))
    dispatch(showTost({
      type:TOAST_SUCESS,
      message:"Follow UnFollow"
     }))
  }
  return (
    <>
     {isMyProfile&&<div className='follower'>
        <div className="user-info" style={{cursor:"pointer"}} onClick={handleClick}>
        <Avtar src={user.avater?.url}/>
        <h4 className='name'>{user?.name}</h4>
        </div>
        
        <h4 onClick={handleuserFollow} className={isFollowing?'hover-link follow-link':'btn-primary'}>{isFollowing?'UnFollow':'Follow'}</h4>


    </div>}
    </>
  )
}

export default Follower