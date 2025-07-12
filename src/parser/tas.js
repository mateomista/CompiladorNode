import dataForge from 'data-forge';
import { loadExcelData } from './cargarTas.js';

const jsonData = loadExcelData();

const df = new dataForge.DataFrame(jsonData);


export class TAS {

    #df;

  constructor() {
    this.#df = new dataForge.DataFrame(jsonData);
  }

  getDataFrame() {
    return this.#df;
  }

  getColumn(columnName) {
    return this.#df.getSeries(columnName);
  }

  getRow(index) {
    return this.#df.getRow(index);
  }

  filterByColumn(columnName, value) {
    return this.#df.where(row => row[columnName] === value);
  }

  getRowByName(columnName, value) {
    const filtered = this.#df.where(row => row[columnName] === value);
    return filtered.count() > 0 ? filtered.first() : null;
  }

   getValueAt(rowColumnName, rowValue, targetColumnName) {
    const row = this.getRowByName(rowColumnName, rowValue);
    if (row && targetColumnName in row) {
      return row[targetColumnName];
    }
    return null;
  }
}

const tas = new TAS(jsonData);

const valor = tas.getValueAt('__EMPTY', 'Declaracion ', 'id');
if (valor === null) {
  console.log('No se encontró el valor.');
} else {
  console.log(`El valor es: ${valor}`);
}
