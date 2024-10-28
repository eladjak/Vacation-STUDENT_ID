import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../api/api';
import { RootState } from '../../redux/store';

export interface Vacation {
  id: number;
  description: string;
  destination: string;
  image: string;
  startDate: string;
  endDate: string;
  price: number;
  followersCount: number;
}

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
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get<Vacation[]>('/api/vacations');
            return response.data;
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue('אירעה שגיאה בטעינת החופשות');
        }
    }
);

export const deleteVacation = createAsyncThunk(
    'vacations/deleteVacation',
    async (id: number, { rejectWithValue }) => {
        try {
            await api.delete(`/vacations/${id}`);
            return id;
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue('אירעה שגיאה במחיקת החופשה');
        }
    }
);

const vacationSlice = createSlice({
    name: 'vacations',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchVacations.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchVacations.fulfilled, (state, action: PayloadAction<Vacation[]>) => {
                state.status = 'succeeded';
                state.vacations = action.payload;
            })
            .addCase(fetchVacations.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string || 'אירעה שגיאה בלתי צפויה';
            })
            .addCase(deleteVacation.fulfilled, (state, action) => {
                state.vacations = state.vacations.filter(vacation => vacation.id !== action.payload);
            });
    },
});

export const selectAllVacations = (state: RootState) => state.vacations.vacations;
export const selectVacationsStatus = (state: RootState) => state.vacations.status;
export const selectVacationsError = (state: RootState) => state.vacations.error;

export default vacationSlice.reducer;
