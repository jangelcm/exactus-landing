import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'casos-exito',
    renderMode: RenderMode.Prerender
  },
  { path: 'nosotros', renderMode: RenderMode.Prerender },
  {
    path: 'servicios/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return [
        { slug: 'asesoria-tributaria' },
        { slug: 'asesoria-laboral' },
        { slug: 'asesoria-juridica' },
        { slug: 'informes-especiales' },
        { slug: 'asesoria-contable' },
        { slug: 'auditoria-tributaria' },
        { slug: 'auditoria-financiera' }
      ];
    }
  },
  // Rutas de blog con renderizado en servidor para SEO, se debe pasar a -> Server
  {
    path: 'blog',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'blog/:slug',
    renderMode: RenderMode.Prerender
  },
  { path: 'contacto', renderMode: RenderMode.Prerender },
  { path: 'servicios', renderMode: RenderMode.Prerender },
  { path: 'oficinas', renderMode: RenderMode.Prerender },
  { path: 'admin/login', renderMode: RenderMode.Prerender },
  { path: 'admin/dashboard', renderMode: RenderMode.Prerender },
  { path: '**', renderMode: RenderMode.Prerender }
];