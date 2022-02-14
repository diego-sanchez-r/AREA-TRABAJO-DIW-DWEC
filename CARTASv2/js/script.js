let puntuacionTexto = $("#puntuacionTexto");
let puntuacionTextoRanking = $("#puntuacionTextoRanking");

let errorTexto = $("#errorTexto");
let descripcion = $("#descripcion");

let botonEsp = $("#es");
let botonEng = $("#en");

let barra_informativa = $("#barra-informativa");

let contador_puntos = $("#contador-puntos");
let contador_errores = $("#contador-errores");

let errores = 0;
let puntos = 0;

let nombre = "";
let nick = $("#nick");

let caja_invisible = $("#invisible")[0];

let sonidoCambiarCarta = $('.cambiar')[0];
let sonidoError = $('.error')[0];
let sonidoVictoria = $('.victoria')[0];
let sonidoBomba = $('.bomba')[0];

let boton_comenzar = $("#boton-comenzar");

let barraProgreso = $('.progress-bar')[0];

let ventana_modal = $("#modal");

let boton_comenzar_modal = $("#comenzarModal");
let nombre_modal = $("#nombreModal");

let mostrarTodasLasCartas = $('#mostrarTodasLasCartas');

let listaDeCartasAcertadas = [];

let pulsadoBotonMostrar = false;

let textoIntroduceNombre = $('#textoIntroduceNombre');

let textoSeleccionaDificultad = $('#textoSeleccionaDificultad');

let textoFacil = $('#textoFacil');

let textoDificil = $('#textoDificil');

let textoBotonCancelar = $('#textoBotonCancelar');

let boton_facil = $("#facil");
let boton_normal = $("#normal");
let boton_dificil = $("#dificil");

let dificultad = "";

$(document).ready(function() {

    // Restablece los datos
    let restablecer = () => {
        // Celdas DIV del DOM
        celdaImagen1 = 0;
        celdaImagen2 = 0;

        // Valores que tienen los DIVs
        kebabValor1 = 0;
        kebabValor2 = 0;
    }

    let comenzarJuego = () => {
        if (boton_facil.is(':checked')) {
            dificultad = "facil";
        } else if (boton_normal.is(':checked')) {
            dificultad = "normal";
        } else if (boton_dificil.is(':checked')) {
            dificultad = "dificil";
        }

        // Cogemos el nombre del jugador y la dificultad
        nombre = nombre_modal.val();
        nick.text(nombre);

        // Cerramos la ventana modal
        ventana_modal.modal('hide');

        // Inicalización de variables, llama al método para inicializar las variables a 0
        restablecer();

        // Reinicialización de los contadores de puntos y errores
        contador_puntos.text("0");
        contador_errores.text("0");
        errores = 0;
        puntos = 0;

        // Restablecemos los DIVs y cambiamos el texto de los botones
        boton_comenzar.attr("data-estado", "started");
        loadLanguage();
        quitarSombraATodosLosDivs();

        anadirListenerYDataACartas();

        restablecerBarra();

        // Le aplica el texto a los elementos del DOM las variables guardadas en web storage
        $("#ranking-jugador").text(localStorage.getItem("Jugador"));
        $("#ranking-puntuacion").text(localStorage.getItem("Ranking"));

        let arrayCartas = $('.celda');

        if (dificultad == "facil") {
            mostrarTodasLasCartas.click(function() {
                mostrarTodasLasCartas.attr('disabled', 'disabled');
                if (!pulsadoBotonMostrar) {
                    pulsadoBotonMostrar = true;
                    for (i = 0; i < arrayCartas.length; i++) {
                        arrayCartas[i].innerHTML = "<img src='images/kebabs/kebab" + $(arrayCartas[i]).data('valor') + ".jpg' class='imagen'>";
                    }
                    window.setTimeout(() => {
                        for (i = 0; i < arrayCartas.length; i++) {
                            if (!listaDeCartasAcertadas.includes(arrayCartas[i])) {
                                arrayCartas[i].innerHTML = "";
                            }
                        }
                    }, 2000);
                }
            });
        }
    }

    function abrirVentanaModal() {
        // Abre la ventana y añade el listener de comenzar
        ventana_modal.modal('show');
        nombre_modal.focus();
        boton_comenzar_modal.click(comenzarJuego);
    }

    // Añade el listener de abrir la ventana
    boton_comenzar.click(abrirVentanaModal);

    function comprobarValores(carta, kebab_pulsado) {
        if (celdaImagen2 > 0) {
            celdaImagen1 = 0;
            celdaImagen2 = 0;
        }

        // Comprobamos si las dos variables de celdas ya tienen un valor, les asignamos el target
        if (celdaImagen1 == 0) {
            celdaImagen1 = carta;
        } else {
            celdaImagen2 = carta;
        }

        // Cambiamos el contenido de la primera celda para que aparezca la imagen según su valor
        $(carta).fadeOut(200, function() {
            carta.innerHTML = "<img src='images/kebabs/kebab" + kebab_pulsado + ".jpg' class='imagen'>";
        });

        $(carta).fadeIn(200);

        //$(carta).fadeIn();

        if (kebabValor2 > 0) {
            kebabValor1 = 0;
            kebabValor2 = 0;
        }

        // Comprobamos si las dos variables de kebabs ya tienen un valor, les asignamos el kebab pulsado
        if (kebabValor1 == 0 || celdaImagen1 == celdaImagen2) {
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
            contador_errores.text(errores);

            // Quita la caja invisible
            caja_invisible.style.display = "none";
        }, 500);
    }

    function anadeSombraYQuitaListener(celdaImagen1, celdaImagen2) {
        // A cada celda le añadimos la sombra y le quitamos el listener de click
        listaDeCartasAcertadas.push(celdaImagen1);
        listaDeCartasAcertadas.push(celdaImagen2);
        celdaImagen1.classList.add("sombra");
        $(celdaImagen1).off('click');
        celdaImagen2.classList.add("sombra");
        $(celdaImagen2).off('click');
    }

    function quitarSombraATodosLosDivs() {
        let celdas = $(".celda");

        for (let i = 0; i < celdas.length; i++) {
            celdas[i].classList.remove("sombra");
            celdas[i].innerHTML = "";
        }
    }

    function comprobarRanking() {
        if (errores < parseInt(localStorage.getItem("Ranking")) || localStorage.getItem("Ranking") == null) {
            localStorage.setItem("Ranking", errores);
            localStorage.setItem("Jugador", nombre);
        }
    }

    function restablecerBarra() {
        barraProgreso.style.width = "0%";
    }

    function comprobarPuntuacion() {
        if (puntos == 7) {
            // Cambiamos el estado de la barra informativa
            barraInformativaTexto("message_victory");

            alert("¡Felicidades! Has ganado el juego. Tuviste un total de " + contador_errores.text() + " errores");

            //Ponemos la barra de progeso al 0
            restablecerBarra();

            // Si el número de errores es menor que el de el récord o la cookie no existe, guardamos los valores
            comprobarRanking();

            // Vuelve a comenzar el juego
            abrirVentanaModal();
        }
    }

    function cambiaBarraProgreso(n_puntos) {
        // Calculamos el porcentaje según el número de puntos
        let progreso = Math.round(n_puntos / 7 * 100) + "%";

        // Le aplicamos a la barra el porcentaje
        barraProgreso.style.width = progreso;
        $(barraProgreso).text(n_puntos + " / 7")
    }

    function stopSonidoCambio() {
        sonidoCambiarCarta.pause();
        sonidoCambiarCarta.currentTime = 0;
    }

    function stopSonidoError() {
        sonidoError.pause();
        sonidoError.currentTime = 0;
    }

    function stopSonidoVictoria() {
        sonidoVictoria.pause();
        sonidoVictoria.currentTime = 0;
    }

    function comprobarCartas(carta) {
        carta = carta.currentTarget;

        // Guardamos el valor del evento seleccionado
        let kebab_pulsado = $(carta).data("valor");

        // Comprobamos que tiene un valor
        if (kebab_pulsado != null) {
            ///Sonido cambiar carta
            stopSonidoError();
            stopSonidoVictoria();
            sonidoCambiarCarta.play();

            comprobarValores(carta, kebab_pulsado);

            // Comprobamos que las imágenes sean distintas y que kebab 2 tenga un valor
            if (kebabValor1 != kebabValor2 & kebabValor2 > 0) {
                stopSonidoCambio();
                stopSonidoVictoria();
                sonidoError.play();

                // Cambia el contenido de la barra informativa
                barraInformativaTexto("message_mistake");

                // Cambiamos el contenido de la segunda celda según su valor de kebab
                celdaImagen2.innerHTML = "<img src='images/kebabs/kebab" + $(celdaImagen2).data('valor') + ".jpg' class='imagen'>";

                // Añade una caja invisible que impide seleccionar más cartas
                caja_invisible.style.display = "block";

                // Detiene la página unos instantes y restablece el innerHTML para que se borre la imagen
                detenPagina();

                // Comprobamos que los valores son idénticos (se han acertado las cartas)
            } else if (kebabValor1 == kebabValor2 && celdaImagen1 != celdaImagen2) {
                stopSonidoCambio();
                stopSonidoError();

                sonidoVictoria.play();

                // Les ponemos una sombra y les quitamos el listener
                anadeSombraYQuitaListener(celdaImagen1, celdaImagen2);

                // Sumamos el contador y restablecemos el juego
                puntos++;
                contador_puntos.text(puntos);

                // Añadir mas recorrido a la barra de progreso
                cambiaBarraProgreso(puntos);

                // Cambia el contenido de la barra informativa
                barraInformativaTexto("message_success");

                // Restablecemos los valores
                restablecer();

                // Comprobamos que la puntuación sea de 6 (se ha terminado el juego)
                comprobarPuntuacion();
            }
        }
    }

    function establecerValor(div, lista) {
        // Genera un número aleatorio entre lo que hay en el array lista
        let index = Math.floor(Math.random() * lista.length);

        // Le aplicamos un valor a la celda con el elemento aleatorio de la lista
        $(div).data('valor', lista[index]);

        // Quitamos de la lista el elemento
        lista.splice(index, 1);
    }

    // Recorremos el array para añadirle un listener a todas las celdas y les establecemos un valor de DATA
    function anadirListenerYDataACartas() {
        // Lista que contiene los valores (se repiten porque tiene que salir el mismo número 2 veces)
        let lista = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8];

        for (let i = 0; i < $(".celda").length; i++) {
            establecerValor($(".celda")[i], lista);
        }

        $(".celda").click(comprobarCartas);
    }

    function cambiarTextoIdioma(boton) {
        // Guarda en el web storage el idioma
        localStorage.setItem("idioma", boton.currentTarget.id);

        loadLanguage();
    }

    // Les ponemos un listener a los botones de español e inglés
    botonEsp.click(cambiarTextoIdioma);
    botonEng.click(cambiarTextoIdioma);
});