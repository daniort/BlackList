import { Component,Output,Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BlackList';
  @Input() id:string;
  logeado:boolean;

  onLogear(id):void{
    this.id=id;
    if (this.id != null) {
        this.logeado=true;
    }
  }
}
