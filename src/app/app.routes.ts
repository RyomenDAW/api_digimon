import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import { ContactoComponent } from './contacto/contacto.component';
export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'contacto', component: ContactoComponent }
];
