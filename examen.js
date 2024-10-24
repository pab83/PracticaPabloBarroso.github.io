let contadorPreguntas = 0;
let preguntasXML;
let opcionCorrecta;
let contadorAciertos=0;

function cargarPreguntas() {
    const peticion = new XMLHttpRequest();
    peticion.open("GET", "preguntas.xml", true);
    peticion.onload = function () {
        if (peticion.status == 200) {
            const docPreguntas = peticion.responseXML;
            preguntasXML = docPreguntas.getElementsByTagName("pregunta");

            siguientePregunta();
        }
        else {
            document.getElementById("PreguntasDiv").innerHTML =
                `<p>Ha fallado la peticion</p>`;
        }

    }
    peticion.send();
}

function siguientePregunta() {
    if (contadorPreguntas < preguntasXML.length) {

        let pregunta = preguntasXML[contadorPreguntas];
        let enunciado = pregunta.getElementsByTagName("enunciado")[0].textContent;
        let opciones = pregunta.getElementsByTagName("opcion");
        let opcionesTexto = "";
        opcionCorrecta = pregunta.getElementsByTagName("respuesta")[0].textContent;

        for (let i = 0; i < opciones.length; i++) {
            let valueOpcion;
            switch(i){
                case 0: valueOpcion = "A";
                    break;
                case 1: valueOpcion = "B";
                    break;
                case 2: valueOpcion = "C";
                    break;
                case 3: valueOpcion = "D";
                    break;
            }

            opcionesTexto += `<p><input type="radio" name="radioOpciones${contadorPreguntas}" value=${valueOpcion}>${opciones[i].textContent}</input></p>`;

        }

        document.getElementById("PreguntasDiv").innerHTML =

            `<p>${contadorPreguntas + 1}${". " + enunciado}</p> ${opcionesTexto}`;

        
    } else verNota();
}

function comprobar() {
    let respuestas = document.getElementsByName(`radioOpciones${contadorPreguntas}`);
    let seleccion = null;

    for (let i = 0; i < respuestas.length; i++) {
        if (respuestas[i].checked) {
            seleccion = respuestas[i].value;
            break;
        }
    }
    if (seleccion === opcionCorrecta) {
        contadorAciertos++;
        
    }

    contadorPreguntas++;
    siguientePregunta();



}

function reiniciar() {

    document.getElementById("botones").innerHTML =
    `<button id="btn_SiguientePregunta" onclick="comprobar()"> Siguiente </button> `;
    contadorPreguntas = contadorAciertos = 0;
    
    siguientePregunta();
}

function verNota(){
    
    if(contadorAciertos>5 ){
        document.getElementById("PreguntasDiv").innerHTML =
        `<p>EXAMEN FINALIZADO</p><p>Nota: ${contadorAciertos}</p><p>Enhorabuena!</p>`;
    }else if(contadorAciertos < 5){
        document.getElementById("PreguntasDiv").innerHTML =
        `<p>EXAMEN FINALIZADO</p><p>Nota: ${contadorAciertos}</p><p>Vuelve a intentarlo :(</p>`;
    }
    else{
        document.getElementById("PreguntasDiv").innerHTML =
        `<p>EXAMEN FINALIZADO</p><p>Nota: ${contadorAciertos}</p><p>Por los pelos!</p>`;
    }
    document.getElementById("botones").innerHTML =
        `<button id="btn_Reiniciar" onclick="reiniciar()"> Reintentar </button>`;
}

window.onload = function () {
    cargarPreguntas();

}