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
function esquinaNoroeste(){
    var res = [];
    var val = [];
    var x = 0;
    var y = 0;
    while(x<origenesId.length && y<destinosId.length){
        //Se consigue la esquina noroeste.
        var nor = buscarValorFlecha(origenesId[x]+destinosId[y]);
        console.log("La esquina noroeste en este casp es: "+nor);
        if(parseInt(valoresOfertas[x])>parseInt(valoresDemandas[y])){
            //La oferta es mayor que la demanda en este caso.
            valoresOfertas[x] = parseInt(valoresOfertas[x])-parseInt(valoresDemandas[y]);
            res.push(buscarValorFlecha(origenesId[x]+destinosId[y]));
            console.log("La demanda "+valoresDemandas[y]+" se elimina.");
            val.push(parseInt(valoresDemandas[y]));
            //Se sigue a la siguiente columna.
            y++;
        } else if(parseInt(valoresOfertas[x])<parseInt(valoresDemandas[y])){
            //La demanda es mayor que la oferta en este caso.
            valoresDemandas[y] = parseInt(valoresDemandas[y])-parseInt(valoresOfertas[x]);
            res.push(buscarValorFlecha(origenesId[x]+destinosId[y]));
            console.log("La oferta "+valoresOfertas[x]+" se elimina.");
            val.push(parseInt(valoresOfertas[x]));
            //Se sigue a la siguiente columna.
            x++;
        } else if(parseInt(valoresOfertas[x])==parseInt(valoresDemandas[y])){
            //La demanda y la oferta son iguales.
            res.push(buscarValorFlecha(origenesId[x]+destinosId[y]));//Se guarda el valor de esta esquina noroeste.
            val.push(parseInt(valoresOfertas[x]));//Se guarda el valor de oferta demanda usado.
            console.log("La demanda y la oferta se elimina.");
            //Se sigue con la siguiente columna e hilera/fila.
            x++;
            y++;
        }
    }
    //res.extend(val);
    for(i=0; i<val.length; i++){
        res.push(val);
    }
    return res;
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