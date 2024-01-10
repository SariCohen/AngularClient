import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { DonorsComponent } from './components/donors/donors.component';
import { BuyingComponent } from './components/buying/buying.component';
import { AppComponent } from './app.component';
import { PresentsComponent } from './components/presents/presents.component';
import { LoginComponent } from './components/login/login.component';
import { BusketComponent } from './components/busket/busket.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RegisterComponent } from './components/register/register.component';
import {LotteryComponent} from './components/lottery/lottery.component'

const routes: Routes = [
  {path:'בית', component:HomeComponent},
  {path:'menu', component:MenuComponent},
  {path: 'תורמים', component:DonorsComponent},
  {path: 'רכישה', component:BuyingComponent},
  {path: 'מתנות', component:PresentsComponent},
  {path: 'כניסה', component:LoginComponent},
  {path: 'עגלה', component:BusketComponent},
  {path: 'תשלום', component:PaymentComponent},
  {path: 'הרשמה', component:RegisterComponent},
  {path: 'הגרלה', component:LotteryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
