/*=============================================================================
 * Authors: Agustin Bassi, Brian Ducca, Santiago Germino 
 * Date: Jul 2020
 * Licence: GPLV3+
 * Project: DAW - CEIoT - Project Structure
 * Brief: Main frontend file (where the logic is)
=============================================================================*/


class Main {
    main():void{
       console.log("estoy en main()");
       let usuarios:Array<User>;
       usuarios = new Array<User>();
       usuarios.push (new User(1,"Agustin","agustin@hotmail.com"));
       usuarios.push (new User(2,"Brian","Brian@hotmail.com"));
       usuarios.push (new User(3,"Santiago","Santiango@hotmail.com"));
       let myframework=new MyFramework();
       // boton va a tener almacenado la direccion del elemento html con el id "boton"
       let boton=myframework.getElementById("boton");
       boton.textContent="Acepto";
       boton.addEventListener("click", this.evento);
       this.mostrarUsers(usuarios);
       for(let i in usuarios){
           usuarios[i].printInfo();
       }
       
    }

    //Metodo ejercicio 4-2.3
    mostrarUsers(usuarios:Array<User>):void{
        for(let i in usuarios){
            usuarios[i].printInfo();
        }
    }
 
    //Ejercicio 5.1
    evento(ev:Event):void {
        console.log("se hizo click!");
        console.log(this);
    }

}
//Ejecicio 4
class MyFramework {
    getElementById(id:string):HTMLElement{
        return document.getElementById(id);
    }

}

class User {
    private _id:number;
    private _name:string;
    private _email:string;
    private _isLogged:boolean;

    constructor(id:number, name:string, email:string){
            this._id = id;
            this._name = name;
            this._email = email;
    }

set id(id:number){
    this._id = id;
}
get id():number{
    return this._id;
}

set name(name:string){
    this._name = name;
}
get name():string{
    return this._name;
}

printInfo():void{
console.log("id ="+ this._id + ". name = " + this._name + ". email = " + this._email); 
}
}


window.onload = function () {
    let m:Main = new Main();
    m.main();

}





//=======[ Settings, Imports & Data ]==========================================

let user = "TypesScript Users!";

//=======[ Main module code ]==================================================

function greeter(person) {
    return "Hello, " + person;
 }
 
 //document.body.innerHTML = greeter(user);
 console.log("Hola mundo");

//=======[ End of file ]=======================================================
