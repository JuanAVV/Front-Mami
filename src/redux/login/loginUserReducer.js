import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

const initiaStateLoginUser = {
    tknA: null,
    tknR: null,
    isLoadingLogin: false
}

//Extra reducers
export const login = createAsyncThunk(
    'loginUserReducer/login',
    async (dataLogin, thunkAPI) => {
        try{
            const response = await axios.post(`${import.meta.env.VITE_URL_HOST}/login`, dataLogin,
            {headers: { 'Content-Type': 'application/json'} });
            console.log("response ,",response.data)
            

            return response.data;

        }catch(error){
            console.error("EROOOR DE PETICION LOGIN: ",error)
            return thunkAPI.rejectWithValue(error.message != undefined ? error.message : error);
        }
    }
)

export const loginUserReducer = createSlice({
    name: "loginUserReducer",
    initialState: initiaStateLoginUser,
    reducers:{
        cleartTknA: (state) => {
            console.log("entra al celar")
            
            state.tknA = null;
            state.tknR = null;
        }
    },
    extraReducers: (builder) => {
        //>>>>>login()
        builder.addCase(login.pending, (state)=> {
            state.isLoadingLogin = true;
        })
        builder.addCase(login.fulfilled, (state, action)=> {
            console.log("payload ,",action.payload)
            state.isLoadingLogin = false;
            state.tknA = action.payload.accessToken;
            state.tknR = action.payload.refreshToken;
        })
        builder.addCase(login.rejected, (state, action)=> {
            console.log("Entra al rejected: ", action.payload)
            state.isLoadingLogin = false;
            state.tknA = null;
            state.tknR = null;
        })
        //login()<<<<<
    }
})

export const {cleartTknA} = loginUserReducer.actions

export default loginUserReducer.reducer