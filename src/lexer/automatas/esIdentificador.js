import { categoriaCaracter } from './utils.js';
import { Token } from '../token.js';

const Q = { q0: 0, q1: 1, q2: 2, q3: 3 };
const EstadosFinales = [Q.q3]; 
const Delta = [
    /* q0 */ [Q.q1, Q.q2, Q.q2],  // para Letra, Numero, otro
    /* q1 */ [Q.q1, Q.q1, Q.q3],
    /* q2 */ [Q.q2, Q.q2, Q.q2],
   /* q3 */  [Q.q3, Q.q3, Q.q3]   // estado de aceptación
];

export function esIdentificador(fuente, pos) {
    let estadoActual = Q.q0;
    let i = pos;
    let lexema = '';
    const longitud = fuente.length;


    while (estadoActual !== Q.q2 && i < longitud) {
        let cat = categoriaCaracter(fuente[i]);
        
        if (cat != 2){
            lexema += fuente[i];
        }

        estadoActual = Delta[estadoActual][cat];
        if (EstadosFinales.includes(estadoActual)) {
            return {
            token: new Token('id', lexema),
            nuevaPos: i
            }
        }

        i++;
    }

    return false; // No es un identificador válido

}