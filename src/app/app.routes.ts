import { OficinasComponent } from './features/oficinas/oficinas.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ServiciosComponent } from './features/servicios/servicios.component';
import { VideosComponent } from './features/videos/videos.component';
import { ContactoComponent } from './features/contacto/contacto.component';
import { NosotrosComponent } from './features/nosotros/nosotros.component';

export const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'nosotros', component: NosotrosComponent },
	{ path: 'servicios', component: ServiciosComponent },
	{ path: 'videos', component: VideosComponent },
	{ path: 'contacto', component: ContactoComponent },
	{ path: 'oficinas', component: OficinasComponent },
	{ path: '**', redirectTo: '' }
];
