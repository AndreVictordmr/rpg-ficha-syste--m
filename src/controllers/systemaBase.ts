import type { Request, Response } from "express";
import { FichaServico } from "../service/fichaServico.js";


const service = new FichaServico();

export class SystemaBase {
    static listarFichas(req:Request, res: Response){
        try {
            const pegarFichas = service.listarFichas();
            if (pegarFichas.length ===0) return res.status(204).send();
            return res.status(200).send(pegarFichas);
        } catch (error) {
            
        }
    }
    static criar(req:Request, res: Response){
        try {
            const ficha = req.body;
            const novaEntrada = service.criar(ficha);   
            return res.status(201).json(novaEntrada);
        } catch (error: any) {
            return res.status(400).json({mensagem: error.mensage});
        }   
    }
    static editar(req:Request,res:Response){
        try {
            const id = Number(req.params.id);
            const troca = req.body
            const ficha = service.editar(id,troca);
            return res.json(ficha);
        } catch (error: any) {
            return res.status(404).json({ mensagem: error.message });
        }
    }
    static deletar(req: Request, res: Response){
        try {
            const id = Number(req.params.id);
            const ficha = service.deletarID(id);
            return res.json(ficha);
        } catch (error: any) {
            return res.status(404).json({ mensagem: error.message });
        }
    }
    static buscarPorId(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const ficha = service.selecionarPorId(id);
            return res.json(ficha);
        } catch (error: any) {
            return res.status(404).json({ mensagem: error.message });
        }
    }
}