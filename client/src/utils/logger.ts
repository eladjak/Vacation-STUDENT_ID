/* eslint-disable no-console */
import { AxiosError } from 'axios';

type LogData = Record<string, unknown> | Error | AxiosError | unknown;

const isDevelopment = process.env.NODE_ENV === 'development' || process.env.REACT_APP_DEBUG === 'true';

const formatError = (error: LogData): Record<string, unknown> => {
    if (error instanceof Error) {
        return {
            message: error.message,
            name: error.name,
            stack: error.stack
        };
    }
    
    if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as AxiosError;
        return {
            message: axiosError.message,
            status: axiosError.response?.status,
            data: axiosError.response?.data
        };
    }

    return { error };
};

const logger = {
    info: (message: string, data?: LogData): void => {
        if (isDevelopment) {
            console.log(message, data || '');
        }
    },
    error: (message: string, error?: LogData): void => {
        if (isDevelopment) {
            console.error(message, error ? formatError(error) : '');
        }
    },
    warn: (message: string, data?: LogData): void => {
        if (isDevelopment) {
            console.warn(message, data || '');
        }
    }
};

export default logger; 