var baseDatos = [];

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
    var elementos = document.getElementsByClassName("control");
    
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
    var matriz = [];
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
    html += `</tr>`;

    for (f = 0; f <filas; f++) {
        html += `<tr><td>${getNombreOrigen(f)}</td>`;
        for (c = 0; c < columnas; c++) {
            html += `<td>${matriz[f][c]}</td>`;
        }
        html += `</tr>`;
    }
    html += `</table>`;
    $(ubicacion).html(html);
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
        bg.style.backgroundImage = "url('./resources/images/Imagen1.png')";
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

//Botón contactanos
var integrantes = ["Micaela Gordillo", "Alejandra Pacheco", "Naomi Tacachira", "Carla Valencia"];
window.onload = function contactanos(){
    let html = '';
    for (i=0; i<4; i++){
        html += `
            <div class="wrapper">
                <div class="p-card">
                    <div class="card__image card__image--person"><img src="./resources/images/profileWomen.png" alt="integrante"/></div>
                    <div class="card__title card__title--person">Integrante</div>
                    <div class="card__name">${integrantes[i]}</div>
                    <div class="card__description">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt omnis id laborum itaque distinctio qui
                    ut officia, perferendis voluptatem, placeat a et dolorem, quod architecto quos inventore veniam odio
                    nisi?
                    </div>
                    <div class="card__contact card__contact--person clearfix">
                        <a class="one-third" href="#"><img src="./resources/images/facebook.png" alt=""></a>
                        <a class="one-third" href="#"><img src="./resources/images/whatsapp.png" alt=""></a>
                        <a class="one-third no-border" href="#"><img src="./resources/images/in.png" alt=""></a>
                    </div>
                </div>
            </div>`
    }
    $('#informacionContactanos').html(html);
}

//Creamos la matriz de adyacencia 
function matrizMinimizacion(){
    var elementos = document.getElementsByClassName("control");
    var vertices = [];
    let dimension = 0;
    //Se calcula la dimension de la matriz de acuerdo a la cantidad de vertices que hay en el grafo
    for (i = 1; i < elementos.length; i++) {
        vertices.push(elementos[i].id);
        dimension++;
    }
    var matriz = [];
    var a1 = [];
    var a2 = [];
    //Creamos y paralelamente cereamos la matriz
    for (var f=0; f<dimension; f++){
        //Creamos un nuevo array que representa cada fila dentro de la tabla
        var nuevoArray=[];
        for (var c=0; c<dimension; c++){
            //Hacemos push de ceros en el array de acuerdo a la cantidad de columnas que deseamos que tenga
            nuevoArray.push(0);
        }
        // Por ultimo hacemos un push del array dentro de la matriz habiendo concluido una fila
        matriz.push(nuevoArray);
        a1.push(nuevoArray);
        a2.push(nuevoArray);
    }
    //Llenamos la matriz con los atributos de la BDD
    for (f = 0; f < baseDatos.length; f++) {
        var origen = baseDatos[f]["llave"].substr(0, 36);
        var destino = baseDatos[f]["llave"].substr(-36);
        var posicionFila = parseInt(vertices.indexOf(origen),10);
        var posicionColumna = parseInt(vertices.indexOf(destino),10);
        matriz[posicionFila][posicionColumna] = parseInt(baseDatos[f].valor,10);
    }
    var minimosColumnas = [];
    for (c=0; c<dimension; c++){
        minimosColumnas.push(matriz[0][c]);
    }
    for (f=0; f<dimension; f++){
        for (c=0; c<dimension; c++){
            if (matriz[f][c]<minimosColumnas[c]){
                minimosColumnas[c]=matriz[f][c];
            }
        }
    }
    let html = `
        <table>
            <tr>
                <th></th>`;
    for (c = 0; c < verticesColumnas; c++) {
        html += `<th>${getNombreEstacion(c)}</th>`;
    }
    html += `</tr>`;

    for (f = 0; f <d; f++) {
        html += `<tr><td>${getNombreEstacion(f)}</td>`;
        for (c = 0; c < d; c++) {
            html += `<td>${matriz[f][c]}</td>`;
        }
        html += `</tr>`;
    }

    html+= `<tr>`;
    html+= `<td>Minimos</td>`
    for (c=0; c<d; c++){
        html+=`<td>${minCol[c]}</td>`
    }
    html+=`</tr>`;
    html += `</table>`;
    $(ubicacion).html(html);
}
function generarMatrizA1Min(matriz,minCol, d){
    console.log("Matriz Inicial: ", matriz);
    console.log("minCol: ", minCol);
    var a1 = [];
    for (var f=0; f<d; f++){
        var nuevoArray=[];
        for (var c=0; c<d; c++){
            nuevoArray.push(0);
        }
        a1.push(nuevoArray);
    }
    for(f=0; f<d; f++){
        for (c=0;c<d; c++){
            a1[f][c]=parseInt(matriz[f][c],10)-parseInt(minCol[c],10);
        }
    }

    
    var minimosFilas = [];
    for (c=0; c<d; c++){
        minimosFilas.push(a1[c][0]);
    }
    for (f=0; f<d; f++){
        for (c=0; c<d; c++){
            if (a1[f][c]<minimosFilas[f]){
                minimosFilas[f]=a1[f][c];
            }
        }
    }
    mostrarTablaMatrizA1Min(a1, minimosFilas, '#a1-minimizacion', d);
    generarMatrizA2Min(a1,minimosFilas,d);
}
function generarMatrizA2Min(a1,minFil, d){
    console.log("Matriz A1: ", a1);
    console.log("Min Fil: ", minFil);
    var a2 = [];
    for (var f=0; f<d; f++){
        var nuevoArray=[];
        for (var c=0; c<d; c++){
            nuevoArray.push(0);
        }
        a2.push(nuevoArray);
    }
    console.log("Matriz a2: ", a2);
    for(f=0; f<d; f++){
        for (c=0;c<d; c++){
            a2[f][c]=parseInt(a1[f][c],10)-parseInt(minFil[f],10);
        }
    }
    mostrarTablaMatrizA2Min(a2,'#a2-minimizacion', d);
    console.log("Matriz a2: ", a2);
}
function mostrarTablaMatrizMin(matriz, minCol, ubicacion,d){
    let html = `
        <table>
            <tr>
                <th></th>`;
    for (c = 0; c < d; c++) {
        html += `<th>${getNombreEstacion(c)}</th>`;
    }
    html += `</tr>`;

    for (f = 0; f <d; f++) {
        html += `<tr><td>${getNombreEstacion(f)}</td>`;
        for (c = 0; c < d; c++) {
            html += `<td>${matriz[f][c]}</td>`;
        }
        html += `</tr>`;
    }

    html+= `<tr>`;
    html+= `<td>Minimos</td>`
    for (c=0; c<d; c++){
        html+=`<td>${minCol[c]}</td>`
    }
    html+=`</tr>`;
    html += `</table>`;
    $(ubicacion).html(html);
}
function mostrarTablaMatrizA1Min(matriz, minFil, ubicacion,d){
    let html = `
        <table>
            <tr>
                <th></th>`;
    for (c = 0; c < d; c++) {
        html += `<th>${getNombreEstacion(c)}</th>`;
    }
    html+=`<th>Minimos</th>`
    html += `</tr>`;

    for (f = 0; f < d; f++) {
        html += `<tr><td>${getNombreEstacion(f)}</td>`;
        for (c = 0; c < d; c++) {
            html += `<td>${matriz[f][c]}</td>`;
        }
        html+=`<td>${minFil[f]}</td>`
        html += `</tr>`;
    }
    html += `</table>`;
    $(ubicacion).html(html);
}
function mostrarTablaMatrizA2Min(matriz, ubicacion, d){
    let html = `
        <table>
            <tr>
                <th></th>`;
    for (c = 0; c < d; c++) {
        html += `<th>${getNombreEstacion(c)}</th>`;
    }
    html += `</tr>`;

    for (f = 0; f < d; f++) {
        html += `<tr><td>${getNombreEstacion(f)}</td>`;
        for (c = 0; c < d; c++) {
            html += `<td>${matriz[f][c]}</td>`;
        }
        html += `</tr>`;
    }
    html += `</table>`;
    $(ubicacion).html(html);
}


function matrizMaximizacion(){
    var elementos = document.getElementsByClassName("control");
    var vertices = [];
    let dimension = 0;
    //Se calcula la dimension de la matriz de acuerdo a la cantidad de vertices que hay en el grafo
    for (i = 1; i < elementos.length; i++) {
        vertices.push(elementos[i].id);
        dimension++;
    }
    var matriz = [];
    //Creamos y paralelamente cereamos la matriz
    for (var f=0; f<dimension; f++){
        //Creamos un nuevo array que representa cada fila dentro de la tabla
        var nuevoArray=[];
        for (var c=0; c<dimension; c++){
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
        var posicionFila = parseInt(vertices.indexOf(origen),10);
        var posicionColumna = parseInt(vertices.indexOf(destino),10);
        matriz[posicionFila][posicionColumna] = parseInt(baseDatos[f].valor,10);
    }
    var maximosColumnas = [];
    for (c=0; c<dimension; c++){
        maximosColumnas.push(matriz[0][c]);
    }
    for (f=0; f<dimension; f++){
        for (c=0; c<dimension; c++){
            if (matriz[f][c]>maximosColumnas[c]){
                maximosColumnas[c]=matriz[f][c];
            }
        }
    }
    mostrarTablaMatrizMax(matriz,maximosColumnas, '#matriz-maximizacion', dimension);
    generarMatrizA1Max(matriz,maximosColumnas, dimension);
}
function generarMatrizA1Max(matriz,maxCol, d){
    console.log("Matriz Inicial: ", matriz);
    console.log("maxCol: ", maxCol);
    var a1 = [];
    for (var f=0; f<d; f++){
        var nuevoArray=[];
        for (var c=0; c<d; c++){
            nuevoArray.push(0);
        }
        a1.push(nuevoArray);
    }
    for(f=0; f<d; f++){
        for (c=0;c<d; c++){
            a1[f][c]=parseInt(matriz[f][c],10)-parseInt(maxCol[c],10);
        }
    }

    
    var maximosFilas = [];
    for (c=0; c<d; c++){
        maximosFilas.push(a1[c][0]);
    }
    for (f=0; f<d; f++){
        for (c=0; c<d; c++){
            if (a1[f][c]>maximosFilas[f]){
                maximosFilas[f]=a1[f][c];
            }
        }
    }
    mostrarTablaMatrizA1Max(a1, maximosFilas, '#a1-maximizacion', d);
    generarMatrizA2Max(a1,maximosFilas,d);
}
function generarMatrizA2Max(a1,maxFil, d){
    console.log("Matriz A1: ", a1);
    console.log("MaxFil: ", maxFil);
    var a2 = [];
    for (var f=0; f<d; f++){
        var nuevoArray=[];
        for (var c=0; c<d; c++){
            nuevoArray.push(0);
        }
        a2.push(nuevoArray);
    }
    console.log("Matriz a2: ", a2);
    for(f=0; f<d; f++){
        for (c=0;c<d; c++){
            a2[f][c]=parseInt(a1[f][c],10)-parseInt(maxFil[f],10);
        }
    }
    mostrarTablaMatrizA2Max(a2,'#a2-maximizacion', d);
    console.log("Matriz a2: ", a2);
}
function mostrarTablaMatrizMax(matriz, maxCol, ubicacion,d){
    let html = `
        <table>
            <tr>
                <th></th>`;
    for (c = 0; c < d; c++) {
        html += `<th>${getNombreEstacion(c)}</th>`;
    }
    html += `</tr>`;

    for (f = 0; f <d; f++) {
        html += `<tr><td>${getNombreEstacion(f)}</td>`;
        for (c = 0; c < d; c++) {
            html += `<td>${matriz[f][c]}</td>`;
        }
        html += `</tr>`;
    }

    html+= `<tr>`;
    html+= `<td>Maximos</td>`
    for (c=0; c<d; c++){
        html+=`<td>${maxCol[c]}</td>`
    }
    html+=`</tr>`;
    html += `</table>`;
    $(ubicacion).html(html);
}
function mostrarTablaMatrizA1Max(matriz, maxFil, ubicacion,d){
    let html = `
        <table>
            <tr>
                <th></th>`;
    for (c = 0; c < d; c++) {
        html += `<th>${getNombreEstacion(c)}</th>`;
    }
    html+=`<th>Maximos</th>`
    html += `</tr>`;

    for (f = 0; f < d; f++) {
        html += `<tr><td>${getNombreEstacion(f)}</td>`;
        for (c = 0; c < d; c++) {
            html += `<td>${matriz[f][c]}</td>`;
        }
        html+=`<td>${maxFil[f]}</td>`
        html += `</tr>`;
    }
    html += `</table>`;
    $(ubicacion).html(html);
}
function mostrarTablaMatrizA2Max(matriz, ubicacion, d){
    let html = `
        <table>
            <tr>
                <th></th>`;
    for (c = 0; c < d; c++) {
        html += `<th>${getNombreEstacion(c)}</th>`;
    }
    html += `</tr>`;

    for (f = 0; f < d; f++) {
        html += `<tr><td>${getNombreEstacion(f)}</td>`;
        for (c = 0; c < d; c++) {
            html += `<td>${matriz[f][c]}</td>`;
        }
        html += `</tr>`;
    }
    html += `</table>`;
    $(ubicacion).html(html);
}