import { configureStore } from "@reduxjs/toolkit";
import usersReducers from './userSlice'



export default configureStore({
    reducer: {
        users: usersReducers,
    }
})