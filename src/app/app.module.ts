import { MultiSelectModule } from 'primeng/multiselect';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 import { NgModule } from '@angular/core';
import { NgModel } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmationService } from 'primeng/api';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { TabMenuModule } from 'primeng/tabmenu';
import { AppComponent } from './app.component';
import { CalendarModule } from 'primeng/calendar';
import { FileUploadModule } from 'primeng/fileupload';
import { EditAddProductComponent } from './components/edit-add-product/edit-add-product.component';
import { RippleModule } from 'primeng/ripple';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { DonorsComponent } from './components/donors/donors.component';
import { PaymentComponent } from './components/payment/payment.component';
import { BuyingComponent } from './components/buying/buying.component';
import { AppRoutingModule } from './app-routing.module';
import { PresentsComponent } from './components/presents/presents.component';
import { ProductService } from './services/productservice';
import { NisuaimComponent } from './nisuaim/nisuaim.component';
import { LoginComponent } from './components/login/login.component';
import { BusketComponent } from './components/busket/busket.component';
import { CardModule } from 'primeng/card';
import { donorService } from './services/donorService';
import { DataViewModule } from 'primeng/dataview';
import { RegisterComponent } from './components/register/register.component';
import { SetHebrewDatePipe } from './components/infrastructure/pipes/set-hebrew-date.pipe';
import { userService } from './services/userService'
import { CheckboxModule } from 'primeng/checkbox';
import { MessagesModule } from 'primeng/messages';
import { ImageModule } from 'primeng/image';
import { BadgeModule } from 'primeng/badge';
import { OrderListModule } from 'primeng/orderlist';
import { DividerModule } from 'primeng/divider';
// import { LotteryComponent } from './components/lottery/lottery.component';
import { PasswordModule } from 'primeng/password';
import { InputMaskModule } from 'primeng/inputmask';
import { LotteryComponent } from './components/lottery/lottery.component';
import { TabViewModule } from 'primeng/tabview';
import {CarouselModule} from 'primeng/carousel';
import { PanelModule } from 'primeng/panel';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { winnerService } from './services/winnerService';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { ToastModule } from 'primeng/toast';






@NgModule({
    declarations: [
        AppComponent,
        EditAddProductComponent,
        HomeComponent,
        MenuComponent,
        DonorsComponent,
        PaymentComponent,
        BuyingComponent,
        PresentsComponent,
        NisuaimComponent,
        LoginComponent,
        BusketComponent,
        RegisterComponent,
        SetHebrewDatePipe,
        LotteryComponent,
    
  
        
      
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        TableModule,
        HttpClientModule,
        InputTextModule,
        DialogModule,
        ToolbarModule,
        ConfirmDialogModule,
        RatingModule,
        InputNumberModule,
        InputTextareaModule,
        RadioButtonModule,
        DropdownModule,
        ButtonModule,
        CalendarModule,
        FileUploadModule,
        ReactiveFormsModule,
        RippleModule,
        CardModule,
        TabMenuModule,
        DataViewModule,
        InputTextModule,
    TriStateCheckboxModule,
    DropdownModule,
    CalendarModule,
    CheckboxModule,
    MessagesModule,
    ImageModule,
    BadgeModule,
    OrderListModule,
    DividerModule,
    PasswordModule,
    MultiSelectModule,
    TabViewModule,
    CarouselModule,
    PanelModule,
    AvatarModule,
    AvatarGroupModule,
    OrganizationChartModule,
    ToastModule,
    InputMaskModule

    ],
    providers: [ConfirmationService,ProductService,donorService,userService,winnerService],//הוספנו את ProductService מעצמיינו
    bootstrap: [AppComponent]
})
export class AppModule { }
