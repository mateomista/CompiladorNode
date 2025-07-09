import { esConstanteCadena, esConstanteEntera, esConstanteReal, esIdentificador, esOperadorRelacional, esSimboloEspecial} from './automatas.js';
import { Token } from '../token.js';
import { esEspacioOControl } from './utils.js';

export function lexer(fuente, tablaDeSimbolos, pos,) {
    let i = pos;
    let longitud = fuente.length;
    let resultado = false;
    
    while (i < longitud && esEspacioOControl(fuente[i])) {
        i++;
    }

    // Si llegamos al final del archivo
    if (i >= fuente.length) {
        return {
            token: new Token('$', ''),
            nuevaPos: i
        };
    }

    resultado = esIdentificador(fuente, i);
    if (resultado !== false) {
        tablaDeSimbolos.agregar(resultado.token);
        return {
            token: resultado.token,
            nuevaPos: resultado.nuevaPos
        };
    } else if ((resultado = esConstanteCadena(fuente, i)) !== false) {
        tablaDeSimbolos.agregar(resultado.token);
        return {
            token: resultado.token,
            nuevaPos: resultado.nuevaPos
        };
    } else if ((resultado = esConstanteReal(fuente, i)) !== false) {
        tablaDeSimbolos.agregar(resultado.token);
        return {
            token: resultado.token,
            nuevaPos: resultado.nuevaPos
        };
    } else if ((resultado = esConstanteEntera(fuente, i)) !== false) {
        tablaDeSimbolos.agregar(resultado.token);
        return {
            token: resultado.token,
            nuevaPos: resultado.nuevaPos
        };
    } else if ((resultado = esOperadorRelacional(fuente, i)) !== false) {
        tablaDeSimbolos.agregar(resultado.token);
        return {
            token: resultado.token,
            nuevaPos: resultado.nuevaPos
        };
    } else if ((resultado = esSimboloEspecial(fuente, i)) !== false) {
        tablaDeSimbolos.agregar(resultado.token);
        return {
            token: resultado.token,
            nuevaPos: resultado.nuevaPos
        };
    }
    else {
        throw new Error(`Error léxico en la posición ${i}: '${fuente[i]}' no es un token válido.`);
    }
}