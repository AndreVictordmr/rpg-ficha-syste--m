import express from "express";
import {PATH} from '../config/path';
import rotas from "../controllers/rotiador";

const app = express();

app.use(express.json());
app.use(rotas)

app.listen(PATH.port,()=>{
    console.log(`${PATH.nome} running on port ${PATH.port}`);
})