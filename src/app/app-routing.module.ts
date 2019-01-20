import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './auth/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'today',
    pathMatch: 'full'
  },
  {
    path: 'home',
    redirectTo: 'today',
    pathMatch: 'full'
    // loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },

  // task varients
  { path: 'today',
    loadChildren: './pages/todo/tasks/tasks.module#TasksPageModule',
    data: { type: 'today', title: 'Today', icon: 'sunny'}},
  { path: 'tags/:tag',
    loadChildren: './pages/todo/tasks/tasks.module#TasksPageModule',
    data: { type: 'tag', title: 'Tasks by Tag', icon: 'sunny'}},
  { path: 'default-tasks',
    loadChildren: './pages/todo/tasks/tasks.module#TasksPageModule',
    data: { type: 'default', title: 'Todo', icon: 'clipboard'}},
  { path: 'important',
    loadChildren: './pages/todo/tasks/tasks.module#TasksPageModule',
    data: { type: 'important', title: 'Important', icon: 'star'}},
  { path: 'tasksCategory/:id', // TODO: see if its still in use
    loadChildren: './pages/todo/tasks/tasks.module#TasksPageModule',
    data: { type: 'category'}},
  { path: 'tasks/:id', loadChildren: './pages/todo/tasks/tasks.module#TasksPageModule',
    data: { type: 'category'} },

  { path: 'categories', loadChildren: './pages/todo/categories/categories.module#CategoriesPageModule' },
  { path: 'category',loadChildren: './pages/todo/category/category.module#CategoryPageModule' },
  { path: 'task', loadChildren: './pages/todo/task/task.module#TaskPageModule' },

  { path: 'login', loadChildren: './auth/pages/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './auth/pages/register/register.module#RegisterPageModule' },
  { path: 'forgotPassword', loadChildren: './auth/pages/forgot-password/forgot-password.module#ForgotPasswordPageModule' },


  { path: 'user',
    canActivate: [ AuthGuardService ],
    loadChildren: './auth/pages/user/user.module#UserPageModule' },




  { path: '**', redirectTo: '', pathMatch: 'full', data: {message: 'Error, url not found'} }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
   // { enableTracing: true }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule {}
