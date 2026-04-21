import express from "express";
import {PATH} from '../config/path.js';
import rotas from "../controllers/rotiador.js";

const app = express();

app.use(express.json());
app.use(rotas)

app.listen(PATH.port,()=>{
    console.log(`${PATH.nome} running on port ${PATH.port}`);
})