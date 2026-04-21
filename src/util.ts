export class UTIL{

static validarTexto(texto:string): boolean{
    if(!texto) return false;
    const textoValido = texto.trim();
    if(texto.length === 0) return false;
    const caracterPermitidos = /^[a-zA-Z0-9À-ÿ\s]+$/;
    return caracterPermitidos.test(textoValido);
}

static validarNumeros(valor:number):boolean{
    if(isNaN(valor)) return false;
    if(valor == null|| valor == undefined) return false;
    return valor>=0;
}
}