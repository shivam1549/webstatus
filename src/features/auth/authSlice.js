import { createSlice } from "@reduxjs/toolkit";
const initialState ={
    isloggedIn: false,
    user:JSON.parse(localStorage.getItem('user')) || [],
    token:localStorage.getItem('token') || null,
    loading: true,
}

const authslice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        loginSuccess: (state, action) =>{
            // console.log('loading....')
            state.isloggedIn = true,
            state.user = action.payload.user,
            state.token = action.payload.token,
            state.loading = false;
        },
        logout:(state) =>{
            state.isloggedIn = false,
            state.user = null,
            state.token = null,
            state.loading = false,
            localStorage.removeItem('user'),
            localStorage.removeItem('token')
        },
        setLoading: (state, action) => {
            state.loading = action.payload; // Action to set loading state
          },
    }
})

export const {loginSuccess, logout, setLoading} = authslice.actions;
export default authslice.reducer;