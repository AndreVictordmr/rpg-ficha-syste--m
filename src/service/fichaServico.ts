
interface Ficha{
  id:number;
  nome:string;
  atributos?: Record<string,number>;
  habilidades?:Record<string,string>;
}
class fichaServico{
  private bd : Ficha[]=[];
  
  creat(ficha:Ficha){
    // passo algum codigo do controll par verificaçao 
  }
  editar(id:number,ficha:array,dado:ficha){
    // passo algum codigo do controll par verificaçao   
  }
  selecionarPorId(id:number):Ficha|undefined{
    // passo algum codigo do controll par verificaçao
    .fecht();
  }

}
