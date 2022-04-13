var baseDatos = [];
var matriz = [];
var demandas = [];
var ofertas = [];
var coordenadas = [];
var flag = false;

function valorActual(buscar) {
    let i = 0;
    baseDatos.forEach(function (elemento) {
        if (elemento.llave == buscar) {
            i = 1;
            document.getElementById('valorActual').value = elemento.valor;
        }
    });
    if (i == 0) {
        document.getElementById("valorActual").value = "0";
    }
    document.getElementById("valorNuevo").value = "";
}

function guardarAtributo(key, value) {
    nuevo = { llave: key, valor: value };
    let i = 0;
    baseDatos.forEach(function (elemento) {
        if (elemento.llave == nuevo.llave) {
            elemento.valor = nuevo.valor;
            i = 1;
        }
    });
    if (i == 0) {
        baseDatos.push(nuevo);
    }
}

function eliminarAtributoArray(key) {
    for (i = 0; i < baseDatos.length; i++) {
        if (baseDatos[i].llave == key) {
            baseDatos.splice(i, 1);
            break;
        }
    }
}

function eliminarNodo(idNodo) {
    for (i = 0; i < baseDatos.length; i++) {
        if ((baseDatos[i].llave).includes(idNodo)) {
            baseDatos.splice(i, 1);
            i--;
        }
        
    }
}

function mostrarMatriz(ubicacion) {
    var elementosOrigen = document.getElementsByClassName("origen");
    var elementosDestino = document.getElementsByClassName("destino");
    var verticesOrigen = [];
    var verticesDestino = [];
    var filas=0;
    var columnas=0;
    for (i = 1; i < elementosOrigen.length; i++) {
        verticesOrigen.push(elementosOrigen[i].id);
        filas++;
    }
    for (i = 1; i < elementosDestino.length; i++) {
        verticesDestino.push(elementosDestino[i].id);
        columnas++;
    }
    matriz = [];
    //Creamos y paralelamente cereamos la matriz
    for (var f=0; f<filas; f++){
        //Creamos un nuevo array que representa cada fila dentro de la tabla
        var nuevoArray=[];
        for (var c=0; c<columnas; c++){
            //Hacemos push de ceros en el array de acuerdo a la cantidad de columnas que deseamos que tenga
            nuevoArray.push(0);
        }
        // Por ultimo hacemos un push del array dentro de la matriz habiendo concluido una fila
        matriz.push(nuevoArray);
    }
    //Llenamos la matriz con los atributos de la BDD
    for (f = 0; f < baseDatos.length; f++) {
        var origen = baseDatos[f]["llave"].substr(0, 36);
        var destino = baseDatos[f]["llave"].substr(-36);
        var posicionFila = parseInt(verticesOrigen.indexOf(origen),10);
        var posicionColumna = parseInt(verticesDestino.indexOf(destino),10);
        matriz[posicionFila][posicionColumna] = parseInt(baseDatos[f].valor,10);
    }
    console.log(matriz);
    let html = `
    <table>
            <tr>
                <th></th>`;
    for (c = 0; c < columnas; c++) {
        html += `<th>${getNombreDestino(c)}</th>`;
    }
    if(flag==true){
        html += `<th>Ofertas</th>`;
    }
    html +=`</tr>`;

    for (f = 0; f <filas; f++) {
        html += `<tr><td>${getNombreOrigen(f)}</td>`;
        for (c = 0; c < columnas; c++) {
            html += `<td>${matriz[f][c]}</td>`;
        }
        if(flag==true){
            html += `<td>${ofertas[f].oferta}</td></tr>`;
        }
    }
    if(flag==true){
        html += `<tr><td>Demandas</td>`;
        for(k=0; k<columnas; k++){
            html+=`<td>${demandas[k].demanda}</td>`;
        }
        html+=`</tr>`;
    }
    html +=`</table>`;
    $(ubicacion).html(html);
    console.log(ofertas);
    console.log(demandas);
}

// PDF
document.addEventListener("DOMContentLoaded", () => {
    const $boton = document.querySelector("#generador");
    $boton.addEventListener("click", () => {
        const $elementoParaConvertir = document.getElementById("pdf");
        html2pdf()
            .set({
                margin: 1,
                filename: 'grafy.pdf',
                image: {
                    type: 'jpeg',
                    quality: 0.98
                },
                html2canvas: {
                    scale: 3,
                    letterRendering: true,
                },
                jsPDF: {
                    unit: "in",
                    format: "a3",
                    orientation: 'portrait'
                }
            })
            .from($elementoParaConvertir)
            .save()
            .catch(err => console.log(err));
    });
});

function funcionFondoCB() {
    var checkBox = document.getElementById("flexCheckDefault");
    var bg = document.getElementById("diagram");
    if (checkBox.checked == true) {
        bg.style.background = "none";
        bg.style.backgroundColor = "#ffffff"
    } else {
        bg.style.backgroundImage = "url('./resources/Imagen1.png')";
    }
}

function getNombreOrigen(index) {
    nodos = document.getElementsByClassName("origen");
    contenido = nodos[index + 1].innerHTML;
    nombre = contenido.substr(contenido.indexOf("Origen"), contenido.length);
    return nombre;
}

function getNombreDestino(index) {
    nodos = document.getElementsByClassName("destino");
    contenido = nodos[index + 1].innerHTML;
    nombre = contenido.substr(contenido.indexOf("Destino"), contenido.length);
    return nombre;
}

function mostrarInputOfertasyDemandas(){
    var origen = document.getElementsByClassName('origen');
    let htmlOrigen=`Ingrese los siguientes valores de las ofertas: <br><center>`;
    for (i=1; i<origen.length; i++){
        if(ofertas.length==origen.length-1){
            htmlOrigen+=`<label>
            Oferta - Origen ${i}   </label><input onKeypress="if (event.keyCode < 45 || event.keyCode > 57) event.returnValue = false;"
            style="height:2vw; margin-left:1.5vw;" id="of-${i}" value="${ofertas[i-1].oferta}"><br>`;
        }else{
            htmlOrigen+=`<label>
            Oferta - Origen ${i}   </label><input onKeypress="if (event.keyCode < 45 || event.keyCode > 57) event.returnValue = false;"
            style="height:2vw; margin-left:1.5vw;" id="of-${i}"><br>`;
        }
        
    }
    htmlOrigen+=`</center>`;
    $('#ofertas').html(htmlOrigen);
    var destino = document.getElementsByClassName('destino');
    let htmlDestino=`Ingrese los siguientes valores de las demandas: <br><center>`;
    for (i=1; i<destino.length; i++){
        if(demandas.length == destino.length-1){
            htmlDestino+=`<label>
            Demanda - Destino ${i}   </label><input onKeypress="if (event.keyCode < 45 || event.keyCode > 57) event.returnValue = false;"
            style="height:2vw; margin-left:1.5vw;" id="de-${i}" value="${demandas[i-1].demanda}"><br>`;
        }else{
            htmlDestino+=`<label>
            Demanda - Destino ${i}   </label><input onKeypress="if (event.keyCode < 45 || event.keyCode > 57) event.returnValue = false;"
            style="height:2vw; margin-left:1.5vw;" id="de-${i}"><br>`;
        }
        
    }
    htmlDestino+=`</center`;
    $('#demandas').html(htmlDestino);
}
function guardarOfDem(){
    //ofertas = [];
    //demandas = [];
    var origen = document.getElementsByClassName('origen');
    for (i=1; i<origen.length; i++){
        var of = document.getElementById('of-'+i).value;
        var dato = {id: origen[i].id, oferta: of};
        ofertas.push(dato);
    }
    var destino = document.getElementsByClassName('destino');
    for (i=1; i<destino.length; i++){
        var dem = document.getElementById('de-'+i).value;
        var dato = {id: destino[i].id, demanda: dem};
        demandas.push(dato);
    }
    console.log(ofertas);
    console.log(demandas);
    flag = true;
}

function guardarOferta(id, valor){
    var dato = {id: id, oferta: valor};
    ofertas.push(dato);
    flag = true;
    // console.log(ofertas);
}
function guardarDemanda(id, valor){
    var dato = {id: id, demanda: valor};
    demandas.push(dato);
    flag = true;
    // console.log(demandas);

}


function esquinaNoroeste(){
    if(ofertas.length!=0 && demandas.length!=0){
        mostrarMatriz();
        var colExtra = [];
        for(ofer=0; ofer<ofertas.length; ofer++){
            colExtra.push(ofertas[ofer].oferta);
        }
        var filExtra = [];
        for(dm=0; dm<demandas.length; dm++){
            filExtra.push(demandas[dm].demanda);
        }
        coordenadas = [];
        var res = [];
        var val = [];
        var x = 0;
        var y = 0;
        var origen = document.getElementsByClassName('origen');
        var destino = document.getElementsByClassName('destino');
        while(x<(origen.length-1) && y<(destino.length-1)){
            //Se consigue la esquina noroeste.
            var nor = parseInt(matriz[x][y]);
            console.log("La esquina noroeste en este caso es: "+nor);
            console.log(colExtra[x]+"----"+filExtra[y]);
            console.log(x+"---"+y);
            coordenadas.push({fila: x, columna: y});
            if(parseInt(colExtra[x])==parseInt(filExtra[y])){
                //La demanda y la oferta son iguales.
                res.push(parseInt(matriz[x][y]));//Se guarda el valor de esta esquina noroeste.
                val.push(parseInt(colExtra[x]));//Se guarda el valor de usado.
                console.log("La y la oferta se elimina.");
                //Se sigue con la siguiente columna e hilera/fila.
                x++;
                y++;
            } else if(parseInt(colExtra[x])<parseInt(filExtra[y])){
                //La demanda es mayor que la oferta en este caso.
                filExtra[y] = parseInt(filExtra[y])-parseInt(colExtra[x]);
                res.push(parseInt(matriz[x][y]));
                console.log("La "+colExtra[x]+" se elimina.");
                val.push(parseInt(colExtra[x]));
                //Se sigue a la siguiente hilera/fila.
                x++;
            } else{
                //La oferta es mayor que la demanda en este caso.
                colExtra[x] = parseInt(colExtra[x])-parseInt(filExtra[y]);
                res.push(parseInt(matriz[x][y]));
                console.log("La "+filExtra[y]+" se elimina.");
                val.push(parseInt(filExtra[y]));
                //Se sigue a la siguiente columna.
                y++;
            }
        }
        //res.extend(val);
        for(i=0; i<val.length; i++){
            res.push(val[i]);
        }
        console.log(res);
        mostrarMinimizacion(res);
    }else{
        window.alert('Debe ingresar las ofertas y demandas antes de continuar');
    }
    
}
function mostrarMinimizacion(res){
    var filas = document.getElementsByClassName("origen");
    var columnas = document.getElementsByClassName("destino");
    mostrarMatrizMinimo(filas.length-1, columnas.length-1);
    mostrarMatrizFuncionCosto(res, filas.length-1, columnas.length-1);
    mostrarTotal(res);
}
function mostrarMatrizMinimo(filas, columnas){
    let html = `
    <table>
            <tr>
                <th></th>`;
    for (c = 0; c < columnas; c++) {
        html += `<th>${getNombreDestino(c)}</th>`;
    }
    if(flag==true){
        html += `<th>Ofertas</th>`;
    }
    html +=`</tr>`;

    for (f = 0; f <filas; f++) {
        html += `<tr><td>${getNombreOrigen(f)}</td>`;
        for (c = 0; c < columnas; c++) {
            if(buscarCoordenada(f, c)){
                html += `<td style="background-color : #62D6E6;">${matriz[f][c]}</td>`;
            } else {
                html += `<td>${matriz[f][c]}</td>`;
            }
        }
        if(flag==true){
            html += `<td>${ofertas[f].oferta}</td></tr>`;
        }
    }
    if(flag==true){
        html += `<tr><td>Demandas</td>`;
        for(k=0; k<columnas; k++){
            html+=`<td>${demandas[k].demanda}</td>`;
        }
        html+=`</tr>`;
    }
    html +=`</table>`;
    $("#matriz-minimizacion").html(html);
}
function mostrarMatrizFuncionCosto(res, filas, columnas){
    var cantidad = [];
    for(i=(res.length/2); i<res.length; i++){
        cantidad.push(res[i]);
    }
    let html = `
    <table>
            <tr>
                <th></th>`;
    for (c = 0; c < columnas; c++) {
        html += `<th>${getNombreDestino(c)}</th>`;
    }
    if(flag==true){
        html += `<th>Ofertas</th>`;
    }
    html +=`</tr>`;

    var aux = 0;
    for (f = 0; f <filas; f++) {
        html += `<tr><td>${getNombreOrigen(f)}</td>`;
        for (c = 0; c < columnas; c++) {
            if(buscarCoordenada(f,c)){
                html += `<td style="background-color : #62D6E6;">${cantidad[aux]}</td>`;
                aux++;
            } else {
                html += `<td>0</td>`;
            }
        }
        if(flag==true){
            html += `<td>${ofertas[f].oferta}</td></tr>`;
        }
    }
    if(flag==true){
        html += `<tr><td>Demandas</td>`;
        for(k=0; k<columnas; k++){
            html+=`<td>${demandas[k].demanda}</td>`;
        }
        html+=`</tr>`;
    }
    html +=`</table>`;
    $("#funcion-costo-minimo").html(html);
}
function buscarCoordenada(f, c){
    var flag = false;
    for(i=0; i<coordenadas.length; i++){
        if(coordenadas[i].fila==f && coordenadas[i].columna==c){
            flag = true;
            break;
        }
    }
    return flag;
}
function mostrarTotal(res){
    let html = ``;
    var total = 0;
    for(i=0; i<(res.length/2); i++){
        total = total + (parseInt(res[i])*parseInt(res[(res.length/2)+i]));
        html+=`(${res[i]}*${res[(res.length/2)+i]})`;
        if(i!=((res.length/2)-1)){
            html+=`+`;
        }
    }
    html+=` = ${total}`;
    $("#calculo-resultado-minimo").html(html);
}

//--------------------------------------------------------------------------------------------------------------
//Guardar graphy
function guardarGrafo(){
    var nombreArchivo=document.getElementById("nombreArchivo").value;
    var data = document.getElementById('diagram').innerHTML;
    var contenidoBDD = "";
    for(dato=0;dato<baseDatos.length;dato++){
        contenidoBDD+="llave:"+baseDatos[dato].llave+",valor:"+baseDatos[dato].valor+"|";
    }
    data+=`<div class="contenedor-conexiones"><!--${contenidoBDD}--></div>`;

    var contenidoOfertas= "";
    for(dato=0;dato<ofertas.length;dato++){
        contenidoOfertas+="id:"+ofertas[dato].id+",oferta:"+ofertas[dato].oferta+"|";
    }
    data+=`<div class="contenedor-ofertas"><!--${contenidoOfertas}--></div>`;

    var contenidoDemandas= "";
    for(dato=0;dato<demandas.length;dato++){
        contenidoDemandas+="id:"+demandas[dato].id+",demanda:"+demandas[dato].demanda+"|";
    }
    data+=`<div class="contenedor-demandas"><!--${contenidoDemandas}--></div>`;

    var textFileAsBlob = new Blob([data], {type:'text/txt'});
    // Specify the name of the file to be saved
    var fileNameToSaveAs = nombreArchivo+".txt";

    // create a link for our script to 'click'
    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "My Hidden Link";
    
    // allow our code to work in webkit & Gecko based browsers
    // without the need for a if / else block.
    window.URL = window.URL || window.webkitURL;
        
    // Create the link Object.
    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    // when link is clicked call a function to remove it from
    // the DOM in case user wants to save a second file.
    downloadLink.onclick = destroyClickedElement;
    // make sure the link is hidden.
    downloadLink.style.display = "none";
    // add the link to the DOM
    document.body.appendChild(downloadLink);
    
    // click the new link
    downloadLink.click();

    function destroyClickedElement(event){
    //remove the link from the DOM
        document.body.removeChild(event.target);
    }
}
//--------------------------------------------------------------------------------------------------------------
//Subir grafo
function subirGrafo(evento){
    document.getElementById('diagram').innerHTML='';
    let archivo = evento.target.files[0];
    if(archivo){
        let reader = new FileReader();
        reader.onload = function(e){
            let contenido = e.target.result;
            document.getElementById('diagram').innerHTML = contenido;    
        }
        reader.readAsText(archivo);
        document.querySelector("#habilitar-div").classList.add('habilitar-activo');
    } else {
        window.alert("No se ha seleccionado un archivo.");   
    }
}
// Funcion para detectar la carga del archivo
window.addEventListener('load', () => {
    document.getElementById('file-input').addEventListener('change', subirGrafo);
});

// Funcion para activar el input-file al presionar el boton Subir graphy.
document.getElementById("subirGrafo").addEventListener('click', function() {
    document.getElementById("file-input").click();
});