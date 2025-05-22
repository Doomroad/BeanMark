import { provideRouter, Routes } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
  { path: 'register', loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent) },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [() => import('./_guards/auth.guard').then(m => m.authGuard)],
    children: [
      { path: 'members', loadComponent: () => import('./members/member-list/member-list.component').then(m => m.MemberListComponent) },
      { path: 'members/:username', loadComponent: () => import('./members/member-detail/member-detail.component').then(m => m.MemberDetailComponent) },
      { path: 'lists', loadComponent: () => import('./lists/lists.component').then(m => m.ListsComponent) },
      { path: 'messages', loadComponent: () => import('./messages/messages.component').then(m => m.MessagesComponent) },
    ]
  },
  { path: 'errors', component: TestErrorsComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'server-error', component: ServerErrorComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

/* { path: '', component: HomeComponent },
{ path: 'register', component: RegisterComponent },
{ path: 'members', component: MemberListComponent },
{ path: 'members/:id', component: MemberDetailComponent },
{ path: 'lists', component: ListsComponent },
{ path: 'messages', component: MessagesComponent },
{ path: '**', component: HomeComponent, pathMatch: 'full' } */

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)]
});
