import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';
import { Usuario } from '../usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario:Usuario = new Usuario();

  constructor(private authService:AuthService , private router:Router) { }

  ngOnInit(): void {
  }

  public login(): void {
    console.log(this.usuario);
    if (this.usuario.username == null || this.usuario.password == null) {
      Swal.fire({
        title:'Error Login',
        text: 'Username o password vacías!',
        icon:'error',
        cancelButtonText:'De acuerdo',
        cancelButtonColor:'red'
      });
      return;
    }
    this.authService.login(this.usuario).subscribe(
      response => {
        console.log(response);

      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token);
      let usuario = this.authService.usuario;

        this.router.navigate(['/productos']);
        Swal.fire({
          title:'Login',
          text: `Hola ${usuario.username},has iniciado sesión con éxito!`,
          icon:'success',
          cancelButtonText:'Ok',
          cancelButtonColor:'green'
        });
      },
      err =>{
        if(err.status == 400){
          Swal.fire({
            title:'Error Login',
            text: 'Usuario o clave incorrectas!',
            icon:'error',
            cancelButtonText:'De acuerdo',
            cancelButtonColor:'red'
          });
        }
      }
    );
  }

}
