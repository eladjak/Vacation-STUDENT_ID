import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Vacation from '../models/vacation';

interface VacationState {
  vacations: Vacation[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: VacationState = {
  vacations: [],
  status: 'idle',
  error: null,
};

export const fetchVacations = createAsyncThunk('vacations/fetchVacations', async () => {
  const response = await axios.get<Vacation[]>('/api/vacations');
  return response.data;
});

export const createVacation = createAsyncThunk('vacations/createVacation', async (vacationData: Omit<Vacation, 'id' | 'followersCount'>) => {
  const response = await axios.post<Vacation>('/api/vacations', vacationData);
  return response.data;
});

export const updateVacation = createAsyncThunk('vacations/updateVacation', async (vacationData: Vacation) => {
  const response = await axios.put<Vacation>(`/api/vacations/${vacationData.id}`, vacationData);
  return response.data;
});

export const deleteVacation = createAsyncThunk('vacations/deleteVacation', async (id: number) => {
  await axios.delete(`/api/vacations/${id}`);
  return id;
});

export const followVacation = createAsyncThunk('vacations/followVacation', async (id: number) => {
  const response = await axios.post<Vacation>(`/api/vacations/${id}/follow`);
  return response.data;
});

const vacationSlice = createSlice({
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
      .addCase(createVacation.fulfilled, (state, action) => {
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
        const index = state.vacations.findIndex(v => v.id === action.payload.id);
        if (index !== -1) {
          state.vacations[index] = action.payload;
        }
      });
  },
});

export default vacationSlice.reducer;