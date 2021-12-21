import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from 'src/app/usuarios/usuarios.service';
import Swal from 'sweetalert2';
import { Producto } from '../producto';
import { ProductoService } from '../productos.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleProductoComponent implements OnInit {

  producto!: Producto;
  fotoSelecionada!:File;
  progreso: number = 0;


  constructor(private productoService:ProductoService,
    private activatedRoute: ActivatedRoute,private router: Router,private usuarioService:UsuariosService) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(params => {
      let id:number = +params.get('id')!;

      if(id){
        this.productoService.getProducto(id).subscribe(producto =>{
          this.producto = producto;
        })
      }


    });
  }

  comprar(){


    console.log(this.producto);
    this.productoService.comprar(this.producto)
      .subscribe(
        json => {
          this.router.navigate(['/productos']);
          Swal.fire({
            title:'Producto Comprado',
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
