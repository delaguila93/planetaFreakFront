import { Component, OnInit } from '@angular/core';
import { Producto } from '../producto';
import { ProductoService } from '../productos.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  busqueda:Producto[] = [];


  nombreBusqueda:string = "";
  categoriaBusqueda:string = "";
  categorias:string[]=[];

  constructor(private productoService:ProductoService) { }

  ngOnInit(): void {
    this.categorias = ["Videojuegos", "Peliculas", "Merch"];
  }

  buscarNombre(){
    this.productoService.buscarNombre(this.nombreBusqueda).subscribe(productos=>{
      this.busqueda = productos;
    });
  }

  buscarCategoria(){
    this.productoService.buscarCategoria(this.categoriaBusqueda).subscribe(productos=>{
      this.busqueda = productos;
    });
  }

  limpiarBusqueda(){
    this.busqueda = [];
  }

}
