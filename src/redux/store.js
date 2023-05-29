import {configureStore} from '@reduxjs/toolkit'
import appConfigReducer from './slices/appconfigSlice'
import postReducer from './slices/PostSlice'
import feedReducer from './slices/feedSlice'

export default configureStore({
    reducer:{
        appConfigReducer,
        postReducer,
        feedReducer

    }
})