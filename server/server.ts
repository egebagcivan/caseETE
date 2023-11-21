// npm packages
import 'dotenv/config.js';
import express, { Request, Response, NextFunction, Application } from 'express';
import logger from 'morgan';
import cors from 'cors';
import formData from 'express-form-data';

// connect to MongoDB with mongoose
import './config/database';

// import routes
import { router as authRouter } from './routes/auth';
import companyRoutes from './routes/company';
import productRoutes from './routes/product';

// create the express app
const app: Application = express();

// basic middleware
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(formData.parse());

// mount imported routes
app.use('/api/auth', authRouter);
app.use('/api/companies', companyRoutes);
app.use('/api/products', productRoutes);

// handle 404 errors
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ err: 'Not found' });
});

// handle all other errors
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500).json({ err: err.message });
});

export { app };
