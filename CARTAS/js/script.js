let contador_puntos = document.getElementById('contador-puntos');
let contador_errores = document.getElementById('contador-errores');

// Elementos DOM del ranking
let ranking_jugador = document.getElementById('ranking-jugador');
let ranking_puntuacion = document.getElementById('ranking-puntuacion');

let puntuacionTexto = document.getElementById('puntuacionTexto');
let botonEsp = document.getElementById('es');
let botonEng = document.getElementById('en');

let barra_informativa = document.getElementById("barra-informativa");

let errores = 0;

let nombre = "";
let nick = document.getElementById('nick');

let caja_invisible = document.getElementById("invisible");

// 4. Pedimos el nombre del jugador
let pedirNombre = () => {
    nombre = prompt("Dime tu nick:");
    nick.textContent = nombre;
}

let restablecer = () => {
    // Celdas DIV del DOM
    celdaImagen1 = 0;
    celdaImagen2 = 0;

    // Valores que tienen los DIVs
    kebabValor1 = 0;
    kebabValor2 = 0;
}

let comenzarJuego = () => {
    // 1. Inicalización de variables, llama al método para inicializar las variables a 0
    restablecer();

    // Reinicialización de los contadores de puntos y errores
    contador_puntos.textContent = "0";
    contador_errores.textContent = "0";
    errores = 0;

    pedirNombre();

    // Le aplica el texto a los elementos del DOM las variables guardadas en web storage
    ranking_jugador.textContent = localStorage.getItem("Jugador");
    ranking_puntuacion.textContent = localStorage.getItem("Ranking");
}

// Comienza el juego al cargar la página
window.addEventListener("load", comenzarJuego);

function comprobarValores(e, kebab_pulsado) {
    if (celdaImagen2 > 0) {
        celdaImagen1 = 0;
        celdaImagen2 = 0;
    }

    // Comprobamos si las dos variables de celdas ya tienen un valor, les asignamos el target
    if (celdaImagen1 == 0) {
        celdaImagen1 = e.target;
    } else {
        celdaImagen2 = e.target;
    }

    // Cambiamos el contenido de la primera celda para que aparezca la imagen según su valor
    let celda_pulsado = e.target.innerHTML = "<img src='images/kebabs/kebab" + kebab_pulsado + ".jpg' class='imagen'>";

    if (kebabValor2 > 0) {
        kebabValor1 = 0;
        kebabValor2 = 0;
    }

    // Comprobamos si las dos variables de kebabs ya tienen un valor, les asignamos el kebab pulsado
    if (kebabValor1 == 0) {
        kebabValor1 = kebab_pulsado;
    } else {
        kebabValor2 = kebab_pulsado;
    }
}

function detenPagina() {
    window.setTimeout(() => {
        // Restablecemos el innerHTML para quitar la imagen
        celdaImagen1.innerHTML = "";
        celdaImagen2.innerHTML = "";

        // Restablecemos los valores
        restablecer();

        // Suma del contador de errores
        errores++;
        contador_errores.textContent = errores;

        // Quita la caja invisible
        caja_invisible.style.display = "none";
    }, 500);
}

function anadeSombraYQuitaListener() {
    // Guardamos las celdas pulsadas en un array, cogiendo los divs cuyos valores sean el de los kebabs pulsados
    let celdas_pulsadas = document.querySelectorAll("div[value='" + kebabValor1 + "']");

    // A cada celda le añadimos la sombra y le quitamos el listener de click
    celdas_pulsadas[0].classList.add("sombra");
    celdas_pulsadas[0].removeEventListener('click', comprobarCartas);
    celdas_pulsadas[1].classList.add("sombra");
    celdas_pulsadas[1].removeEventListener('click', comprobarCartas);
}

function quitarSombraYAnadirListenerATodosLosDivs() {
    for (let i = 0; i < celdas.length; i++) {
        celdas[i].classList.remove("sombra");
        celdas[i].innerHTML = "";
        celdas[i].addEventListener('click', comprobarCartas);
    }
}

function comprobarRanking() {
    if (errores < parseInt(localStorage.getItem("Ranking")) || localStorage.getItem("Ranking") == null) {
        localStorage.setItem("Ranking", errores);
        localStorage.setItem("Jugador", nombre);
    }
}

function comprobarPuntuacion() {
    if (parseInt(contador_puntos.textContent) == 6) {
        // Cambiamos el estado de la barra informativa
        barraInformativaTexto("message_victory");

        alert("¡Felicidades! Has ganado el juego. Tuviste un total de " + contador_errores.textContent + " errores");

        // Quitamos la sombra a todas las celdas y les volvemos a añadir el listener
        quitarSombraYAnadirListenerATodosLosDivs();

        // Si el número de errores es menor que el de el récord o la cookie no existe, guardamos los valores
        comprobarRanking();

        // Mostramos los valores del jugador con el récord
        /*ranking_jugador.textContent = localStorage.getItem("Jugador");
        ranking_puntuacion.textContent = localStorage.getItem("Ranking");*/

        // Vuelve a comenzar el juego
        comenzarJuego();
    }
}

function comprobarCartas(e) {
    // Guardamos el value del evento seleccionado
    let kebab_pulsado = e.target.getAttribute('value');

    // Comprobamos que tiene un valor
    if (kebab_pulsado != null) {
        comprobarValores(e, kebab_pulsado);

        // Comprobamos que las imágenes sean distintas y que kebab 2 tenga un valor
        if (kebabValor1 != kebabValor2 & kebabValor2 > 0) {
            // Cambia el contenido de la barra informativa
            barraInformativaTexto("message_mistake");

            // Cambiamos el contenido de la segunda celda según su valor de kebab
            celdaImagen2.innerHTML = "<img src='images/kebabs/kebab" + celdaImagen2.getAttribute('value') + ".jpg' class='imagen'>";
            
            // Añade una caja invisible que impide seleccionar más cartas
            caja_invisible.style.display = "block";

            // Detiene la página unos instantes y restablece el innerHTML para que se borre la imagen
            detenPagina();
        // Comprobamos que los valores son idénticos (se han acertado las cartas)
        } else if (kebabValor1 == kebabValor2) {
            // Les ponemos una sombra y les quitamos el listener
            anadeSombraYQuitaListener();

            // Sumamos el contador y restablecemos el juego
            contador_puntos.textContent = (parseInt(contador_puntos.textContent) + 1);

            // Cambia el contenido de la barra informativa
            barraInformativaTexto("message_success");

            // Restablecemos los valores
            restablecer();

            // Comprobamos que la puntuación sea de 6 (se ha terminado el juego)
            comprobarPuntuacion();
        }
    }
}

// 2. Guardamos todas las celdas DIV en un array
let celdas = document.getElementsByClassName('celda');

// Lista que contiene los valores (se repiten porque tiene que salir el mismo número 2 veces)
let lista = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];

let establecerValor = (div) => {
    // Genera un número aleatorio entre lo que hay en el array lista
    let index = Math.floor(Math.random() * lista.length);

    // Le aplicamos un valor a la celda con el elemento aleatorio de la lista
    div.setAttribute('value', lista[index]);

    // Quitamos de la lista el elemento
    lista.splice(index, 1);
}

// 3. Recorremos el array para añadirle un listener a todas las celdas y les establecemos un value
for (let i = 0; i < celdas.length; i++) {
    celdas[i].addEventListener('click', comprobarCartas);

    establecerValor(celdas[i]);
}

function cambiarTextoIdioma(e) {
    // Guarda en el web storage el idioma
    localStorage.setItem("idioma", e.target.getAttribute('id'));

    loadLanguage();
}

// Les ponemos un listener a los botones de español e inglés
botonEsp.addEventListener("click", cambiarTextoIdioma);
botonEng.addEventListener("click", cambiarTextoIdioma);