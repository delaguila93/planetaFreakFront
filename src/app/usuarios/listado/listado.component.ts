import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';
import { Usuario } from '../usuario';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [
  ]
})
export class ListadoComponent implements OnInit {

  usuarios:Usuario[] = [];
  imageSrc!:string;

  constructor(private usuarioService:UsuariosService,public authService:AuthService) { }

  ngOnInit(): void {

    this.imageSrc = 'assets/avatar.jpg';
    this.usuarioService.getUsuarios().subscribe(usuarios=>{
      this.usuarios =usuarios;
    });
  }

  delete(usuario:Usuario):void{


    Swal.fire({title: 'Está seguro?',
    text: `¿Seguro que desea eliminar el usuario ${usuario.nombre}?`,
    icon: 'warning',
    showDenyButton: true,
    confirmButtonText: 'Si, eliminar!',
    denyButtonText: 'No, cancelar!'
  }).then((result) => {
      if (result.value) {

        this.usuarioService.delete(usuario.id).subscribe(
          () => {
            this.usuarios = this.usuarios.filter(usu => usu !== usuario)
            Swal.fire({
              title:'Usuario Eliminado!',
              text:`Usuario ${usuario.nombre} eliminado con éxito.`,
              icon:'success'
            })

          }
        )

      }
    });


  }

}
