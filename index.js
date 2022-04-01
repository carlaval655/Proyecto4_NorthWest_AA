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

function mostrarInputOfertasyDemandas(){
    var origen = document.getElementsByClassName('origen');
    let htmlOrigen=`Ingrese los siguientes valores de las ofertas: <br><center>`;
    for (i=1; i<origen.length; i++){
        htmlOrigen+=`<label>
        Oferta - Origen ${i}   </label><input onKeypress="if (event.keyCode < 45 || event.keyCode > 57) event.returnValue = false;"
        style="height:2vw; margin-left:1.5vw;" id="of-${i}"><br>`;
    }
    htmlOrigen+=`</center>`;
    $('#ofertas').html(htmlOrigen);
    var destino = document.getElementsByClassName('destino');
    let htmlDestino=`Ingrese los siguientes valores de las demandas: <br><center>`;
    for (i=1; i<destino.length; i++){
        htmlDestino+=`<label>
        Demanda - Destino ${i}   </label><input onKeypress="if (event.keyCode < 45 || event.keyCode > 57) event.returnValue = false;"
        style="height:2vw; margin-left:1.5vw;" id="de-${i}"><br>`;
    }
    htmlDestino+=`</center`;
    $('#demandas').html(htmlDestino);
}
function guardarOfDem(){
    ofertas = [];
    demandas = [];
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

function esquinaNoroeste(){
    var ofertas1 = [];
    for(ofer=0; ofer<ofertas.length; ofer++){
        ofertas1.push(ofertas[ofer]);
    }
    var demandas1 = [];
    for(dm=0; dm<demandas.length; dm++){
        demandas1.push(demandas[dm]);
    }
    coordenadas = [];
    var res = [];
    var val = [];
    var x = 0;
    var y = 0;
    var origen = document.getElementsByClassName('origen');
    var destino = document.getElementsByClassName('destino');
    while(x<origen.length && y<destino.length){
        //Se consigue la esquina noroeste.
        var nor = parseInt(matriz[x][y]);
        console.log("La esquina noroeste en este caso es: "+nor);
        console.log(ofertas1[x].oferta+"----"+demandas1[y].demanda);
        console.log(x+"---"+y);
        coordenadas.push({fila: x, columna: y});
        if(parseInt(ofertas1[x].oferta)>parseInt(demandas1[y].demanda)){
            //La oferta es mayor que la demanda en este caso.
            ofertas1[x].oferta = parseInt(ofertas1[x].oferta)-parseInt(demandas1[y].demanda);
            res.push(parseInt(matriz[x][y]));
            console.log("La demanda "+demandas1[y].demanda+" se elimina.");
            val.push(parseInt(demandas1[y].demanda));
            //Se sigue a la siguiente columna.
            y++;
        } else if(parseInt(ofertas1[x].oferta)<parseInt(demandas1[y].demanda)){
            //La demanda es mayor que la oferta en este caso.
            demandas1[y].demanda = parseInt(demandas1[y].demanda)-parseInt(ofertas1[x].oferta);
            res.push(parseInt(matriz[x][y]));
            console.log("La oferta "+ofertas1[x].oferta+" se elimina.");
            val.push(parseInt(ofertas1[x].oferta));
            //Se sigue a la siguiente hilera/fila.
            x++;
        } else if(parseInt(ofertas1[x].oferta)==parseInt(demandas1[y].demanda)){
            //La demanda y la oferta son iguales.
            res.push(parseInt(matriz[x][y]));//Se guarda el valor de esta esquina noroeste.
            val.push(parseInt(ofertas1[x].oferta));//Se guarda el valor de oferta demanda usado.
            console.log("La demanda y la oferta se elimina.");
            //Se sigue con la siguiente columna e hilera/fila.
            x++;
            y++;
            break;
        }
    }
    //res.extend(val);
    for(i=0; i<val.length; i++){
        res.push(val[i]);
    }
    console.log(res);
    mostrarMinimizacion(res);
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