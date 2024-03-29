import { Evento } from './../_model/evento';
import { EventoService } from './../_services/evento.service';

import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { defineLocale, BsLocaleService, ptBrLocale} from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';

defineLocale('pt-br', ptBrLocale);


@Component({
   selector: 'app-eventos',
   templateUrl: './eventos.component.html',
   styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

   titulo = 'Eventos';

   eventosFiltrados: Evento[];
   eventos: Evento[];

   evento: Evento;
   modoSalvar = 'post';
   imagemLargura = 50;
   imagemMargem = 2;
   mostrarImagem = false;
   registerForm: FormGroup;
   bodyDeletarEvento =  '';
   // tslint:disable-next-line: variable-name
   _filtroLista = '';
   constructor(
      private eventoService: EventoService,
      private  modalService: BsModalService,
      private toastService: ToastrService,
      private fb: FormBuilder,
      private  localeService: BsLocaleService
      ) {
         this.localeService.use('pr-br');
      }

      // tslint:disable-next-line: variable-name
      get filtroLista(): string {
         return this._filtroLista;
      }
      set filtroLista(value: string) {
         this._filtroLista = value;
         this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
      }
      editarEvento(evento: Evento, template: any) {
         this.modoSalvar = 'put';
         this.openModal(template);
         this.evento = evento;
         this.registerForm.patchValue(evento);
      }
      novoEvento(template: any) {
         this.modoSalvar = 'post';
         this.openModal(template);
      }
      excluirEvento(evento: Evento, template: any) {
        this.openModal(template);
        this.evento = evento;
        this.bodyDeletarEvento = `Tem certeza que deseja excluir o Evento: ${evento.tema}, Código: ${evento.id}?`;
      }
      confirmeDelete(template: any) {
       this.eventoService.deleteEvento(this.evento.id).subscribe(
       () => {
          template.hide();
          this.getEventos();
          this.toastService.success('Deletado com Sucesso');
       }, error => {
         this.toastService.error('Erro ao tentar Deletar ');
         console.log(error);
      }
   );
}
      openModal(template: any) {
         this.registerForm.reset();
         template.show();
      }
      ngOnInit() {
         this.getEventos();
      }
      alternarImagem() {
         this.mostrarImagem = !this.mostrarImagem;
      }
      validation() {
         this.registerForm = this.fb.group({
            tema: ['', [ Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
            local: [ '', Validators.required],
            dataEvento: ['', Validators.required],
            imagemURL: ['', Validators.required],
            qtdPessoas: ['', [Validators.required, Validators.max(120000)]],
            telefone: ['',  Validators.required],
            email: ['', [ Validators.required, Validators.email]],
         });
      }
      filtrarEventos(filtrarPor: string): Evento[] {
         filtrarPor = filtrarPor.toLocaleLowerCase();
         return this.eventos.filter(
            evento => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1
            );
         }
         salvarAlteracao(template: any) {
            if (this.registerForm.valid) {
               if ( this.modoSalvar === 'post') {
                  this.evento = Object.assign({}, this.registerForm.value);
                  this.eventoService.postEvento(this.evento).subscribe(
                     (novoEvento: Evento) => {
                        template.hide();
                        this.getEventos();
                        this.toastService.success('Inserido com Sucesso!');
                     },
                     error => {
                        this.toastService.error(`Erro ao Inserir: ${error}`);
                     }
                     );
                  } else {
                     this.evento = Object.assign({id: this.evento.id }, this.registerForm.value);
                     this.eventoService.putEvento(this.evento).subscribe(
                        () => {
                           template.hide();
                           this.getEventos();
                           this.toastService.success('Editado com Sucesso!');
                        }, error => {
                           this.toastService.error(`Erro ao Editar: ${error}`);
                        }
                     );
                  }
               }
            }
               getEventos() {
                  this.eventoService.getAllEvento().subscribe(
                        // tslint:disable-next-line: variable-name
                        (_eventos: Evento[]) => {
                           this.eventos = _eventos;
                           this.eventosFiltrados = this.eventos;
                        }, (error: any) => {
                           this.toastService.error(`Erro ao tentar carregar eventos: ${error}`);
                        });
                     }
                  }


