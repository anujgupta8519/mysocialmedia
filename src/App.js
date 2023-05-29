import './App.css';
import Login from './pages/login/Login';
import { Routes,Route } from 'react-router-dom';
import Signup from './pages/signup/Signup';
import Home from './pages/home/Home';
import RequireUser from './components/RequireUser';
import Profile from './components/Profile/Profile';
import Feed from './components/Feed/Feed.js';
import UpdateProfile from './components/UpdateProfile/UpdateProfile';
import LoadingBar from 'react-top-loading-bar'
import {useSelector} from 'react-redux'
import { useEffect,useRef } from 'react';
import OnlyIfNotLogin from './components/OnlyIfNotLogin';
import toast, { Toaster } from 'react-hot-toast';

export const TOAST_SUCESS = 'toast_sucess';
export const TOAST_FAILURE = 'toast_failure';

function App() {
  const isLoading = useSelector(state =>state.appConfigReducer.isLoading)
  const toastData = useSelector(state =>state.appConfigReducer.toastData)
  const ref = useRef()
  useEffect(()=>{
    if (isLoading) {
      ref.current?.continuousStart();
      
    }else{
      ref.current?.complete();
    }

  },[isLoading])
  useEffect(()=>{
   switch(toastData.type){
    case TOAST_SUCESS:
      toast.success(toastData.message);
      break;
    case TOAST_FAILURE:
      toast.error(toastData.message);
      break; 

   }

  },[toastData])
  return (
  <div>
       <LoadingBar  color='orange' ref={ref} />
       <div><Toaster/></div>
    <Routes>
      <Route element={<RequireUser/>}>
      <Route  element={<Home/>}>
        <Route path='/' element={<Feed/>}/>
        <Route path='/profile/:userId' element ={<Profile/>}/>
        <Route path='/updateProfile' element ={<UpdateProfile/>}/>

      </Route>
      </Route>
      <Route element={<OnlyIfNotLogin/>}>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup'element={<Signup/>}/>
      </Route>

    </Routes>
  </div>
  );
}

export default App;
