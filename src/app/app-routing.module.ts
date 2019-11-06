import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoTasksComponent } from './todo-tasks/todo-tasks.component';
import { DoneTasksComponent } from './done-tasks/done-tasks.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuardService } from './auth/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/todoTasks',
    pathMatch: 'full'
  },
  {
    path: 'todoTasks',
    component: TodoTasksComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'doneTasks',
    component: DoneTasksComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
