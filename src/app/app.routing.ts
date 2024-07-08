import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HiwComponent } from './core/components/hiw/hiw.component';
import { IsAdminGuard } from './core/guards/is-admin.guard';
import { IsStudentGuard } from './core/guards/is-student.guard';
import { AuthGuard } from './core/guards/auth.guard';
import { UsersResolver } from './core/resolvers/users.resolver';
import { ExamsResolver } from './core/resolvers/exams.resolver';
import { HomeComponent } from './feature/home/home.component';
import { AboutComponent } from './feature/about/about.component';
import { LoginComponent } from './feature/login/login.component';
import { UserComponent } from './feature/user/user.component';
import { DashboardComponent } from './feature/dashboard/dashboard.component';
import { RegisterComponent } from './feature/register/register.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'how-it-works',
    component: HiwComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    resolve: {
      users: UsersResolver,
    },
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard, IsStudentGuard],
    resolve: {
      exams: ExamsResolver,
    },
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard, IsAdminGuard],
    data: {
      isAdmin: true,
    },
    resolve: {
      exams: ExamsResolver,
      users: UsersResolver,
    },
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [UsersResolver, ExamsResolver],
})
export class AppRoutingModule {}
