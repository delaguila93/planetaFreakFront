import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/usuarios/auth.service';
import Swal from 'sweetalert2';
import { Producto } from '../producto';
import { ProductoService } from '../productos.service';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styles: [
  ]
})
export class EditarProductoComponent implements OnInit {

  producto: Producto = new Producto();
  categorias:string[]=[];

  constructor(private productoService: ProductoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,private authService:AuthService) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id')!;
      if (id) {
        this.productoService.getProducto(id).subscribe((producto) => this.producto = producto);
      }
    });
  }

  update(): void {
    console.log(this.producto);
    this.productoService.update(this.producto)
      .subscribe(
        json => {
          this.router.navigate(['/productos']);
          Swal.fire({
            title:'Producto Actualizado',
            text: `${this.producto.nombre}`,
            icon:'success'
          });
        },
        err => {
          //this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      )
  }

}
