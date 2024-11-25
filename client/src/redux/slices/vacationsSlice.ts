import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { RootState } from '../store';
import logger from '../../utils/logger';

export interface Vacation {
  id: number;
  destination: string;
  description: string;
  startDate: string;
  endDate: string;
  price: number;
  imageUrl: string;
  followersCount: number;
  isFollowing?: boolean;
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

export const fetchVacations = createAsyncThunk(
  'vacations/fetchVacations',
  async () => {
    try {
      logger.info('מנסה לטעון חופשות...');
      const response = await axios.get('/vacations');
      logger.info('חופשות נטענו בהצלחה');
      return response.data;
    } catch (error) {
      logger.error('שגיאה בטעינת חופשות:', error);
      throw error;
    }
  }
);

const vacationsSlice = createSlice({
  name: 'vacations',
  initialState,
  reducers: {
    setVacations: (state, action: PayloadAction<Vacation[]>) => {
      state.vacations = action.payload;
    }
  },
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
        state.error = action.error.message || 'שגיאה לא ידועה';
      });
  }
});

export const { setVacations } = vacationsSlice.actions;

export const selectAllVacations = (state: RootState) => state.vacations.vacations;
export const selectVacationsStatus = (state: RootState) => state.vacations.status;
export const selectVacationsError = (state: RootState) => state.vacations.error;

export default vacationsSlice.reducer; 