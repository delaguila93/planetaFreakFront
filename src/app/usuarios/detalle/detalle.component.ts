import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Usuario } from '../usuario';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit {

  usuario!: Usuario;
  fotoSelecionada!:File;
  progreso: number = 0;

  constructor(private usuarioService:UsuariosService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(params => {
      let id:number = +params.get('id')!;

      if(id){
        this.usuarioService.getUsuario(id).subscribe(usuario =>{
          this.usuario = usuario;
        })
      }


    });
  }

  seleccionarFoto(event:any){
    this.fotoSelecionada = event.target.files[0];
    console.log(this.fotoSelecionada);
  }

  subirFoto() {

    if (!this.fotoSelecionada) {
      Swal.fire({
        title:'Error Upload:',
        text:`Debe seleccionar una foto`,
        icon:'error'
      });

    } else {
      this.usuarioService.subirFoto(this.fotoSelecionada, this.usuario.id)
        .subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progreso = Math.round((event.loaded / event.total!) * 100);
          } else if (event.type === HttpEventType.Response) {
            let response: any = event.body;
            this.usuario = response.cliente as Usuario;
            Swal.fire({
              title:'La foto se ha subido completamente!',
              text:response.mensaje,
              icon:'success'
            });

          }
        });
    }
  }


}
