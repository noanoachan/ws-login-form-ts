import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { router as authRoutes } from './src/routes/authLoginRoutes';

dotenv.config();

const app: express.Express = express();
app.use(express.json());
app.use(cors());

// POST: ログイン認証
app.use('/api/auth', authRoutes);



// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// app.get('/data', (req, res) => {
//   const data = {
//     enable: true
//   }

//   res.json(data);
// });


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
