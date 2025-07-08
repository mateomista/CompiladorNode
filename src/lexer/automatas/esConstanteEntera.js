import { Token } from '../token.js';
import { esDigito } from './utils.js';

export function esConstanteEntera (fuente, pos) {
    let i = pos;
    let lexema = '';
    let longitud = fuente.length;

    if (fuente[i] === '-') {
        lexema += fuente[i];
        i++;
    } if (i>= longitud || !esDigito(fuente[i])) {
        return null; // No es una constante entera
    }

    if (i >= longitud || !esDigito(fuente[i])) {
        return null; // No es una constante entera
    }

    while (i < longitud && esDigito(fuente[i])) {
        lexema += fuente[i];
        i++;
    }

    return {
        token: new Token('cE', lexema),
        nuevaPos: i
    };
    
}