import { Token } from '../token.js';

const Q = { q0: 0, q1: 1, q2: 2, q3: 3, q4: 4 };
const EstadosFinales = [Q.q3];

const Delta = [
    // MENOS, NUMERO, OTRO
    /* q0 */ [Q.q1, Q.q2, Q.q4],
    /* q1 */ [Q.q4, Q.q2, Q.q4],
    /* q2 */ [Q.q3, Q.q3, Q.q3],
    /* q3 */ [Q.q3, Q.q3, Q.q3],
    /* q4 */ [Q.q4, Q.q4, Q.q4] // error
];

const Sigma = {
    MENOS: 0,   // '-'
    NUMERO: 1,  // dígitos 0-9
    OTRO: 2     // cualquier otro carácter
};

function categoriaCaracter(c) {
    if (c === '-') return Sigma.MENOS;
    if (/[0-9]/.test(c)) return Sigma.NUMERO;
    return Sigma.OTRO;
}

export function esConstanteEntera(fuente, pos) {
    let estadoActual = Q.q0;
    let i = pos;
    let lexema = '';
    const longitud = fuente.length;

    while (estadoActual !== Q.q4 && i < longitud) {
        let cat = categoriaCaracter(fuente[i]);
        estadoActual = Delta[estadoActual][cat];

        if (estadoActual === Q.q1 || estadoActual === Q.q2) {
            lexema += fuente[i];
            i++;
        } else if (estadoActual === Q.q3) {
            // Estado de aceptación
            return {
                token: new Token('cE', lexema),
                nuevaPos: i
            };
        } else {
            // Estado de error
            return false; // No es una constante entera válida
        }
    }

    return false; // No es una constante entera válida
    
}