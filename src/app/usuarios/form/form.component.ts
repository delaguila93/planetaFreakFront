import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';
import { Usuario } from '../usuario';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styles: [
  ]
})
export class FormComponent implements OnInit {

  titulo:string ="Crear Usaurio";

  usuario: Usuario= new Usuario();

  constructor(private usuarioService:UsuariosService, private router: Router,
    private activatedRoute: ActivatedRoute,private authService:AuthService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id')!;
      if (id) {
        this.usuarioService.getUsuario(id).subscribe((usuario) => this.usuario = usuario);
        console.log(this.usuario);
      }

    });
  }

  public create():void{
    console.log("Formulario Enviado");
    console.log(this.usuario);
    this.usuarioService.create(this.usuario)
    .subscribe(
      cliente => {
        this.router.navigate(['/login']);
        Swal.fire({
          title:'Cliente Actualizado',
          text: `El usuario ${this.usuario.nombre} ha sido creado con éxito`,
          icon:'success'
        });
      },
      err => {
       // this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );
  }

  update(): void {
    console.log(this.usuario);
    this.usuarioService.update(this.usuario)
      .subscribe(
        json => {
          this.router.navigate(['/clientes']);
          Swal.fire({
            title:'Usuario Actualizado',
            text: `${this.usuario.nombre}`,
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
