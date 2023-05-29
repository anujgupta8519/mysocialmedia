import React from 'react'
import Avtar from '../Avtar/Avtar'
import './Post.scss'
//import backGroundImage from '../../Assests/image.jpg'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import usetImg from '../../Assests/user.png'
import { likeAndUnlikePost } from '../../redux/slices/PostSlice'
import { useNavigate } from 'react-router-dom'
import { showTost } from '../../redux/slices/appconfigSlice'
import { TOAST_SUCESS } from '../../App'

function Post({ post }) {
   const dispatch = useDispatch();
   const navigate = useNavigate();
    // const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
   async function handlePostLike(){
       dispatch(likeAndUnlikePost({
        postId:post._id
       }))
       dispatch(showTost({
        type:TOAST_SUCESS,
        message:"Like or Unlike"
       }))
    }
    function handleClick(){
        navigate(`/profile/${post.owner?._id}`)
        
      }
    return (
        <div className='Post'>
            <div className="heading" onClick={handleClick}>
                <Avtar  src={post?.owner?.avater?.url ||usetImg}/>
                <h4>{post?.owner?.name}</h4>
            </div>
            <div className="content">
                <img src={post.image.url} alt="" />
            </div>
            <div className="footer">
                <div className="likes" onClick={handlePostLike}>
                  {post.isLiked?<AiFillHeart color='red' className='icon'/>:  <AiOutlineHeart className='icon' />}
                    <h4>{post.likesCount} Likes</h4>
                    </div>
                    <p className='caption'>{post.caption}</p>
                    <h6 className='time-ago'>{post.timeAgo}</h6>
               
            </div>

        </div>
    )
}

export default Post