import express from 'express'
const app = express();
import router from './routes/api.route.js'
app.use(express());
import dotenv from 'dotenv'
dotenv.config();
app.use(express.json());
app.use('/',router);
const PORTa = process.env.PORT 
console.log(process.env.API_KEY)
console.log(process.env.LOC_API_KEY)
app.listen(PORTa , () => {
    console.log(`Server is running on port ${PORTa}`);
})