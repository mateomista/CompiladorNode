export function esDigito(caracter) {
    return caracter >= '0' && caracter <= '9';
}

export function esLetra(caracter) {
    return (caracter >= 'a' && caracter <= 'z') || (caracter >= 'A' && caracter <= 'Z');
}