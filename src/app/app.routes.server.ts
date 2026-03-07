import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'casos-exito',
    renderMode: RenderMode.Server
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
  {
    path: 'blog',
    renderMode: RenderMode.Server
  },
  {
    path: 'blog/:slug',
    renderMode: RenderMode.Server
  },
  { path: 'contacto', renderMode: RenderMode.Prerender },
  { path: 'servicios', renderMode: RenderMode.Prerender },
  { path: 'oficinas', renderMode: RenderMode.Prerender },
  { path: 'admin/login', renderMode: RenderMode.Prerender },
  { path: 'admin/dashboard', renderMode: RenderMode.Prerender },
  { path: '**', renderMode: RenderMode.Prerender }
];