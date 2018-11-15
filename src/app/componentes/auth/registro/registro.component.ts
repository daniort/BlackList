import { Component, OnInit } from '@angular/core';
import    {    FormControl,    FormGroup,    FormBuilder,    Validators    }    from '@angular/forms';
import { UserInterface } from '../../../interfaces/userinterface';
import {UserService} from '../../../servicios/user.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  newUser:UserInterface={
    user:'',
    pass:'',
  }
  registroForm: FormGroup;
  pass:string='';
  passMatch:boolean=null;
constructor(public UserService:UserService,
                      private fb: FormBuilder) { }
ngOnInit() {

  //this.registroForm = this.fb.group({ buscar: '' });
  this.registroForm = this.fb.group({
    'user': ['', [ Validators.required,
                      Validators.maxLength(40),
                      Validators.minLength(6)]],
    'pass': ['', [ Validators.required,
      Validators.maxLength(6),
      Validators.minLength(4)]],
    'passTwo': ['', [Validators.required,
      Validators.maxLength(6),
      Validators.minLength(4)]]
});


  this.registroForm.get('user').valueChanges.subscribe(val =>{
    val.toUpperCase();
    this.newUser.user=val;
    console.log(this.newUser.user)
  });
  this.registroForm.get('pass').valueChanges.subscribe(val =>{
    console.log("tecleaste en pass");
    this.newUser.pass=val;
  });
  this.registroForm.get('passTwo').valueChanges.subscribe(val =>{
    console.log("tecleaste en passTwo");
    if (val == this.newUser.pass) {
        this.passMatch=true;
    }
  });

}


newUserdata($event) {
}

}
