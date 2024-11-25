import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './store';
import { Vacation } from '../types/vacation';
import api from '../services/api';

interface VacationState {
  vacations: Vacation[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: VacationState = {
  vacations: [],
  status: 'idle',
  error: null
};

export const fetchVacations = createAsyncThunk(
  'vacations/fetchVacations',
  async () => {
    const response = await api.get('/vacations');
    return response.data;
  }
);

export const addVacation = createAsyncThunk(
  'vacations/addVacation',
  async (vacationData: Omit<Vacation, 'id'>) => {
    const response = await api.post('/vacations', vacationData);
    return response.data;
  }
);

export const updateVacation = createAsyncThunk(
  'vacations/updateVacation',
  async ({ id, data }: { id: number; data: Partial<Vacation> }) => {
    const response = await api.put(`/vacations/${id}`, data);
    return response.data;
  }
);

export const deleteVacation = createAsyncThunk(
  'vacations/deleteVacation',
  async (id: number) => {
    await api.delete(`/vacations/${id}`);
    return id;
  }
);

const vacationSlice = createSlice({
  name: 'vacations',
  initialState,
  reducers: {
    setVacations: (state, action) => {
      state.vacations = action.payload;
    },
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
        state.error = action.error.message || 'שגיאה בטעינת החופשות';
      });
  },
});

export const { setVacations } = vacationSlice.actions;

export const selectAllVacations = (state: RootState) => state.vacations.vacations;
export const selectVacationsStatus = (state: RootState) => state.vacations.status;
export const selectVacationsError = (state: RootState) => state.vacations.error;

export default vacationSlice.reducer;


