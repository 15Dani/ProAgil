import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule  } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import {BsDropdownModule, TooltipModule, ModalModule, BsDatepickerModule} from 'ngx-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule, ToastContainerModule } from 'ngx-toastr';

import { EventoService } from './_services/evento.service';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { EventosComponent } from './eventos/eventos.component';
import { PalestrantesComponent } from './palestrantes/palestrantes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContatosComponent } from './contatos/contatos.component';
import { TituloComponent } from './_shared/titulo/titulo.component';

import { DatetimFormatPipePipe } from './_helps/datetim-format-pipe.pipe';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    EventosComponent,
    PalestrantesComponent,
    DashboardComponent,
    ContatosComponent,
    TituloComponent,
    DatetimFormatPipePipe
  ],
  imports: [
    BrowserModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [
    EventoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
