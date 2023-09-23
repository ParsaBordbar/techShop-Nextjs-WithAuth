import express from 'express'
import {EnvConfig, DbConfig} from './configs/index.mjs'
import {AuthRoutes} from './routes/index.mjs'
import cors from 'cors'

//Env should be here first
EnvConfig();
DbConfig();


const app = express();
app.use(cors());
app.use(express.json())

app.use('/api/auth/', AuthRoutes)
const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log('Running at port 5000');
})
