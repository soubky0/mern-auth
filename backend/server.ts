import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import { notFound, errorHandler } from "./middleware/errorMiddleware";
import connectDB from "./config/db";

dotenv.config();
const PORT = process.env.PORT || 5000;
connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/users', userRoutes);
app.use(notFound);
app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
