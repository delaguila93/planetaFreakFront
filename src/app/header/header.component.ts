import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../usuarios/auth.service';
import { Usuario } from '../usuarios/usuario';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class HeaderComponent implements OnInit {

  usuario!:Usuario;

  constructor(public authService: AuthService, private router: Router) { }

  nombreapp:string = "Planeta Freak";
  logout(): void {
    let username = this.authService.usuario.username;
    this.authService.logout();
    Swal.fire({
      title:'Logout',
      text:`Hola ${username}, has cerrado sesión con éxito!`,
      icon:'success',
      confirmButtonColor:'green',
      confirmButtonText:'De Acuerdo'
    });
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    
  }

}
