import { createSlice } from '@reduxjs/toolkit';

interface CommunityState {
  posts: Array<any>;
  leaderboard: Array<any>;
  isLoading: boolean;
  error: string | null;
}

const initialState: CommunityState = {
  posts: [],
  leaderboard: [],
  isLoading: false,
  error: null,
};

const communitySlice = createSlice({
  name: 'community',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setLeaderboard: (state, action) => {
      state.leaderboard = action.payload;
    },
  },
});

export const { setPosts, setLeaderboard } = communitySlice.actions;
export default communitySlice.reducer;
