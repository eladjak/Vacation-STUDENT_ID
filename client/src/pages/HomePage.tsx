import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid } from '@mui/material';
import api from '../api/api';
import { formatPrice, formatDate } from '../utils/formatters';
import logger from '../utils/logger';

interface Vacation {
    id: number;
    destination: string;
    description: string;
    start_date: string;
    end_date: string;
    price: number;
    image_url?: string;
}

const HomePage: React.FC = () => {
    const [vacations, setVacations] = useState<Vacation[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                logger.info('Fetching data...');
                const response = await api.get('/vacations');
                setVacations(response.data);
            } catch (error) {
                logger.error('Error fetching data:', error);
                setError('שגיאה בטעינת החופשות');
            }
        };

        fetchData();
    }, []);

    if (error) {
        return (
            <Container>
                <Typography color="error" align="center">
                    {error}
                </Typography>
            </Container>
        );
    }

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom align="center">
                חופשות זמינות
            </Typography>
            <Grid container spacing={3}>
                {vacations.map((vacation) => (
                    <Grid item key={vacation.id} xs={12} sm={6} md={4}>
                        {vacation.image_url && (
                            <img 
                                src={vacation.image_url} 
                                alt={vacation.destination}
                                style={{ width: '100%', height: 200, objectFit: 'cover' }}
                            />
                        )}
                        <Typography variant="h6">{vacation.destination}</Typography>
                        <Typography>{vacation.description}</Typography>
                        <Typography>
                            {formatDate(vacation.start_date)} - {formatDate(vacation.end_date)}
                        </Typography>
                        <Typography>מחיר: {formatPrice(vacation.price)}</Typography>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default HomePage;
