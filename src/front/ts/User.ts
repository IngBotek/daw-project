
// La clase User tiene los Metodos id, name, email aclarando su tipo.
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