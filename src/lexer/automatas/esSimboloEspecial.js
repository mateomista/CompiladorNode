import { Token } from '../token.js';

export function esSimboloEspecial(fuente, pos) {
    let i = pos;
    const longitud = fuente.length;
    let lexema = '';

    if (i >= longitud) {
        return null; // No hay caracteres para procesar
    }

    switch (fuente[i]) {
        case '+':
            lexema += fuente[i];
            i++;
            return {
                token: new Token('suma', lexema),
                nuevaPos: i
            };
        case '^':
            lexema += fuente[i];
            i++;
            return {
                token: new Token('potencia', lexema),
                nuevaPos: i
            };
        case '-':
            lexema += fuente[i];
            i++;
            return {
                token: new Token('resta', lexema),
                nuevaPos: i
            };
        case '*':
            lexema += fuente[i];
            i++;
            return {
                token: new Token('multiplicacion', lexema),
                nuevaPos: i
            };
        case ':':
            lexema += fuente[i];
            i++;
            if (i < longitud && fuente[i] === '=') {
                lexema += fuente[i];
                i++;
                return {
                    token: new Token('asignacion', lexema),
                    nuevaPos: i
                };
            } else {
                return null; // No es un símbolo especial reconocido
            }

        case '!':
            lexema += fuente[i];
            i++;
            if (i < longitud && fuente[i] === '=') {
                lexema += fuente[i];
                i++;
                return {
                    token: new Token('negacion', lexema),
                    nuevaPos: i
                }; // es negacion
            } else {
                return null; // No es un símbolo especial reconocido
            }
        case '&':
            lexema += fuente[i];
            i++;
            return {
                token: new Token('yLogico',lexema),
                nuevaPos: i
            }
        case '|':
            lexema += fuente[i];
            i++;
            return {
                token: new Token('oLogico', lexema),
                nuevaPos: i
            };
        case '/':
            lexema += fuente[i];
            i++;
            return {
                token: new Token('division', lexema),
                nuevaPos: i
            };
        case ';':
            lexema += fuente[i];
            i++;
            return {
                token: new Token('sE', lexema), // sE para simbolo especial
                nuevaPos: i
            };
        case ',':
            lexema += fuente[i];
            i++;
            return {
                token: new Token('coma', lexema),
                nuevaPos: i
            };
        case '(':
            lexema += fuente[i];
            i++;
            return {
                token: new Token('parAbre', lexema),
                nuevaPos: i
            };
        case ')':
            lexema += fuente[i];
            i++;
            return {
                token: new Token('parCierra', lexema),
                nuevaPos: i
            };
        default:
            return null; // No es un símbolo especial reconocido
    }
}