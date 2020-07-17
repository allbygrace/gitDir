import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about.component';
import { HomeComponent } from './home.component';
import { CourseComponent } from './Course.component';
const routes: Routes = [
    {path: 'about' , component: AboutComponent},
    {path: 'home' , component: HomeComponent},
    {path: 'course' , component: CourseComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }