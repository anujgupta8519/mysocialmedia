import React, { useEffect, useState } from 'react'
import Post from '../Post/Post'
import './profile.scss'
//import userImg from '../../Assests/user.png'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../../redux/slices/PostSlice';
import CreatePost from '../createPost/CreatePost';
import { followAndUnfollowUser } from '../../redux/slices/feedSlice';
import { showTost } from '../../redux/slices/appconfigSlice';
import { TOAST_SUCESS } from '../../App';
import UserImg  from '../../Assests/user.png'

function Profile() {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const userProfile = useSelector(satate=>satate.postReducer.userProfile)
  const [isMyProfile,setIsMyProfile] = useState(false);
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
  const feedData = useSelector(state=>state.feedReducer.feedData);
  const [isFollowing,setIsFollowing] = useState();
  // useEffect(()=>{
  //   dispatch(getFeedData())
  // },[])
  useEffect(() => {

   
    dispatch(
        getUserProfile({
            userId: params.userId,
        })
    );
 setIsMyProfile(myProfile._id===params.userId)
 //setIsFollowing(feedData?.following.find(item => item._id === params.userId))
 console.log(isFollowing);
    console.log(userProfile);
    // setIsMyProfile(myProfile?._id === params.userId);
    setIsFollowing(
        feedData?.following?.find((item) => item._id === params.userId)
    );
}, [params.userId,myProfile,feedData]);
function handleuserFollow(){
  dispatch(followAndUnfollowUser({
    userIdToFollow:params.userId,
  })
  
  
  )
  dispatch(showTost({
    type:TOAST_SUCESS,
    message:"Follow UnFollow"
   }))
  // setIsFollowing(feedData?.following?.find(item=>item._id===params.userId))
  // dispatch(
  //   getUserProfile({
  //       userId: params.userId,
  //   })
// );
}
  return (
    <div className='Profile'>
      <div className="container">
        <div className="left-part">
         {isMyProfile&& <CreatePost/>}
          {userProfile?.posts?.map(post=> <Post key={post._id} post={post}/>)}


        </div>
        <div className="right-part">
          <div className="profile-card">
            <img className='user-img' src={userProfile.avater?.url||UserImg} alt="" />
            <h3 className='user-name'>{userProfile.name}</h3>
            <p style={{fontSize:"0.8rem",color:"gray"}}>{userProfile.bio}</p>
            <div className="follower-info">
              <h4>{userProfile.followers?.length||'0'} follower</h4>
              <h4>{userProfile.following?.length||'0'} Followings</h4>
            </div>
            {!isMyProfile && <button className={isFollowing?" btn-primary unfollow-button":" btn-primary follow-button"} onClick={handleuserFollow}>{isFollowing?'UnFollow':'Follow'}</button>}
           {isMyProfile&& <button className='btn-secondry update-button' onClick={()=>{navigate('/updateProfile')}}>Update Profile</button>}
           
          </div>



        </div>
      </div>


    </div>
  )
}

export default Profile