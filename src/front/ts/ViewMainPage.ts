class ViewMainPage{
    private myf:MyFramework;
    constructor(myf:MyFramework){
        this.myf=myf;
    }

    showDevices(list:DeviceInt[]):void{
        let e:HTMLElement = this.myf.getElementById ("devicesList");
        let imagenpage:string;
        let state:string;
        for(let dev of list){
        imagenpage = dev.type == "0" ? "static/images/lightbulb.png" : "static/images/window.png";
        state = dev.state == "1" ? "checked" : "";
        e.innerHTML+= `<li class="collection-item avatar">
                        <img src=${imagenpage} alt="" class="circle">
                        <span class="title">${dev.name}</span>
                        <p>${dev.description}</p>
                        <a href="#!" class="secondary-content">
                        <div class="switch">
                            <label>
                             Off
                            <input id="${dev.id}" type="checkbox" ${state}>
                            <span class="lever"></span>
                             On
                            </label>
                        </div>
                        </a>
                        </li>`;
        }
    }

    showForm():void{
        let form:HTMLElement=this.myf.getElementById("todo");
        form.innerHTML=`<div class="container"><div class="row">
        <form class="col s12" action="/BaseFormulario" method="post">
          <div class="row">
            <div class="input-field col s6">
              <input name="d1" id="ID" type="text" required>
              <label for="insertar ID">Insertar ID</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s6">
              <input name="d2" id="Nombre" type="text" required>
              <label for="insertar Nombre">Insertar Nombre</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s6">
              <input name="d3" id="Descripcion" type="text" required>
              <label for="insertar Descripción">Insertar Descripción</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s6">
              <input name="d4" id="Estado" type="number" required min="0" max="1">
              <label for="instertar Estado">Instertar Estado</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s6">
              <input name="d5" id="Tipo" type="number" required min="0" max="1">
              <label for="insertar Tipo">Insertar Tipo</label>
            </div>
          </div>
          <button class="btn waves-effect waves-light" type="submit" name="action">Submit
            <i class="material-icons right">send</i>
          </button>
        </form>
      </div>
      </div>`;
    }

  showRemove(list:DeviceInt[]):void{
      let quit:HTMLElement=this.myf.getElementById("todo");
      let imagenpage:string;
      quit.innerHTML = `<div class="container"><ul id="ulagregado" class="collection"></ul><div>`;
      let quite:HTMLElement=this.myf.getElementById("ulagregado");
      for(let dev of list){
      imagenpage = dev.type == "0" ? "static/images/lightbulb.png" : "static/images/window.png";
      quite.innerHTML += `<li class="collection-item avatar">
                      <img src=${imagenpage} alt="" class="circle">
                      <span class="title">${dev.name}</span>
                      <p>${dev.description}</p>
                      <div class="secondary-content">
                          <a class="btn-floating btn-small waves-effect waves-light red" ><i class="material-icons" id="cruz_${dev.id}" >clear</i></a>
                      </div>
                      </li>`;
      }
    }

    getSwitchStateById(id:string):boolean{
       let e:HTMLElement = this.myf.getElementById(id);
       let i:HTMLInputElement = <HTMLInputElement> e;
       
       return i.checked;
    }
}