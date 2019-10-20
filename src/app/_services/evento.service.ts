import { Evento } from './../_model/evento';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EventoService {
  baseURl = 'https://localhost:44343/api/evento';

  constructor(private http: HttpClient) { }

  getAllEvento(): Observable<Evento[]> {
   return this.http.get<Evento[]>(this.baseURl);
  }
  getEventoByTema(tema: string): Observable<Evento[]> {
   return this.http.get<Evento[]>(`${this.baseURl}/getBytema${tema}`);

  }
  getEventobyId(id: number): Observable<Evento> {
    return this.http.get<Evento>(`${this.baseURl}/${id}`);
  }
  postEvento(evento: Evento) {
    return this.http.post(this.baseURl, evento);
  }
  putEvento(evento: Evento) {
    return this.http.put(`${this.baseURl}/${evento.id}`, evento);
  }
  deleteEvento(id: number) {
  return this.http.delete(`${this.baseURl}/${id}`);

  }
}

