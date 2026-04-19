import express from "express";
import {PATH} from '../config/path';

const app = express();

app.use(express.json());

app.listen(PATH.port,()=>{
    console.log(`${PATH.nome} running on port ${PATH.port}`);
})