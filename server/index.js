import express from 'express';
import cors from 'cors';
import pkg from 'pg';
const { Pool } = pkg;
import Reg from './auth/reg.js';
import Login from './auth/login.js';
import Profile from './auth/profile.js';
import Update from './auth/update.js';


const app = express();
app.use(express.json());
app.use(cors());

app.post('/signUp',Reg);
app.post('/login',Login);
app.get('/profile/:id',Profile);
app.put('/update/:id',Update);


const PORT = 5000;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'aman',
  password: 'akumar22200245@',
  port: 5432,
});

const checkConnection = async () => {
  try {
    const client = await pool.connect();
    console.log('Connected to the database');
    await client.query('SELECT NOW()');
    console.log('Connection check successful');
  } catch (error) {
    console.error('Error connecting to the database', error);

  }
};

app.listen(PORT);
export default pool;

// Corrected: Call the checkConnection function by adding parentheses
checkConnection();





