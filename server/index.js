import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
import router from './routes/pages.js';
import connection from './db/connection.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const corsOptions = {
    origin:process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5173',
    creadential:true
}


const app = express();
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use("/",router);

const port = process.env.PORT || 3000;
const password = process.env.PASSWORD;

connection(password)
app.listen(port , ()=> console.log(`Server listening on ${port}`))