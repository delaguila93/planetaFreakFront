import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscarComponent } from './productos/buscar/buscar.component';
import {  DetalleProductoComponent } from './productos/detalle/detalle.component';
import { EditarProductoComponent } from './productos/editar-producto/editar-producto.component';
import { ListadoAdminComponent } from './productos/listado-admin/listado-admin.component';
import { ProductosComponent } from './productos/productos.component';
import { DetalleComponent } from './usuarios/detalle/detalle.component';
import { FormComponent } from './usuarios/form/form.component';
import { ListadoComponent } from './usuarios/listado/listado.component';
import { LoginComponent } from './usuarios/login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/productos',
    pathMatch: 'full',

  },
  {
    path: 'productos',
    component: ProductosComponent

  },
  {
    path: 'usuario/ver/:id',
    component: DetalleComponent,
  },
  {
    path:'usuarios/crear',
    component: FormComponent
  },
  {
    path:'usuarios/editar/:id',
    component: FormComponent
  },

  {
    path:'usuarios/listado',
    component: ListadoComponent
  },
   {
    path:'productos/ver/:id',
    component: DetalleProductoComponent
  },
  {
    path:'productos/listado-admin',
    component: ListadoAdminComponent
  },{

    path:'productos/editar/:id',
    component: EditarProductoComponent
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'buscar',
    component: BuscarComponent
  },

  {
    path: '**',
    redirectTo:''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
