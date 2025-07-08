import { Token } from '../token.js';

export function esConstanteCadena(fuente, pos) {
    let i = pos;
    const longitud = fuente.length;

    if (fuente[i] !== '"') {
        return null; // No es una constante cadena
    }
    
    i++;
    let lexema = '';

    while (i < longitud && fuente[i] !== '"') {
        lexema += fuente[i];
        i++;
    }

    if (i >= longitud || fuente[i] !== '"') {
        return null; // No se encontró el cierre de la cadena
    } 

    i++;

    return {
        token: new Token('cC', lexema ),
        nuevaPos: i
    };

}