export function esEspacioOControl(caracter) {
    if (!caracter) return false; // Por si es undefined o cadena vacía
    
    const codigo = caracter.charCodeAt(0);
    return codigo <= 32;
}