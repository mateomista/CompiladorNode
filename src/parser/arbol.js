class NodoArbol {

    constructor(token = null) {
        this.simbolo = token;     // Ej: 'Programa', 'Declaracion', 'id', etc.
        this.hijos = [];            // Lista de nodos hijos    
    }

    agregarHijo(nodoHijo) {
        
        this.hijos.push(nodoHijo);
        return this; 
        
    }
    
}