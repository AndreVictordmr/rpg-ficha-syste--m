import fs from 'fs';
import {PATH} from '../config/path.js'; 
import { UTIL } from "../util.js";

interface Ficha{
  id:number;
  nome:string;
  atributos?: Record<string,number>;
  habilidades?:Record<string,string>;
}
export class FichaServico{
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
        for( const [atributo,valor] of Object.entries(ficha.atributos)){
          if(!UTIL.validarNumeros(valor)) throw new Error(`${atributo} com valor invalido`);
        }
      }
      if (ficha.habilidades !== undefined) {
        for( const [skill,valor] of Object.entries(ficha.habilidades)){
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
      const fichaSelec= this.bd.find(f=>f.id===id);
      if(!fichaSelec ) throw new Error("Ficha não encontrada");
      
      if (dado.nome !== undefined) {
        if(!UTIL.validarTexto(dado.nome)) throw new Error("Nome invalido");
      }
      if (dado.atributos !== undefined) {
        for( const [atributo,valor] of Object.entries(dado.atributos)){
          if(!UTIL.validarNumeros(valor)) throw new Error(`${atributo} com valor invalido`);
        }
      }
      if (dado.habilidades !== undefined) {
        for( const [skill,valor] of Object.entries(dado.habilidades)){
         // const valor = dado.habilidades[skill];
          if(!UTIL.validarTexto(valor)) throw new Error(`${skill} com valor invalido`);
        }
      }
      
    const fichaAtual: Ficha={
      ...fichaSelec,
      ...dado,
      id:fichaSelec.id,
    }
    const index = this.bd.findIndex(f => f.id === fichaSelec.id);
    this.bd[index] = fichaAtual;
    this.salvarNoArquivo();
    return fichaAtual;
  }
  
  listarFichas(){
    return [...this.bd];
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

  deletarID(id:number){
    const verificaId = UTIL.validarNumeros(id);
    if( verificaId ){
      const busca = this.bd.findIndex(f=> f.id === id)
      if(busca === -1) throw new Error("Id não registrado");
      this.bd = this.bd.filter(f => f.id !== busca);
      this.salvarNoArquivo();
      return { mensagem: "Ficha deletada com sucesso" };
    }else{
      throw new Error("Id invalido");
    }
  }

}
