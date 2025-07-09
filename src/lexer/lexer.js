import {esConstanteCadena, esConstanteEntera, esConstanteReal, esIdentificador, esOperadorRelacional, esSimboloEspecial} from './automatas.js';
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
    if (control >= fuente.length) {
        return {
            token: new Token('$', ''),
            nuevaPos: i
        };
    }

    resultado =


}