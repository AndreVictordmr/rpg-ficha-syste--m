import fs from 'fs';
import {PATH} from '../config/path'; 

interface Ficha{
  id:number;
  nome:string;
  atributos?: Record<string,number>;
  habilidades?:Record<string,string>;
}
class fichaServico{
  private bd:Ficha[]=[];
  constructor(){
    const dados = fs.readFileSync(PATH.db_file, 'utf-8');
    this.bd = JSON.parse(dados||"[]");
  }
  creat(ficha:Ficha){
    // passo algum codigo do controll par verificaçao 
  }
  editar(id:number,dado:Partial<Ficha>){
    // passo algum codigo do controll par verificaçao   
  }
  selecionarPorId(id:number):Ficha|undefined{
    // passo algum codigo do controll par verificaçao
  }

}
