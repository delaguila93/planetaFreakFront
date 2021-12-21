import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of,Observable, map } from 'rxjs';
import { AuthService } from '../usuarios/auth.service';
import { Producto } from './producto';



@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  urlEndPoint:string = "http://localhost:8080/api/productos";

  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  agregarAuthorizationHeader() {
    let token = this.authService.token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }


  getProductos():Observable<Producto[]>{
    // return of(CLIENTES);
    return this.http.get<Producto[]>(this.urlEndPoint).pipe(map( (response) => response as Producto[] ) );
    //  let productos:Producto[] = [];
    // return productos;
  }

  create(cliente: Producto) : Observable<Producto> {
    return this.http.post<Producto>(this.urlEndPoint, cliente, { headers: this.agregarAuthorizationHeader() })
  }


  getProducto(id:number): Observable<Producto>{
    return this.http.get<Producto>(`${this.urlEndPoint}/${id}`, { headers: this.agregarAuthorizationHeader() })
  }

  update(producto: Producto): Observable<Producto>{
    return this.http.put<Producto>(`${this.urlEndPoint}/${producto.id}`, producto, { headers: this.agregarAuthorizationHeader() })
  }

  delete(id: number): Observable<Producto>{
    return this.http.delete<Producto>(`${this.urlEndPoint}/${id}`, { headers: this.agregarAuthorizationHeader() })
  }

  buscarNombre(nombre:string): Observable<Producto[]>{
    return this.http.get<Producto[]>(`${this.urlEndPoint}/buscar-nombre/${nombre}`).pipe(map( (response) => response as Producto[] ) );
  }

  buscarCategoria(categoria:string): Observable<Producto[]>{
    return this.http.get<Producto[]>(`${this.urlEndPoint}/buscar-categoria/${categoria}`).pipe(map( (response) => response as Producto[] ) );
  }

  comprar(producto:Producto){

    return this.http.put<Producto>(`${this.urlEndPoint}/comprar/${this.authService.usuario.username}`,producto,{headers: this.agregarAuthorizationHeader()});
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

  constructor(private http:HttpClient, private authService:AuthService,private activatedRoute: ActivatedRoute) { }
}
