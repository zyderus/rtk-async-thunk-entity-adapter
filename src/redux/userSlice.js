import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'
import * as thunks from './usersThunks'

const commentsAdapter = createEntityAdapter({
  // make sure item.id is unique
  // otherwise adapter will accept only
  // the first instance with such id
  selectId: item => item.id,
})

const initialState = {
  userId: null,
  user: {},
  ...commentsAdapter.getInitialState(),
  loading: false,
  error: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addComment: (state, action) => {
      console.log('adding a user using usersAdapter')
      commentsAdapter.addOne(state, action.payload)
      console.log('loading from thunk', state.loading)
    },
  },
  extraReducers: builder => {
    builder
      // getUser
      .addCase(thunks.getUser.pending, (state, action) => {
        state.loading = true
        state.error = null
      })
      .addCase(thunks.getUser.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.userId = action.payload.id
        state.user = action.payload
      })
      .addCase(thunks.getUser.rejected, (state, action) => {
        state.loading = false
        state.error = 'Unable to fetch User'
      })

      // getComments
      .addCase(thunks.getComments.pending, (state, action) => {
        state.loading = true
        state.error = null
      })
      .addCase(thunks.getComments.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        commentsAdapter.setAll(state, action.payload)
      })
      .addCase(thunks.getComments.rejected, (state, action) => {
        state.loading = false
        state.error = 'Unable to fetch Comments'
      })
  },
})

export const actions = { ...thunks, ...userSlice.actions }

export default userSlice.reducer

const userSelector = state => state.user

export const selectors = {
  ...commentsAdapter.getSelectors(userSelector),
}
