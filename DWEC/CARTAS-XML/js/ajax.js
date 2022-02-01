function loadLanguage() {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            loadXML(this);
        }
    };

    xhr.open("GET", "idioma.xml", true);
    xhr.send();
}

function loadXML(xml) {
    let docXML = xml.responseXML;

    let elementosLangXML = docXML.getElementsByTagName("LANGUAGE");

    let lang = ""

    if (localStorage.getItem("idioma") != null) {
        lang = localStorage.getItem("idioma")
    } else {
        lang = "ES"
    }

    let elements = elementosLangXML[0].getElementsByTagName(lang)[0];
    
    document.getElementById('puntuacionTexto').textContent = elements.getElementsByTagName("SCORE")[0].textContent;
    document.getElementById('puntuacionTextoRanking').textContent = elements.getElementsByTagName("SCORE")[0].textContent;
    document.getElementById('errorTexto').textContent = elements.getElementsByTagName("ERRORS")[0].textContent;
    document.getElementById('top-player').textContent = elements.getElementsByTagName("TOP_PLAYER")[0].textContent;
    document.getElementById('idiomaTexto').textContent = elements.getElementsByTagName("LANGUAGE")[0].textContent;
}

function loadDescription() {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("descripcion").innerHTML = this.responseText;
        }
    };

    let fichero = "";

    if (localStorage.getItem("idioma") != null) {
        fichero = ("descripcion/descripcion_" + localStorage.getItem("idioma") + ".txt");
    } else {
        fichero = ("descripcion/descripcion_es.txt");
    }

    xhr.open("GET", fichero, true);

    xhr.send();
}

function barraInformativaTexto(estado) {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let docXML = this.responseXML;

            let elementosLangXML = docXML.getElementsByTagName("LANGUAGE");

            let lang = ""

            if (localStorage.getItem("idioma") != null) {
                lang = localStorage.getItem("idioma")
            } else {
                lang = "ES"
            }

            let elements = elementosLangXML[0].getElementsByTagName(lang)[0];

            barra_informativa.textContent = elements.getElementsByTagName(estado)[0].textContent;
        }
    };

    xhr.open("GET", "idioma.xml", true);
    xhr.send();
}

loadLanguage();
loadDescription();