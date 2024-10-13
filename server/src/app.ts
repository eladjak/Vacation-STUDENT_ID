import express from 'express';
import path from 'path';
import cors from 'cors';
import vacationRoutes from './routes/vacations';
import authRoutes from './routes/auth';
import { errorHandler } from './middleware/errorHandler';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/vacations', vacationRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`השרת פועל בפורט ${port}`);
});

export default app;
