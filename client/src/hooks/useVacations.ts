import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Vacation } from '../types/vacation';
import { useGetVacationsQuery, useFollowVacationMutation, useUnfollowVacationMutation } from '../redux/vacationApi';

export const useVacations = () => {
    const { t } = useTranslation();
    const { data: vacations = [], isLoading, error } = useGetVacationsQuery();
    const [followVacation] = useFollowVacationMutation();
    const [unfollowVacation] = useUnfollowVacationMutation();

    const handleFollow = async (vacationId: number, isFollowed: boolean) => {
        try {
            if (isFollowed) {
                await unfollowVacation(vacationId).unwrap();
            } else {
                await followVacation(vacationId).unwrap();
            }
        } catch (err) {
            console.error('Error in follow action:', err);
            throw new Error(String(t('error.followAction')));
        }
    };

    return {
        vacations,
        isLoading,
        error,
        handleFollow
    };
}; 