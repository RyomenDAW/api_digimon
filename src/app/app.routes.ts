import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import { ContactoComponent } from './contacto/contacto.component';
import { DigimonsearchComponent } from './digimonsearch/digimonsearch.component';
import { PoliticaPrivacidadComponent } from './contacto/politica-privacidad/politica-privacidad.component';
import { TerminosCondicionesComponent } from './contacto/terminos-condiciones/terminos-condiciones.component';
import { CookiesComponent } from './contacto/cookies/cookies.component';
import { FavoritosComponent } from './favoritos/favoritos.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'contacto', component: ContactoComponent },
    { path: 'buscador', component: DigimonsearchComponent},
    { path: 'politica-privacidad', component: PoliticaPrivacidadComponent },
    { path: 'terminos-condiciones', component: TerminosCondicionesComponent },
    { path: 'cookies', component: CookiesComponent },
    { path: 'favoritos', component: FavoritosComponent },


];
