import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app.routing";
import { NavbarComponent } from "./core/components/navbar/navbar.component";
import { FooterComponent } from "./core/components/footer/footer.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { EllipsisPipe } from "./core/pipes/ellipsis.pipe";
import { IsLoggedDirective } from "./core/directives/is-logged.directive";
import { HomeComponent } from "./feature/home/home.component";
import { AboutComponent } from "./feature/about/about.component";
import { LoginComponent } from "./feature/login/login.component";
import { RegisterComponent } from "./feature/register/register.component";
import { UserComponent } from "./feature/user/user.component";
import { ListItemComponent } from "./feature/list-item/list-item.component";
import { DashboardComponent } from "./feature/dashboard/dashboard.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { provideNativeDateAdapter } from "@angular/material/core";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    IsLoggedDirective,
    ListItemComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatDatepickerModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    EllipsisPipe,
    MatCardModule,
    MatFormFieldModule
  ],
  providers: [provideNativeDateAdapter()],
  bootstrap: [AppComponent],
})
export class AppModule {}
