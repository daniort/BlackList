import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  menumobile:boolean=false;
  menu:boolean=false;

  constructor() { }

  ngOnInit() {
  }
  onMostrarmenu(){
    this.menu=!this.menu;
    this.menumobile=!this.menumobile
  }
}
