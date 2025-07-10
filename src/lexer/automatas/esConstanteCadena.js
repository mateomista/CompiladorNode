import { Token } from '../token.js';
import { categoriaCaracter } from './utils.js';

const Q = { q0: 0, q1: 1, q2: 2, q3: 3 };
const EstadosFinales = [Q.q3];

const Delta = [
  /* q0 */ [Q.q2, Q.Err, Q.q1, Q.Err],  // N, ., -, O
  /* q1 */ [Q.q5, Q.Err, Q.Err, Q.Err],
  /* q2 */ [Q.q2, Q.q4, Q.Err, Q.Err],
  /* q3 */ [Q.Err, Q.Err, Q.Err, Q.Err], // estado de error
  /* q4 */ [Q.q6, Q.Err, Q.Err, Q.Err],
  /* q5 */ [Q.q5, Q.q4, Q.Err, Q.Err],
  /* q6 */ [Q.q6, Q.q7, Q.q7, Q.q7],
  /* q7 */ [Q.q7, Q.q7, Q.q7, Q.q7],
  /* Err*/ [Q.Err, Q.Err, Q.Err, Q.Err]
];

export function esConstanteCadena(fuente, pos) {
    let estadoActual = Q.q0;
    let i = pos;
    let lexema = '';
    const longitud = fuente.length;

    if (fuente[i] === '"'){
        
        estadoActual = Delta[estadoActual][0];
        i++; // Avanzamos para empezar a leer la cadena

        while (estadoActual !== Q.q2 && i < longitud) {
            if (fuente[i] === '"') {
                estadoActual = Delta[estadoActual][0]; // Volvemos al estado de aceptación
                i++; // Avanzamos para salir de la cadena
                return {
                    token: new Token('cC', lexema),
                    nuevaPos: i
                };
            } else {
                let categoriaCaracter = categoriaCaracter(fuente[i]);
                estadoActual = Delta[estadoActual][categoriaCaracter + 1]; // +1 porque el primer estado es para el carácter de apertura
                lexema += fuente[i];
                i++;
            }
        }
    } else {
        return false; // No es una cadena válida
    }

    return false; // No es una cadena válida
    
}