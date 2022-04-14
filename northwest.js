var valoresMatriz = []; //[2,2,4,7], [5, 1, 1, 1], [4, 6, 2, 1]
var valoresOfertas = [5, 9, 5];
var valoresDemandas = [2, 7, 7, 3];
var origenesId = [];
var destinosId = [];

function llenarValoresMatriz (){
    var nodos = document.getElementsByClassName("control");
    for(i=0; i<nodos.length; i++){
        var nodo = nodos[i].innerHTML;
        var org = nodo.substr(nodo.indexOf("new "), nodo.indexOf(" ui-draggable"));
        var valFila = [];
        if(org=="origen"){
            for(j=0; j<baseDatos.length; j++){
                if(baseDatos[j].llave.substr(0,36)==nodo.id){
                    valFila.push(baseDatos[j].valor);
                }
            }
            valoresMatriz.push(valFila);
        }
    }
}

function buscarValorFlecha(id){
    var valor = 0;
    for(i=0; i<valoresMatriz.length; i++){
        if(valoresMatriz.llave == id){
            valor = valoresMatriz.valor;
        }
    }
    return valor;
}