import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from './store';

export interface Vacation {
  id: number;
  description: string;
  destination: string;
  image: string;
  startDate: string;
  endDate: string;
  price: number;
  followersCount?: number;
}

interface VacationsState {
  vacations: Vacation[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: VacationsState = {
  vacations: [],
  status: 'idle',
  error: null
};

export const fetchVacations = createAsyncThunk('vacations/fetchVacations', async () => {
  const response = await axios.get<Vacation[]>('/api/vacations');
  return response.data;
});

export const addVacation = createAsyncThunk('vacations/addVacation', async (vacation: Omit<Vacation, 'id'>) => {
  const response = await axios.post<Vacation>('/api/vacations', vacation);
  return response.data;
});

export const updateVacation = createAsyncThunk('vacations/updateVacation', async (vacation: Vacation) => {
  const response = await axios.put<Vacation>(`/api/vacations/${vacation.id}`, vacation);
  return response.data;
});

export const deleteVacation = createAsyncThunk('vacations/deleteVacation', async (id: number) => {
  await axios.delete(`/api/vacations/${id}`);
  return id;
});

export const followVacation = createAsyncThunk('vacations/followVacation', async (id: number) => {
  const response = await axios.post(`/api/vacations/${id}/follow`);
  return response.data;
});

export const unfollowVacation = createAsyncThunk('vacations/unfollowVacation', async (id: number) => {
  const response = await axios.post(`/api/vacations/${id}/unfollow`);
  return response.data;
});

const vacationsSlice = createSlice({
  name: 'vacations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVacations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchVacations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.vacations = action.payload;
      })
      .addCase(fetchVacations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(addVacation.fulfilled, (state, action) => {
        state.vacations.push(action.payload);
      })
      .addCase(updateVacation.fulfilled, (state, action) => {
        const index = state.vacations.findIndex(v => v.id === action.payload.id);
        if (index !== -1) {
          state.vacations[index] = action.payload;
        }
      })
      .addCase(deleteVacation.fulfilled, (state, action) => {
        state.vacations = state.vacations.filter(v => v.id !== action.payload);
      })
      .addCase(followVacation.fulfilled, (state, action) => {
        const vacation = state.vacations.find(v => v.id === action.payload.id);
        if (vacation) {
          vacation.followersCount = (vacation.followersCount || 0) + 1;
        }
      })
      .addCase(unfollowVacation.fulfilled, (state, action) => {
        const vacation = state.vacations.find(v => v.id === action.payload.id);
        if (vacation && vacation.followersCount) {
          vacation.followersCount -= 1;
        }
      });
  }
});

export const selectAllVacations = (state: RootState) => state.vacations.vacations;
export const selectVacationsStatus = (state: RootState) => state.vacations.status;
export const selectVacationsError = (state: RootState) => state.vacations.error;

export default vacationsSlice.reducer;
