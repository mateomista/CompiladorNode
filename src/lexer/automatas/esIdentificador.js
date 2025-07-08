import { esLetra, esDigito } from './utils.js';
import { Token } from '../token.js';

export function esIdentificador(fuente, pos) {
    let i = pos;
    let lexema = '';
    const longitud = fuente.length;

    // Identificador tiene que comenzar con una letra 
    if (esLetra(fuente[i])) {
        lexema += fuente[i];
        i++;

        while (i < longitud && esLetra(fuente[i]) || esDigito(fuente[i])) {
            lexema += fuente[i];
            i++;
        }
    } else {
        return null; // No es un identificador
    }

    return {
        token: new Token('id', lexema),
        nuevaPos: i
    };
}