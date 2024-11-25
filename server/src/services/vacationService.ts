import { db } from '../db';
import logger from '../utils/logger';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export interface Vacation extends RowDataPacket {
    id: number;
    destination: string;
    description: string;
    image_url: string;
    start_date: Date;
    end_date: Date;
    price: number;
    followers_count: number;
    is_followed?: boolean;
    is_active: boolean;
}

export interface VacationFormData {
    destination: string;
    description: string;
    image_url?: string;
    start_date: string;
    end_date: string;
    price: number;
}

export const vacationService = {
    async getAllVacations(userId?: number) {
        try {
            const query = `
                SELECT v.*, 
                    CASE WHEN vf.user_id IS NOT NULL THEN TRUE ELSE FALSE END as is_followed
                FROM vacations v
                LEFT JOIN vacation_followers vf ON v.id = vf.vacation_id AND vf.user_id = ?
                WHERE v.is_active = TRUE
                ORDER BY v.start_date
            `;
            
            const [rows] = await db.query<Vacation[]>(query, [userId || 0]);
            return rows;
        } catch (error) {
            logger.error('Error getting vacations:', error);
            throw error;
        }
    },

    async addVacation(data: VacationFormData) {
        try {
            const [result] = await db.query<ResultSetHeader>(
                'INSERT INTO vacations (destination, description, start_date, end_date, price, image_url) VALUES (?, ?, ?, ?, ?, ?)',
                [data.destination, data.description, data.start_date, data.end_date, data.price, data.image_url]
            );
            return result.insertId;
        } catch (error) {
            logger.error('Error adding vacation:', error);
            throw error;
        }
    },

    async updateVacation(id: number, data: VacationFormData) {
        try {
            const [result] = await db.query<ResultSetHeader>(
                'UPDATE vacations SET destination = ?, description = ?, start_date = ?, end_date = ?, price = ?, image_url = ? WHERE id = ?',
                [data.destination, data.description, data.start_date, data.end_date, data.price, data.image_url, id]
            );
            return result.affectedRows > 0;
        } catch (error) {
            logger.error('Error updating vacation:', error);
            throw error;
        }
    },

    async deleteVacation(id: number) {
        try {
            const [result] = await db.query<ResultSetHeader>(
                'DELETE FROM vacations WHERE id = ?',
                [id]
            );
            return result.affectedRows > 0;
        } catch (error) {
            logger.error('Error deleting vacation:', error);
            throw error;
        }
    },

    async followVacation(userId: number, vacationId: number) {
        try {
            await db.query(
                'INSERT INTO vacation_followers (user_id, vacation_id) VALUES (?, ?)',
                [userId, vacationId]
            );
            
            await db.query(
                'UPDATE vacations SET followers_count = followers_count + 1 WHERE id = ?',
                [vacationId]
            );
            
            return true;
        } catch (error) {
            logger.error('Error following vacation:', error);
            throw error;
        }
    },

    async unfollowVacation(userId: number, vacationId: number) {
        try {
            await db.query(
                'DELETE FROM vacation_followers WHERE user_id = ? AND vacation_id = ?',
                [userId, vacationId]
            );
            
            await db.query(
                'UPDATE vacations SET followers_count = followers_count - 1 WHERE id = ?',
                [vacationId]
            );
            
            return true;
        } catch (error) {
            logger.error('Error unfollowing vacation:', error);
            throw error;
        }
    }
}; 