import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
// import authorizationUser from './middlewares/auth.js';
dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
// app.use(authorizationUser)
app.use('/Hos', userRoutes);

const PORT = process.env.PORT
connectDB().then(()=>{
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
).catch((err) => console.error('Error connecting to MongoDB:', err));
