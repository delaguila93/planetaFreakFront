import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './usuarios/login/login.component';
import { BuscarComponent } from './productos/buscar/buscar.component';
import { DetalleProductoComponent } from './productos/detalle/detalle.component';
import { ComprarComponent } from './productos/comprar/comprar.component';

import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ProductosComponent } from './productos/productos.component';
import { FormComponent } from './usuarios/form/form.component';
import { ProductoService } from './productos/productos.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ListadoAdminComponent } from './productos/listado-admin/listado-admin.component';
import { EditarProductoComponent } from './productos/editar-producto/editar-producto.component';
import { ListadoComponent } from './usuarios/listado/listado.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BuscarComponent,
    DetalleProductoComponent,
    ComprarComponent,
    ProductosComponent,
    FormComponent,
    HeaderComponent,
    FooterComponent,
    ListadoAdminComponent,
    EditarProductoComponent,
    ListadoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,FormsModule,HttpClientModule
  ],
  providers: [ProductoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
