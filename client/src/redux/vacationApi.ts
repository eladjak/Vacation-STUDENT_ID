import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Vacation, VacationFormData } from '../types/vacation';

export const vacationApi = createApi({
  reducerPath: 'vacationApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:3005/api',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  tagTypes: ['Vacation'],
  endpoints: (builder) => ({
    getVacations: builder.query<Vacation[], void>({
      query: () => 'vacations',
      providesTags: ['Vacation']
    }),
    
    followVacation: builder.mutation<void, number>({
      query: (id) => ({
        url: `vacations/${id}/follow`,
        method: 'POST'
      }),
      invalidatesTags: ['Vacation']
    }),
    
    unfollowVacation: builder.mutation<void, number>({
      query: (id) => ({
        url: `vacations/${id}/follow`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Vacation']
    }),

    addVacation: builder.mutation<Vacation, VacationFormData>({
      query: (data) => ({
        url: 'vacations',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Vacation']
    }),

    updateVacation: builder.mutation<Vacation, { id: number; data: VacationFormData }>({
      query: ({ id, data }) => ({
        url: `vacations/${id}`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['Vacation']
    }),

    deleteVacation: builder.mutation<void, number>({
      query: (id) => ({
        url: `vacations/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Vacation']
    })
  })
});

export const {
  useGetVacationsQuery,
  useFollowVacationMutation,
  useUnfollowVacationMutation,
  useAddVacationMutation,
  useUpdateVacationMutation,
  useDeleteVacationMutation
} = vacationApi; 