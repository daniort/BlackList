import { Component, OnInit, Input } from '@angular/core';
import {UserService} from '../../servicios/user.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  menumobile:boolean=false;
  menu:boolean=false;
  nombre:string="daniel";
  @Input("iduser") id:string;
  constructor(private  UserService:UserService) { }

  ngOnInit() {
    this.obtenerUsuario();
  }
  onMostrarmenu(){
    this.menu=!this.menu;
    this.menumobile=!this.menumobile
  }
  obtenerUsuario(){
    this.nombre=this.UserService.getUserbyID(this.id);  
  }
}
