import { Token } from '../token.js';

const Q = { q0: 0, q1: 1, q2: 2, q3: 3, q4: 4, q5: 5 };
const EstadosFinales = [Q.q3];

const Sigma = {
  MENOS: 0,
  NUMERO: 1,
  PUNTO: 2,
  OTRO: 3
};

const Delta = [
    // para '-', numero, '.', otro
  /* q0 */ [Q.q2, Q.q1, Q.q5, Q.q5],
  /* q1 */ [Q.q5, Q.q1, Q.q4, Q.q5],
  /* q2 */ [Q.q5, Q.q2, Q.q4, Q.q5],
  /* q3 */ [Q.q3, Q.q3, Q.q3, Q.q3], // estado de aceptación
  /* q4 */ [Q.q5, Q.q4, Q.q5, Q.q5],
  /* q5 */ [Q.q5, Q.q5, Q.q5, Q.q5] // estado de error
];

// Función para categorizar caracteres
function categoriaCaracter(c) {
  if (c === '-') return Sigma.MENOS;
  if (/[0-9]/.test(c)) return Sigma.NUMERO;
  if (c === '.') return Sigma.PUNTO;
  return Sigma.OTRO;
}

export function esConstanteReal(fuente, pos) {
    let estadoActual = Q.q0;
    let i = pos;
    let lexema = '';
    const longitud = fuente.length;
    
    while (estadoActual !== Q.q5 && i < longitud) {
        let cat = categoriaCaracter(fuente[i]);
        estadoActual = Delta[estadoActual][cat];
    
        if (estadoActual === Q.q1 || estadoActual === Q.q2 || estadoActual === Q.q4) {
        lexema += fuente[i];
        i++;
        } else if (estadoActual === Q.q3) {
        // Estado de aceptación
        return {
            token: new Token('cR', lexema),
            nuevaPos: i
        };
        } else {
        // Estado de error
            return false; // No es una constante real válida
        }
    }
    
    return false; // No es una constante real válida
}