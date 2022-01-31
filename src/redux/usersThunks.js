import { createAsyncThunk } from '@reduxjs/toolkit'

const userUrl = 'https://jsonplaceholder.typicode.com/users/5'

export const getUser = createAsyncThunk('user/getUser', async () => {
  const res = await fetch(userUrl)
  const data = await res.json()
  // console.log('from getUser thunk:', data)
  return data
})

export const getComments = createAsyncThunk('user/getComments', async (args, thunkAPI) => {
  /* FOR DEMO */
  // const state = thunkAPI.getState()
  // const comments = state.user.entities

  // console.log('state.users.loading in thunk:', state.user.loading)
  // console.log('comments in thunk:', comments)
  /* --- */

  const commentsUrl = `https://jsonplaceholder.typicode.com/comments?postId=${args}`

  const res = await fetch(commentsUrl)
  const data = await res.json()
  // console.log('from getComments thunk:', data)
  return data
})

// THE LOGIC BELOW CAN BE MADE IN THE getComments THUNK ABOVE
/* 
  !!! KEEP IN MIND 
  Reducers should be pure functions, so it's bad practice to dispatch action into reducers

  dispatching actions inside reducer considered an ANTI-PATTERN by Redux community
*/
export const getUserAndComments = createAsyncThunk('user/getUserAndComments', async (_, thunkAPI) => {
  const {
    payload: { id },
  } = await thunkAPI.dispatch(getUser())

  const data = typeof id === 'number' && (await thunkAPI.dispatch(getComments(id)))

  // console.log('from getUserAndComments thunk:', data)
  return data
})
