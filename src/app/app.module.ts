import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { FormsModule, FormGroup,FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '../environments/environment';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule} from 'angularfire2/firestore';

import { AppComponent } from './app.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { DeudoresComponent } from './componentes/deudores/deudores.component';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/auth/login/login.component';
import { AdminComponent } from './componentes/admin/admin.component';


import {AlmacenService} from './servicios/almacen.service';
import {HomeService} from './servicios/home.service';
import {DeudasService} from './servicios/deudas.service';
import {UserService} from './servicios/user.service';
import {ProductoService} from './servicios/producto.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductosComponent } from './componentes/productos/productos.component';



const routes: Routes = [
{ path: '', component: DeudoresComponent },
{ path: 'admin', component: AdminComponent } ,
{ path: 'home', component: HomeComponent } ,
{ path: 'deudores', component: DeudoresComponent } ,
{ path: 'almacen', component: ProductosComponent },
{ path: 'login', component: LoginComponent },
{ path: '**', component: DeudoresComponent }
];

@NgModule({
  declarations: [
    AppComponent,
   NavbarComponent,
   DeudoresComponent,
   HomeComponent,
   LoginComponent,
   AdminComponent,
   ProductosComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
   AngularFireModule.initializeApp(environment.FireConfig, 'appTiendaBD'),
   AngularFirestoreModule,
    FormsModule,
   ReactiveFormsModule,
   BrowserAnimationsModule
  ],
  providers: [AlmacenService,HomeService,DeudasService,UserService,ProductoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
