function loadLanguage() {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            loadJSON(this.responseText);
        }
    };

    xhr.open("GET", "idioma.json", true);
    xhr.send();
}

function loadJSON(json) {
    let docJSON = JSON.parse(json);

    let elementosLangJSON = docJSON["lang"];

    let lang = ""

    if (localStorage.getItem("idioma") != null) {
        lang = localStorage.getItem("idioma")
    } else {
        lang = "es"
    }

    let elements = elementosLangJSON[lang];

    puntuacionTexto.text(elements["score"]);
    puntuacionTextoRanking.text(elements["score"]);
    errorTexto.text(elements["errors"]);
    descripcion.text(elements["game_description"]);
    mostrarTodasLasCartas.text(elements["show_button"]);
    textoIntroduceNombre.text(elements["model_name"]);
    textoSeleccionaDificultad.text(elements["modal_select"]);
    textoFacil.text(elements["modal_easy"]);
    textoDificil.text(elements["modal_challenging"]);
    textoBotonCancelar.text(elements["modal_close"]);
    boton_comenzar_modal.text(elements["modal_start"]);

    if (boton_comenzar.attr("data-estado") == "start") {
        boton_comenzar.text(elements["start_game"]);
    } else {
        boton_comenzar.text(elements["restart_game"]);
    }
}

function barraInformativaTexto(estado) {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let docJSON = JSON.parse(this.responseText);

            let elementosLangJSON = docJSON["lang"];

            let lang = ""

            if (localStorage.getItem("idioma") != null) {
                lang = localStorage.getItem("idioma")
            } else {
                lang = "ES"
            }

            let elements = elementosLangJSON[lang];

            barra_informativa.text(elements[estado]);
        }
    };

    xhr.open("GET", "idioma.json", true);
    xhr.send();
}

loadLanguage();