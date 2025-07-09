export function esDigito(caracter) {
    return caracter >= '0' && caracter <= '9';
}

export function esLetra(caracter) {
    return (caracter >= 'a' && caracter <= 'z') || (caracter >= 'A' && caracter <= 'Z');
}

const Sigma = {
    LETRA: 0,
    DIGITO: 1,
    OTRO: 2
};

export function categoriaCaracter(c) {
    if (/[a-zA-Z]/.test(c)) return Sigma.LETRA;
    if (/[0-9]/.test(c)) return Sigma.DIGITO;
    return Sigma.OTRO;
}