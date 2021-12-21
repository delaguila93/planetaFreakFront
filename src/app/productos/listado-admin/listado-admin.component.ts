import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/usuarios/auth.service';
import Swal from 'sweetalert2';
import { Producto } from '../producto';
import { ProductoService } from '../productos.service';

@Component({
  selector: 'app-listado-admin',
  templateUrl: './listado-admin.component.html',
  styles: [
  ]
})
export class ListadoAdminComponent implements OnInit {

  productos!:Producto[];

  constructor(private productoService:ProductoService,public authService:AuthService) { }

  ngOnInit(): void {

    this.productoService.getProductos().subscribe(productos=>{
      this.productos = productos;
    });
  }

  delete(producto:Producto):void{


    Swal.fire({title: 'Está seguro?',
    text: `¿Seguro que desea eliminar el producto ${producto.nombre}?`,
    icon: 'warning',
    showDenyButton: true,
    confirmButtonText: 'Si, eliminar!',
    denyButtonText: 'No, cancelar!'
  }).then((result) => {
      if (result.value) {

        this.productoService.delete(producto.id).subscribe(
          () => {
            this.productos = this.productos.filter(pro => pro !== producto)
            Swal.fire({
              title:'Producto Eliminado!',
              text:`Producto ${producto.nombre} eliminado con éxito.`,
              icon:'success'
            })

          }
        )

      }
    });


  }

}
