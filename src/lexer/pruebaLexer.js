import { lexer } from './lexer.js';
import { TablaDeSimbolos } from './tablaDeSimbolos.js';
import fs from 'node:fs';

const filePath = '../src/data/program.txt';

function cargarFuente() {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return data;
    } catch (err) {
        console.error(`Error al leer el archivo: ${err}`);
        return '';
    }
}

const fuente = cargarFuente();



export function proximoComponenteLexico (pos) {

    let tablaDeSimbolos = new TablaDeSimbolos();
    tablaDeSimbolos = lexer(fuente, tablaDeSimbolos, pos);
    
}


/*
while (!contiene) {
    let resultado = lexer(fuente, tablaDeSimbolos, pos);
    pos = resultado.nuevaPos;

    console.log(tablaDeSimbolos.simbolos);
    contiene = tablaDeSimbolos.contieneFinDeArchivo('$');
} */