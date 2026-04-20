import fs from 'fs';
import {PATH} from '../config/path'; 
import { UTIL } from "../util";

interface Ficha{
  id:number;
  nome:string;
  atributos?: Record<string,number>;
  habilidades?:Record<string,string>;
}
export class fichaServico{
  private bd:Ficha[]=[];
  constructor(){
    const dados = fs.readFileSync(PATH.db_path, 'utf-8');
    this.bd = JSON.parse(dados||"[]");
  }
  private salvarNoArquivo() {
    fs.writeFileSync(PATH.db_path, JSON.stringify(this.bd, null, 2));
  }
  criar(ficha:Ficha):Ficha{
    const verificaId = UTIL.validarNumeros(ficha.id);
    const verificaNome = UTIL.validarTexto(ficha.nome);
    if(verificaId && verificaNome ){
            if (ficha.atributos !== undefined) {
        for( const atributo in ficha.atributos){
          const valor = ficha.atributos[atributo];
          if(!UTIL.validarNumeros(valor)) throw new Error(`${atributo} com valor invalido`);
        }
      }
      if (ficha.habilidades !== undefined) {
        for( const skill in ficha.habilidades){
          const valor = ficha.habilidades[skill];
          if(!UTIL.validarTexto(valor)) throw new Error(`${skill} com valor invalido`);
        }
      }
      
      const novaEntrada = this.bd.some(f => f.id === ficha.id);
      if(novaEntrada){
        throw new Error("ID já cadastrado!");
      }else{
        this.bd.push(ficha);
        this.salvarNoArquivo();
        return ficha;
      }
    }else{
        throw new Error("Dados invalidos");
    }
  }
  editar(id:number,dado:Partial<Ficha>){  
    const verificaId = UTIL.validarNumeros(id);
    if(!verificaId) throw new Error("Id não valido");
      const entradaId= this.bd.findIndex(f=>f.id===id);
      if(entradaId === -1 ) throw new Error("Ficha não encontrada");
      
      if (dado.nome !== undefined) {
        if(!UTIL.validarTexto(dado.nome)) throw new Error("Nome invalido");
      }
      if (dado.atributos !== undefined) {
        for( const atributo in dado.atributos){
          const valor = dado.atributos[atributo];
          if(!UTIL.validarNumeros(valor)) throw new Error(`${atributo} com valor invalido`);
        }
      }
      if (dado.habilidades !== undefined) {
        for( const skill in dado.habilidades){
          const valor = dado.habilidades[skill];
          if(!UTIL.validarTexto(valor)) throw new Error(`${skill} com valor invalido`);
        }
      }
      
    this.bd[entradaId] = { 
      ...this.bd[entradaId], 
      ...dado,
    
      id: this.bd[entradaId].id 
    };

    this.salvarNoArquivo();
    return this.bd[entradaId];
  }
  
  
  selecionarPorId(id:number):Ficha|undefined{
    const verificaId = UTIL.validarNumeros(id);
    if( verificaId ){
      const busca = this.bd.find(f=> f.id === id)
      if(busca === undefined) throw new Error("Id não registrado");
      return busca;
    }else{
      throw new Error("Id invalido");
    }
  }

}
