import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { orderService } from 'src/app/services/orderService';
import { order } from 'src/app/domain/order'
import { Product } from 'src/app/domain/product';
import { OrderItem } from 'src/app/domain/orderItem';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  providers: [orderService, MessageService]
})
export class PaymentComponent {
  constructor(private route: Router, private orderService: orderService, private messageService: MessageService) { }
  payNowData: number[];
  data: number[];
  value: string | undefined;
  order: order;
  userId: string;
  prodItems: Product[];
  ordItem: OrderItem;
  ordItems: OrderItem[] = [];
  submitted:boolean;
emailPay:string;
passwordPay:string;
cvvPay:number;
creditCardPay:number;
datePay:number;

idPay:number;

  
  ngOnInit() {
    const data = sessionStorage.getItem("key");
    this.payNowData = data ? JSON.parse(data) : null;
    console.log(this.payNowData);
  }
  show(message: string) {
    this.messageService.add({ severity: 'success', summary: 'הצלחה', detail: message });
  }
  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'שגיאה', detail: message });
  }


  confirmPyment() {
    console.log("נכנבתי לפונקציה");
    
    this.submitted=true;
    if(this.cvvPay&& this.creditCardPay&&this.datePay&&this.emailPay&&this.idPay&&this.passwordPay&&this.validateEmail(this.emailPay)==true){
      console.log("הסכמתי להיכנס");
      
    this.orderService.payForBusket(this.payNowData).subscribe(
      (data) => {
      alert("הזמנה בוצעה בהצלחה")
        this.route.navigate(['/רכישה/']);
        console.log("Success:", data)
      },
      (error) => {
        if (error.status === 401) {
          console.error("Anuthorized:", error.statusText);
          alert("אירעה שגיאה, אינך רשום לביצוע פעולות");
        }
        else {
          console.error("Unexpected error:", error.statusText);
          alert("אירעה שגיאה בעת התשלום,נסה שנית");
        }
      }
    )
  }
  }
  
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
