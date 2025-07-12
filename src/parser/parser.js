import { AnalizadorLexico } from "../lexer/lexer.js";
import dataForge from 'data-forge';
import { TAS } from "./tas.js";

const analizadorLexico = new AnalizadorLexico();
const tas = new TAS();

function obtenerNoTerminales(analizadorLexico) {
  
  const primeraColumna = tas.getColumn('__EMPTY');
  // Convertimos a array y filtramos valores únicos y no nulos
  const noTerminales = [...new Set(primeraColumna.toArray().filter(v => v !== null && v !== undefined && v !== ''))];
  return noTerminales;
}

let noTerminales = obtenerNoTerminales(analizadorLexico);

console.log('No terminales:', noTerminales);