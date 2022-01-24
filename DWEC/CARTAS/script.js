let celda1 = 0;
let celda2 = 0;

let kebab1 = 0;
let kebab2 = 0;

let contador = document.getElementById('contador');
let contador_errores = document.getElementById('contador-errores');
let errores = 0;

function comprobarCartas(e) {
    /*let celda1 = e.target.innerHTML;
    let celda2 = e.target.innerHTML;*/

    let kebab_pulsado = e.target.getAttribute('value');

    if (kebab_pulsado != null) {
        if (celda2 > 0) {
            celda1 = 0;
            celda2 = 0;
        }

        if (celda1 == 0) {
            celda1 = e.target;
        } else {
            celda2 = e.target;
        }

        let celda_pulsado = e.target.innerHTML = "<img src='kebabs/kebab" + kebab_pulsado + ".jpg' class='imagen'>";

        if (kebab2 > 0) {
            kebab1 = 0;
            kebab2 = 0;
        }

        if (kebab1 == 0) {
            kebab1 = kebab_pulsado;
        } else {
            kebab2 = kebab_pulsado;
        }

        if (kebab1 != kebab2 & kebab2 > 0) {
            celda2.innerHTML = "<img src='kebabs/kebab" + celda2.getAttribute('value') + ".jpg' class='imagen'>";

            window.setTimeout(() => {
                celda1.innerHTML = "";
                celda2.innerHTML = "";

                restablecer();

                errores++;

                contador_errores.textContent = errores;
            }, 500);


        } else if (kebab1 == kebab2) {
            let celdas_pulsadas = document.querySelectorAll("div[value='" + kebab1 + "']");
            celdas_pulsadas[0].classList.add("borde");
            celdas_pulsadas[0].removeEventListener('click', comprobarCartas);
            celdas_pulsadas[1].classList.add("borde");
            celdas_pulsadas[1].removeEventListener('click', comprobarCartas);

            contador.textContent = (parseInt(contador.textContent) + 1);

            restablecer();

            if (parseInt(contador.textContent) == 6) {
                alert("¡Felicidades! Has ganado el juego. Tuviste un total de " + contador_errores.textContent + " errores");

                for (let i = 0; i < celdas.length; i++) {
                    celdas[i].classList.remove("borde");
                    celdas[i].innerHTML = "";
                    celdas[i].addEventListener('click', comprobarCartas);
                }

                if (getCookie("Ranking") > errores || getCookie("Ranking") != null) {
                    setCookie("Ranking", nombre + " - " + errores, 30);
                }

                ranking.textContent = getCookie("Ranking");

                contador.textContent = "0";
                contador_errores.textContent = "0";
                errores = 0;

                pedirNombre();
            }
        }
    }
}

let restablecer = () => {
    celda1 = 0;
    celda2 = 0;

    kebab1 = 0;
    kebab2 = 0;
}

let celdas = document.getElementsByClassName('celda');

let lista = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];

let establecerValor = (div) => {
    let index = Math.floor(Math.random() * lista.length);

    div.setAttribute('value', lista[index]);

    lista.splice(index, 1);
}

for (let i = 0; i < celdas.length; i++) {
    celdas[i].addEventListener('click', comprobarCartas);

    establecerValor(celdas[i]);
}

let nombre = "";
let nick = document.getElementById('nick');

let pedirNombre = () => {
    nombre = prompt("Dime tu nick:");
    nick.textContent = nombre;
}

let ranking = document.getElementById('ranking');
ranking.textContent = getCookie("Ranking");

//window.onload = pedirNombre;

let puntuacionTexto = document.getElementById('puntuacionTexto');
let botonEsp = document.getElementById('es');
let botonEng = document.getElementById('en');

function cambiarTextoIdioma(e) {
    setCookie('idioma', e.target.textContent, 30);
    if (e.target.textContent == 'ESP') {
        puntuacionTexto.innerHTML = "Puntuación";
    } else {
        puntuacionTexto.innerHTML = "Score";
    }
}

botonEsp.addEventListener("click", cambiarTextoIdioma);
botonEng.addEventListener("click", cambiarTextoIdioma);

if (getCookie('idioma') != null) {
    if (getCookie('idioma') == 'ESP') {
        puntuacionTexto.innerHTML = "Puntuación";
    } else {
        puntuacionTexto.innerHTML = "Score";
    }
}