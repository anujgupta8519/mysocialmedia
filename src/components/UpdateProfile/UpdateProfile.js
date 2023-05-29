import React, { useEffect, useState } from 'react'
import './updateProfile.scss'
import usetImg from '../../Assests/user.png'
import { useSelector,useDispatch } from 'react-redux'
import {  showTost, updateMyProfile } from '../../redux/slices/appconfigSlice'
import { TOAST_SUCESS } from '../../App'
import { axiosClient } from '../../utils/axiosClient'
import { KEY_ACCESS_TOKEN, removeItem } from '../../utils/localStroageManeger'
import { useNavigate } from 'react-router-dom'

function UpdateProfile() {
    const navigate = useNavigate();
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [userImg, setUserImg] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
      setName(myProfile?.name || '');
      setBio(myProfile?.bio || '');
      setUserImg(myProfile?.avater?.url)
  }, [myProfile]);

  function handleImageChange(e) {
      const file = e.target.files[0];
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
          if(fileReader.readyState === fileReader.DONE) {
              setUserImg(fileReader.result)
              console.log('img data', fileReader.result);
          }
      }
  }

  function handleSubmit(e) {
      e.preventDefault();
      dispatch(updateMyProfile({
          name,
          bio,
          userImg
      }));
      dispatch(showTost({
        type:TOAST_SUCESS,
        message:"Update Sucefully"
       }))
  }

  async function onDelete(){
    await axiosClient.delete('/user/');
    removeItem(KEY_ACCESS_TOKEN)
    navigate('/login');
  }

  return (
      <div className="UpdateProfile">
          <div className="container">
              <div className="left-part">
                  <div className="input-user-img">
                      <label htmlFor="inputImg" className="labelImg">
                          <img src={userImg ? userImg : usetImg} alt={name} />
                      </label>
                      <input
                          className="inputImg"
                          id="inputImg"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                      />
                  </div>
              </div>
              <div className="right-part">
                  <form onSubmit={handleSubmit}>
                      <input
                          value={name}
                          type="text"
                          placeholder="Your Name"
                          onChange={(e) => setName(e.target.value)}
                      />
                      <input
                          value={bio}
                          type="text"
                          placeholder="Your Bio"
                          onChange={(e) => setBio(e.target.value)}
                      />
                      <input type="submit" className="btn-primary" onClick={handleSubmit}/>
                  </form>

                  <button className="delete-account btn-primary" onClick={onDelete}>
                      Delete Account
                  </button>
              </div>
          </div>
      </div>
  );
}

export default UpdateProfile;