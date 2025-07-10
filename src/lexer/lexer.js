import { esConstanteCadena, esConstanteEntera, esConstanteReal, esIdentificador, esOperadorRelacional, esSimboloEspecial} from './automatas/index.js';
import { Token } from './token.js';
import { esEspacioOControl } from './utils.js';


export function lexer(fuente, tablaDeSimbolos, pos) {

    let i = pos;
    let longitud = fuente.length;

    while (i < longitud && esEspacioOControl(fuente[i])) {
        console.log(`Ignorando espacio o control en la posición ${i}: '${fuente[i]}'`);
        i++;
    }

    console.log(`Procesando el carácter en la posición ${i}: '${fuente[i]}'`);
    // Si llegamos al final del archivo
    if (i >= fuente.length) {
    
            let token = new Token('$', 'fin de archivo')
            tablaDeSimbolos.agregar(token);

            return {
                tablaDeSimbolos,
                nuevaPos: i,
            };
    }

    let resultado = false   ;

    if ((resultado = esIdentificador(fuente, i)) !== false) {
        tablaDeSimbolos.agregar(resultado.token);
        return {
            tablaDeSimbolos,
            nuevaPos: resultado.nuevaPos,
        };
    } else if ((resultado = esConstanteCadena(fuente, i)) !== false) {
        tablaDeSimbolos.agregar(resultado.token);
        return {
            tablaDeSimbolos,
            nuevaPos: resultado.nuevaPos,
        };
    } else if ((resultado = esConstanteReal(fuente, i)) !== false) {
        tablaDeSimbolos.agregar(resultado.token);
        return {
            tablaDeSimbolos,
            nuevaPos: resultado.nuevaPos,
        };
    } else if ((resultado = esConstanteEntera(fuente, i)) !== false) {
        tablaDeSimbolos.agregar(resultado.token);
        return {
            tablaDeSimbolos,
            nuevaPos: resultado.nuevaPos,
        };
    } else if ((resultado = esOperadorRelacional(fuente, i)) !== false) {
        tablaDeSimbolos.agregar(resultado.token);
        return {
            tablaDeSimbolos,
            nuevaPos: resultado.nuevaPos,
        };
    } else if ((resultado = esSimboloEspecial(fuente, i)) !== false) {
        tablaDeSimbolos.agregar(resultado.token);
        return {
            tablaDeSimbolos,
            nuevaPos: resultado.nuevaPos,
        };
    } else {
        throw new Error(`Error léxico en la posición ${i}: '${fuente[i]}' no es un token válido.`);
    }

}