// @ts-check

let  notSure: any = 4;
notSure = "Nueva cadena de texto"; // Ahora pasará a ser un string
notSure = false; // Por último es de un tipo boolean
let  lista: any[] = [1, true, "Cadena"];
lista[1] = 100;


function construirNombre(nombre: string, apellido?: string): string{
    if (apellido) return nombre + apellido
    else return nombre
}

enum Profesion{
    Pintor = "Pintor",
    Programador = "Programador",
    Panadero = "Panadero"
}
class  Persona {
    public  nombre: string;
    public  edad: number;
    public profesion : Profesion;
    constructor(nombre: string, edad: number, profesion? : Profesion) {
        this.nombre = nombre;
        this.edad = edad;
        this.profesion = profesion;
    }
    public  saludar(): void {
        console.log("Hola, mi nombre es "+this.nombre+"y tengo "+this.edad+" años y soy "+this.profesion);
    }
}


let  persona = new  Persona("Jonatan", 32);
persona.saludar();
// Hola, mi nombre es Jonatan y tengo 32 años.

let nombre: string = construirNombre(persona.nombre);
console.log(nombre);

let persona2 = new Persona("Diego",22,Profesion.Programador);
console.log(persona2);
persona2.saludar();