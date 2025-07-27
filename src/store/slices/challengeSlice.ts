import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Challenge {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  participants: number;
  status: string;
}

interface ChallengeState {
  challenges: Challenge[];
  userChallenges: Challenge[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ChallengeState = {
  challenges: [],
  userChallenges: [],
  isLoading: false,
  error: null,
};

export const fetchChallenges = createAsyncThunk(
  'challenges/fetchAll',
  async () => {
    // API call would go here
    return [];
  }
);

const challengeSlice = createSlice({
  name: 'challenges',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChallenges.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchChallenges.fulfilled, (state, action) => {
        state.isLoading = false;
        state.challenges = action.payload;
      })
      .addCase(fetchChallenges.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch challenges';
      });
  },
});

export const { clearError } = challengeSlice.actions;
export default challengeSlice.reducer;
