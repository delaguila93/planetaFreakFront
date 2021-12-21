import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of,Observable, map } from 'rxjs';
import { AuthService } from '../usuarios/auth.service';
import { Usuario } from './usuario';



@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  urlEndPoint:string = "http://localhost:8080/api/usuarios";
  urlCreateUser:string = "http://localhost:8080/api/crear";

  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  agregarAuthorizationHeader() {
    let token = this.authService.token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }


  getUsuarios():Observable<Usuario[]>{
    // return of(CLIENTES);
    return this.http.get(this.urlEndPoint).pipe(map( (response) => response as Usuario[] ) );
  }

  create(usuario: Usuario) : Observable<Usuario> {
    return this.http.post<Usuario>(`${this.urlCreateUser}`, usuario, { headers: this.httpHeaders })
  }


  getUsuario(id:number): Observable<Usuario>{
    return this.http.get<Usuario>(`${this.urlEndPoint}/${id}`, { headers: this.agregarAuthorizationHeader() })
  }

  update(usuario: Usuario): Observable<Usuario>{
    return this.http.put<Usuario>(`${this.urlEndPoint}/${usuario.id}`, usuario, { headers: this.agregarAuthorizationHeader() })
  }

  delete(id: number): Observable<Usuario>{
    return this.http.delete<Usuario>(`${this.urlEndPoint}/${id}`, { headers: this.agregarAuthorizationHeader() })
  }



  subirFoto(archivo: File, id:any): Observable<HttpEvent<any>> {

    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);

    let httpHeaders = new HttpHeaders();
    let token = this.authService.token;
    if (token != null) {
      httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    }

    const req = new HttpRequest('POST', `${this.urlEndPoint}/uploads`, formData, {
      reportProgress: true,
      headers: httpHeaders
    });

    return this.http.request(req).pipe(
     resp => resp
    );

  }

  constructor(private http:HttpClient, private authService:AuthService) { }
}
