import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators  ,ReactiveFormsModule} from '@angular/forms';
import { ProductoInterface } from '../../interfaces/productosinterface';
import { ProductoService } from '../../servicios/producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  add:boolean;
  edit:boolean;
  dele:boolean;
  des_can:boolean;
  namelist:string[];
  presentacionlist:string[]=["Kilogramo","Litro","Caja","Paquete","Rollo"];

  productoItem:ProductoInterface[];
  productoEdit:ProductoInterface={
    nombre:'',
    cantidad:0,
    presentacion:'',
    pventa:0,
    pcompra :0,
  }


  constructor(public ProductoService:ProductoService) { }

  ngOnInit() {
    this.ProductoService.getProducts().subscribe(producto =>{
      this.productoItem=producto;
      for (let item of this.productoItem){
      //this.namelist.push(item.nombre);//leno arreglo de nombres de productos
      }
    });
  }
  onDesbloq(int:string){
    switch(int){
      case "add":{this.add=true}
      case "edit":{this.edit=true}
      case "dele":{this.dele=true}
      case "des_can":{this.des_can=true}//desblqueo de precio unitario
    }
  }
  saveChanges(accion:string,item:ProductoInterface){
    switch(accion){
      case "add":{
        this.ProductoService.addProduct(item);
        this.clean();
      }
      case "edit":{
        this.ProductoService.editProduct(this.productoEdit);
        this.clean();
      }
      case "dele":{
        this.ProductoService.deleteProduct(this.productoEdit.id);
        this.clean();
      }
    }
  }
  clean(){
    this.add=true;
    this.edit=true;
    this.dele=true;
    this.des_can=true;
  }
}
