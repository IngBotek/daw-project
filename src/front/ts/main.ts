/*=============================================================================
 * Authors: Agustin Bassi, Brian Ducca, Santiago Germino 
 * Date: Jul 2020
 * Licence: GPLV3+
 * Project: DAW - CEIoT - Project Structure
 * Brief: Main frontend file (where the logic is)
=============================================================================*/
// Con interface tratamos de definir que los datos que vamos a recibir, seran de ese tipo string
interface DeviceInt{
    id:string;
    name:string;
    description:string;
    state:string;
    type:string;
}

// Variable Global
var Apagar:string;
var eliminar:string;
var url:string;
//var Data:DeviceInt[];

class Main implements EventListenerObject, GETResponseListener, POSTResponseListener {

    //Atributos definidos
    myf:MyFramework;
    counter:number=0;
    view:ViewMainPage;
    main():void{
       console.log("Estamos en main()");  
       let usuarios:Array<User>;
       usuarios = new Array<User>();
       usuarios.push (new User(1,"Agustin","agustin@hotmail.com"));
       usuarios.push (new User(2,"Brian","Brian@hotmail.com"));
       usuarios.push (new User(3,"Santiago","Santiango@hotmail.com"));
       for(let i in usuarios){
           usuarios[i].printInfo();
       }

       // Ejercicio 4
       // Creamos el objeto myf para MyFramework instanciadolo con MyFramework.
       this.myf = new MyFramework();
       this.view = new ViewMainPage(this.myf);
       // Boton va a tener almacenado la direccion del elemento html con el id "boton"
       let boton:HTMLElement = document.getElementById("boton");
       let quitar:HTMLElement = document.getElementById("quitar");
       let agregar:HTMLElement = document.getElementById("agregar");
       //boton.addEventListener("click",()=>{alert("Evento!")} ); //ejemplo con fast arrow Ejercicio 6.1
       boton.addEventListener("click",this);   //Ejecicio 5.4
       quitar.addEventListener("click",this);
       agregar.addEventListener("click",this);
       this.mostrarUsers(usuarios);
       this.myf.requestGET("/dispositivos",this);
    }

    //Metodo ejercicio 4-2.3
    mostrarUsers(usuarios:Array<User>):void{
        for(let i in usuarios){
            usuarios[i].printInfo();
        }
    }

    handleEvent(evt: Event): void{
        console.log(`se hizo "${evt.type}"`);
        let b:HTMLElement = this.myf.getElementByEvent(evt);
        console.log(b);
        if(b.id == "boton"){
            let data = {};
            Apagar = "/Apagar/";
            this.myf.requestPOST("/Apagar/", data, this);
        } else if (b.id == "quitar"){
            console.log("Se apreto quitar");
            url = "/ListaEliminar";
            this.myf.requestGET("/ListaEliminar",this);
            //this.view.showRemove();
        } else if (b.id == "agregar"){
            console.log("Se apreto agregar")
            this.view.showForm();
        } else if (b.id.includes("cruz")){
            console.log("Se apreto cruz eliminar");
            eliminar = "/eliminar"
            let INT = b.id.slice(5);
            let data = {"cruz_id": `${parseInt(INT)}`};
            this.myf.requestPOST("/eliminar",data, this);
        }else {
            let state:boolean = this.view.getSwitchStateById(b.id);
            let data = {"id":`${b.id}`, "state":state};
            this.myf.requestPOST("/dispositivos/", data, this);
        }
    }

    handleGETResponse(status: number, response: string): void {
        if(url=="/ListaEliminar"){
            let data: DeviceInt[] = JSON.parse(response); //Me devuelve el arreglo de dispositivos
            this.view.showRemove(data);
            for(let d of data){
                let b:HTMLElement = this.myf.getElementById(`cruz_${d.id}`);
                b.addEventListener ("click", this);
            }
        } else {
            console.log("Respuesta del servidor: " + response);
            //Definimos un arreglo data de tipo DeviceInt.
            let data: DeviceInt[] = JSON.parse(response); //Me devuelve el arreglo de dispositivos
            console.log(data);
            this.view.showDevices(data);
            //recien aca es donde se pueden obtener los elementos por id porque los campos deben ser completados primero
            //recordemos que el codigo html se esta completando sobre la ejecucion del codigo deoendiendo de lo que venga en el json
            for(let d of data){
               let b:HTMLElement = this.myf.getElementById(`${d.id}`);
               b.addEventListener ("click", this);
            } 

        }
    }

    handlePOSTResponse(status: number, response: string): void {
            console.log(status);

            // Para recargar la pagina cuando se apagan los dispositivos.
            if(Apagar == "/Apagar/"){
                location.reload();
            }
            if(eliminar == "/eliminar"){
                location.reload();
            }

            //console.log(response);
    } 

}

// window.onload = () => { Asi estariamos definiendo una funcion anonima, pero con la ventaja de capturar el valor de this
window.onload = function () {
    let m:Main = new Main();
    m.main();

}


    //Ejercicio 5.1
    //evento(ev:Event):void {
    //evento():void {
        //console.log("se hizo click!");
        //5.4
        //console.log(this);
        // Vemos que el contenido de this es un objeto HTML, puntualmente el boton!
        // desde el manejador con este mecanimos no podemos obtener una instancia validad de this. 
   // }

//myf.configClick("boton",()=>(this.evento())); // Para el Ej.6, con fastarrow capturamos el contexto de this.

//=======[ Settings, Imports & Data ]==========================================

let user = "TypesScript Users!";

//=======[ Main module code ]==================================================

function greeter(person) {
    return "Hello, " + person;
 }
 
 //document.body.innerHTML = greeter(user);
 console.log("Hola mundo");

//=======[ End of file ]=======================================================
