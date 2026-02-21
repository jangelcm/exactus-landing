import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ServiciosComponent } from './features/servicios/servicios.component';
import { ContactoComponent } from './features/contacto/contacto.component';
import { NosotrosComponent } from './features/nosotros/nosotros.component';
import { LoginComponent } from './features/login/login.component';
import { BlogFormComponent } from './features/blog/blog-form.component';
import { BlogComponent } from './features/blog/blog.component';
import { BlogDetailComponent } from './features/blog/blog-detail.component';
import { OficinasComponent } from './shared/components/oficinas/oficinas.component';

export const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'nosotros', component: NosotrosComponent },
	{ path: 'servicios/:slug', component: ServiciosComponent },
	{ path: 'servicios', component: ServiciosComponent },
	{ path: 'contacto', component: ContactoComponent },
	{ path: 'oficinas', component: OficinasComponent },
	{ path: 'blog/detail/:id', component: BlogDetailComponent },
	{ path: 'blog', component: BlogFormComponent },
	{ path: 'admin', component: LoginComponent },
	{ path: '**', redirectTo: '' }
];
