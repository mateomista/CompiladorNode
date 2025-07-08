import { Token } from "../token.js";
import { esDigito } from "./utils.js";

export function esConstanteReal(fuente, pos) {
    let i = pos;
    let lexema = '';
    const longitud = fuente.length;

    if (fuente[i] === '-') {
        lexema += fuente[i];
        i++;
    }

    // que haya al menos un dígito antes del punto decimal
    if (i >= longitud || !esDigito(fuente[i])) {
        return null; // No es una constante real
    }

    // Captura la parte entera antes del punto decimal
    while (i < longitud && esDigito(fuente[i])) {
        lexema += fuente[i];
        i++;
    }

    // debe haber un punto decimal
    if (i >= longitud || fuente[i] !== '.') {
        return null; // No es una constante real
    }

    lexema += fuente[i]; // Agrega el punto decimal al lexema
    i++;

    if (i >= longitud || !esDigito(fuente[i])) {
        return null;  // No hay parte fraccionaria
    }

    while (i < longitud && esDigito(fuente[i])) {
        lexema += fuente[i];
        i++;
    }

    return {
        token: new Token('cR', lexema),
        nuevaPos: i
    };
    
}