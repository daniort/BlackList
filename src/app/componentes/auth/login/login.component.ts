import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators  ,ReactiveFormsModule} from '@angular/forms';
import { UserInterface } from '../../../interfaces/userinterface';
import {UserService} from '../../../servicios/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  registrar:boolean=false;
  usuarioNuevo:UserInterface={
    user:"",
    pass:'',
    estado:false
  }
  useritem:UserInterface[];
  namelist:string[];
  firstPass:string;
  secondPass:string;

  contrasena:string;
  usuario:string;

    @Output() activar:EventEmitter<string>=new EventEmitter<string>();

  //passMenssageFail:boolean;
  //userMenssageFail:boolean;

  constructor( private  UserService:UserService) {
          this.namelist=[];
     }

  ngOnInit() {
    this.UserService.getUsers().subscribe(users =>{
            this.useritem=users;
             for (let unaDeuda of this.useritem) {
             this.namelist.push(unaDeuda.user);//llenamos el arreglo de nombres
           }
       });
  }
  enviarDatos(){
    //convertimos los datos a mayusculas
    this.usuarioNuevo.user= this.usuarioNuevo.user.toUpperCase();
    this.usuarioNuevo.pass= this.secondPass.toUpperCase();
    //enviamos el arreglo de la nueva deuda
    this.UserService.addUser(this.usuarioNuevo);
    //this.onCancel();
    this.registrar=false;
    this.ngOnInit();
  }
  onLogin(){
    let c = this.usuario.toUpperCase();
    let d = this.contrasena.toUpperCase();
    for (let unaUsuario of this.useritem) {
      if (c === unaUsuario.user) {
          if (d === unaUsuario.pass) {

            console.log("Coinciden")
            console.log("Enviando" + unaUsuario.id)
           this.activar.emit(unaUsuario.id); //enviamos la id al componente principal
            break
          }else{
            //this.passMenssageFail=true;
            console.log("pass incorrecta ");
          }
      }else{
        console.log("usuario no ecnontrado");
        //console.log(c);
        //console.log(unaUsuario.user);
        //this.userMenssageFail=true;
      }
    }
  }

}
