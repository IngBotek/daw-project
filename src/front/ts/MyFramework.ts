


interface GETResponseListener{
    handleGETResponse(status:number, response:string):void;
}

interface POSTResponseListener{
    handlePOSTResponse(status:number, response:string):void;
}

// Clase creada en el Ejercicio 4
class MyFramework {

    //-----------------------------------------------------------------------------------------------------------------------------
    // getElementById hace referencia a un elemento id (Como si fuera un puntero) 
    // y como estamos en TS, debemos tipar el tipo de dato que va a devolver (HTMLElement).
    getElementById(id:string):HTMLElement{
        let e:HTMLElement;
        // document es un objeto existente en el browser, que contiene elementos del documento HTML
        // en este caso si queremos apuntar a un elemento con getElementById debe tener id definido en el HTML
        e = document.getElementById(id);
        return e;
        //return document.getElementById(id);
    }
    //-----------------------------------------------------------------------------------------------------------------------------
    getElementByEvent(evt:Event):HTMLElement{
        return <HTMLElement>evt.target; //Lo casteamos porque el objeto no es HTMLElement pero deriva de el.
    }
    //-----------------------------------------------------------------------------------------------------------------------------
    configClick(id:string,callback:any):void {
        let b:HTMLElement = document.getElementById(id);
        b.addEventListener("click",()=>{callback();});
    }
    //-----------------------------------------------------------------------------------------------------------------------------
    requestGET(url:string, listener: GETResponseListener):void{
        let xhr: XMLHttpRequest;
        xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    listener.handleGETResponse(xhr.status,xhr.responseText);
                }
                else{
                    listener.handleGETResponse(xhr.status,null);
                }
            }
        }
        xhr.open('GET', url, true);
        xhr.send(null);
    }

    requestPOST(url:string, data:object, listener:POSTResponseListener):void{
        let xhr: XMLHttpRequest;
        xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    listener.handlePOSTResponse(xhr.status,xhr.responseText);
                }
                else{
                    listener.handlePOSTResponse(xhr.status,null);
                }
            }
        };
        xhr.open('POST', url);
        // Envio JSON en el body request (Usar con NODEJS)
        xhr.setRequestHeader("Content-Type","application/json;charset=UTF-8");
        xhr.send(JSON.stringify(data));


        /*let formData:FormData = new FormData();
        for(let key in data) {
            formData.append(key, data[key]);
        }
        xhr.send(formData);*/
    }



}