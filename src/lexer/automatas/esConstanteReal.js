import { Token } from '../token.js';

const Sigma = {
  MENOS: 3,
  NUMERO: 0,
  PUNTO: 1,
  OTRO: 2
};

const Q = {
  q0: 0,
  q1: 1,
  q2: 2,
  q4: 4,
  q5: 5,
  q6: 6,
  q7: 7,
  Err: 8
};

const EstadosFinales = [Q.q7];

function categoriaCaracter(c) {
  if (c >= '0' && c <= '9') return Sigma.NUMERO;
  if (c === '.') return Sigma.PUNTO;
  if (c === '-') return Sigma.MENOS;
  return Sigma.OTRO;
}

// Ejemplo simplificado de tabla Delta (debes completarla según tu XML)
const Delta = [
  /* q0 */ [Q.q2, Q.Err, Q.q1, Q.Err],  // N, ., -, O
  /* q1 */ [Q.q5, Q.Err, Q.Err, Q.Err],
  /* q2 */ [Q.q2, Q.q4, Q.Err, Q.Err],
  /* q4 */ [Q.q6, Q.Err, Q.Err, Q.Err],
  /* q5 */ [Q.q5, Q.q4, Q.Err, Q.Err],
  /* q6 */ [Q.q6, Q.q7, Q.q7, Q.q7],
  /* q7 */ [Q.q7, Q.q7, Q.q7, Q.q7],
  /* Err*/ [Q.Err, Q.Err, Q.Err, Q.Err]
];


export function esConstanteReal(fuente, pos) {
    let estadoActual = Q.q0;
    let i = pos;
    let lexema = '';
    const longitud = fuente.length;

    let cat = categoriaCaracter(fuente[i]);
    estadoActual = Delta[estadoActual][cat];
            console.log(`Estado actual: ${estadoActual}, Carácter: '${fuente[i]}', categoría: ${cat}, Lexema: '${lexema}'`);

    

    while (estadoActual !== Q.Err && i < longitud) {
        

        console.log(`Estado actual: ${estadoActual}, Carácter: '${fuente[i]}', categoría: ${cat}, Lexema: '${lexema}'`);


        if (estadoActual === Q.q1 || estadoActual === Q.q2 || estadoActual === Q.q4 ||estadoActual === Q.q5 || estadoActual === Q.q6) {
            lexema += fuente[i];
            i++;
        } else if (estadoActual === Q.q7) {
            // Estado de aceptación
            
                    console.log(`Estado actual: ${estadoActual}, Carácter: '${fuente[i]}', categoría: ${cat}, Lexema: '${lexema}'`);

            return {
                token: new Token('cR', lexema),
                nuevaPos: i
            };
        } else {
            // Estado de error
            return false; // No es una constante real válida
        }
        cat = categoriaCaracter(fuente[i]);
        estadoActual = Delta[estadoActual][cat];
    }
    return false; // No es una constante real válida
}

