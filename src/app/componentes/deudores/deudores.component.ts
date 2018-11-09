import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators  ,ReactiveFormsModule} from '@angular/forms';
import { DeudorInterface } from '../../interfaces/deudorinterface';
import {DeudasService} from '../../servicios/deudas.service';

@Component({
  selector: 'app-deudores',
  templateUrl: './deudores.component.html',
  styleUrls: ['./deudores.component.css']
})
export class DeudoresComponent implements OnInit {
  //Declaracion de variables
  myForm: FormGroup;
  //////////////////////////////////////7
  deudoritem:DeudorInterface[];
  deudoritemFilter:string[];
  deudoritemAlll:string[];
  deudaParaEditar:DeudorInterface;
  deudornuevo:DeudorInterface={
      nombre:'',
      cantidad:0,
      descripcion:'',
      nota:'',
      fecha:'',
  };
  crearState:boolean=false;
  ediState:boolean=false;
  deleState:boolean=false;
  idToDelete:string;
  totalDeudas=0;
  abono=0;
  resto:number;
  desbloq=false;
  mencrearState:boolean=false;
  menediState:boolean=false;
  mendeleState:boolean=false;
  byBuscar:string;
  filtroActive:boolean=null;
  filtroVacio:boolean=null;
  constructor( public DeudasService:DeudasService,
                          private fb:FormBuilder) { }
  ngOnInit() {
    this.DeudasService.getDeudas().subscribe(deuda =>{
            this.deudoritem=deuda;
             for (let unaDeuda of this.deudoritem) {
             this.totalDeudas += unaDeuda.cantidad;
           }
       });
    this.myForm = this.fb.group({ buscar: '' });
    this.myForm.get('buscar').valueChanges.subscribe(val =>{
      if (val.length != 0){
        let  myArray2=this.getDeudasByNombre(val);
        if (myArray2.length!=0) {
          //se enceuntran resultados
            this.filtroActive=true;
            this.filtroVacio=null;
            this.deudoritemFilter=myArray2;
        }else{
          //Vacio
          this.filtroActive=false;
          this.filtroVacio=true;
          this.deudoritemAlll=this.getDeudasAll();
        }
        console.log(myArray2)
      }else{
        //todos las deudas
        this.filtroActive=false;
        this.filtroVacio=null;
        this.deudoritemAlll=this.getDeudasAll();
      }
    });
  }

  getDeudasAll():string[]{
    let myArray3=[];
    for (let entry of this.deudoritem) {
        myArray3.push(entry);
    }
    return myArray3;
  }
  getDeudasByNombre(val:string):string[]{
    console.log(val);
    let encontrados=0;
    let myArray=[];
    for (let entry of this.deudoritem) {
      let k=0
      for (let i = 0; i < val.length; i++) {
        let a=entry.nombre.charAt(i).toLowerCase( )
        let b=val.charAt(i).toLowerCase( )
          if (a===b) {
              k=k+1;
            }else{
              k=0;
            }
      }
      if (k===val.length) {
          myArray.push(entry);
          encontrados=encontrados+1;
      }
    }
    return  myArray
  }
  onCreateDeuda($event){
        this.crearState=true;
  }
  onEditDeuda($event, deuda: DeudorInterface){
    this.deudaParaEditar=deuda;
    this.ediState=true;
  }
  onCreateYa(){
    this.DeudasService.addDeuda(this.deudornuevo);
    this.onCancel();
    this.totalDeudas=0;
    this.onMensajeCreador();
  }
  onCancel(){
    this.crearState=false;
    this.ediState=false;
    this.deleState=false;
    this.desbloq = false;
    this.abono=0;
    this.deudaParaEditar=null;
    this.deudornuevo={
        nombre:'',
        cantidad:0,
        descripcion:'',
        nota:'',
        fecha:'',
    };
  }
  onDeleteConfirmer($event){
    this.resto=this.deudaParaEditar.cantidad - this.abono;
    if (this.resto==0){
      this.DeudasService.deleteDeuda(this.deudaParaEditar.id);
      this.onCancel();
      this.totalDeudas=0;
      this.onMensajeEliminado();
        }else{
          this.deudaParaEditar.cantidad=this.resto;
          this.DeudasService.editDeuda(this.deudaParaEditar);
          this.onCancel();
          this.totalDeudas=0;
          this.onMensajeEditado();
        }
      }
  onDesbloq($event){
    this.desbloq =! this.desbloq;
  }
  onSaldarDeuda($event,duda: DeudorInterface){
    this.deudaParaEditar=duda;
    this.deleState=true;
  }
  onGuardar($event){
    this.DeudasService.editDeuda(this.deudaParaEditar);
    this.onCancel();
    this.totalDeudas=0;
    this.onMensajeEditado();
  }
  onMensajeCreador(){
    this.mencrearState=true;
    setTimeout(() => {
       this.mencrearState = false;
     }, 2500);
  }
  onMensajeEditado(){
    this.menediState=true;
    setTimeout(() => {
       this.menediState = false;
     }, 2500);
  }
  onMensajeEliminado(){
    this.mendeleState=true;
    setTimeout(() => {
       this.mendeleState = false;
     }, 2500);
  }

}
