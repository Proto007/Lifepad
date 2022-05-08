import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api, { updateAccessToken } from '../../../config';


export const signin = createAsyncThunk(
  'user/signin',
  async (credentials, thunkAPI) => {
    try {
      const tokenResponse = await api.post("/api/users/token", credentials, {
        headers: {
          'Content-Type': 'application/json'
        },
      });
      console.log("Got the tokens: ", tokenResponse);
      // save tokens
      localStorage.setItem("access", tokenResponse.data["access"])
      localStorage.setItem("refresh", tokenResponse.data["refresh"])
      // update the token axios uses
      updateAccessToken(tokenResponse.data["access"]);
      // Now that API is authorized, try to fetch user data
      const userInfoResponse = await api.get("/api/users/get_user");
      console.log("Got user info: ", userInfoResponse);
      return userInfoResponse.data;
    } catch(err) {
      console.log("Couldn't sign in, didn't get tokens");
      console.log(err);
      throw err;
    }
  }
);

/**
 * This thunk reloads user info if the access token still works
 */
export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (options, thunkAPI) => {
    token = localStorage.getItem("access")
    // update the token axios uses
    updateAccessToken(token);
    // Now that API is authorized, try to fetch user data
    const userInfoResponse = await api.get("/api/users/get_user");
    console.log("Got user info: ", userInfoResponse);
    return userInfoResponse.data;
  }
);


const loggedOutUser = {
  isLoggedIn: false,
  loading: false,
  error: false,
};

export const userSlice= createSlice({
  name: 'user',
  initialState: Object.assign({}, loggedOutUser),
  reducers: {
    signup: (state, action) => {
      state.user = {...action.payload}
    },
    logout: (state) => {
      state.isLoggedIn = false;
      localStorage.removeItem("access")
      localStorage.removeItem("refresh")
    },
  },
  // Used to handle actions made by the thunk
  extraReducers: builder => {
    builder.addCase(signin.pending, (state, action) => {
      state.isLoggedIn = false;
      state.loading = true;
      state.error = false;
    })
    .addCase(signin.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.loading = false;
      state.error = false;
      console.log("fulfilled");
      // update redux state
      try {
        Object.assign(state, action.payload);
        console.log("updated user state ", state);
      } catch(err) {
        console.log("userSlice: failed to update state", err);
      }
    })
    .addCase(signin.rejected, (state, action) => {
      state.isLoggedIn = false;
      state.loading = false;
      state.error = true;
    })
    .addCase(fetchUser.fulfilled, (state, action) => {
      Object.assign(state, action.payload);
    })
  },
});


/**
 * THUNK.
 * @param credentials  an object that will be the body of the login request.
 * Should have email and password fields.
 */
// export const login = (credentials) => {
//   // try to sign in with the server
//   api.post("/api/users/token", credentials, {
//     headers: {
//       'Content-Type': 'application/json'
//     },
//   }).then((tokenResponse) => {
//     // save tokens
//     localStorage.setItem("access", tokenResponse.data["access"])
//     localStorage.setItem("refresh", tokenResponse.data["refresh"])
//     // update the token axios uses
//     updateAccessToken(tokenResponse.data["access"]);
//     // Now get the user's information, since we're authorized
//     api.get("/api/users/get_user").then((userInfoResponse) => {
//       // update redux state
//       console.log("User info response:", userInfoResponse.data);
//       //Object.assign(state, userInfoResponse.data);
//       console.log("User slice:", state);
//       userSlice.actions.signin({

//       });
//     }).catch(error => {
//       console.log(error);
//       console.log("userSlice: failed to load user data after authorizing with tokens");
//       state.isLoggedIn = false;
//     });
//   }).catch(function (error) {
//     console.log("Couldn't sign in");
//     if (error.response) {
//       console.log(error.response)
//     } else if (error.request) {
//       // The request was made but no response was received
//       console.log("Error with connecting to server", error.request);
//     } else {
//       // Something happened in setting up the request that triggered an Error
//       console.log('Error', error.message);
//     }
//   });
// }


export const { signup, logout } = userSlice.actions

/**
 * This is a selector, which retrieves the logged in User model from the redux state
 * This is username, email, id, etc.
 */
export const getUser = (state) => state.user

export default userSlice.reducer
