import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HomeComponent } from './features/home/home.component';
import { ServiciosComponent } from './features/servicios/servicios.component';
import { VideosComponent } from './features/videos/videos.component';
import { ContactoComponent } from './features/contacto/contacto.component';
import { NosotrosComponent } from './features/nosotros/nosotros.component';
import { BlogFormComponent } from './features/blog/blog-form.component';
import { LoginComponent } from './features/login/login.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'servicios', component: ServiciosComponent },
  { path: 'videos', component: VideosComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'nosotros', component: NosotrosComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    ServiciosComponent,
    VideosComponent,
    ContactoComponent,
    NosotrosComponent,
    BlogFormComponent,
    BlogFormComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
