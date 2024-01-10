import { MessageService } from 'primeng/api';
import { Component } from '@angular/core';
import { Product } from '../../domain/product';
import { ProductService } from 'src/app/services/productservice';
import { Router } from '@angular/router';
import { orderService } from 'src/app/services/orderService';

@Component({
  selector: 'app-busket',
  templateUrl: './busket.component.html',
  styleUrls: ['./busket.component.css'],
  providers: [ProductService, orderService, MessageService]
})
export class BusketComponent {
  layout: string = 'list';
  products!: Product[];
  user: string;
  prod: any;
  sumProducts: number = 0;
  isChecked: number;
  totalAmount: number = 0;
  numCard: number = 0;
  myflag: boolean = false;
  arrFlag: boolean[] = [];
  prodList: Product[];
  userId: string;
  afterDeleteProd: Product[];
  payNow: number[] = [];
  value: number = 1;
  constructor(private router: Router, private messageService: MessageService, private orderService: orderService) {
    this.arrFlag = new Array(200).fill(false);
  }
  prodsId: number[] = [];
  prodsItems: Product[] = [];
  ngOnInit() {

    this.userCart();

  }
  userCart() {
    this.orderService.getUserCart().subscribe(data => {
      this.products = data

      this.products.forEach(item => {
        let foundItemIndex = -1;

        for (let i = 0; i < this.prodsItems.length; i++) {
          if (this.prodsItems[i].presentId === item.presentId) {
            foundItemIndex = i;
            break;
          }
        }

        if (this.prodsId.includes(item.presentId)) {
          if (foundItemIndex !== -1) {
            this.prodsItems[foundItemIndex].quantity++;
          }
        } else {
          this.prodsId.push(item.presentId);
          this.prodsItems.push({
            presentId: item.presentId,
            imagUrl: item.imagUrl,
            price: item.price,
            description: item.description,
            category: item.category,
            name: item.name,
            quantity: 1
          });
        }
        console.log(this.prodsItems);

      });
    });
  }
  show(message: string) {
    this.messageService.add({ severity: 'success', summary: 'הצלחה', detail: message });
  }
  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

  updateTotalAmount(price: number, id: number, quantity: number) {
    this.arrFlag[id] = !(this.arrFlag[id]);
    if (this.arrFlag[id] == true) {
      this.totalAmount = this.totalAmount + (price * quantity);
      this.numCard = this.numCard + quantity;
      this.sumProducts++;
      this.payNow.push(id);
    }
    else {
      this.totalAmount = this.totalAmount - (price * quantity);
      this.numCard = this.numCard - quantity;
      this.sumProducts--;
      this.payNow = this.payNow.filter(item => item !== id);
    }
  }
  // this.dataService.setPayNowData(this.payNow);

  moveToPayment() {
    const jsonData = JSON.stringify(this.payNow);
    sessionStorage.setItem("key", jsonData);
    this.router.navigate(['/תשלום/']);
  }



  // previousQuantity: number;

  // onQuantityChange() {
  //   if (this..quantity > this.previousQuantity) {
  //     // טיפול בעליה בכמות
  //     console.log('Quantity increased', this.product.quantity);
  //     // כאן תוכלי להפעיל את הפונקציה addToCart
  //     this.addToCart(this.product.presentId);
  //   } else if (this.product.quantity < this.previousQuantity) {
  //     // טיפול בירידה בכמות
  //     console.log('Quantity decreased', this.product.quantity);
  //     // כאן תוכלי להפעיל את הפונקציה removeFromCart
  //     this.removeFromCart(this.product.presentId);
  //   }

  //   // עדכון הערך הקודם
  //   this.previousQuantity = this.product.quantity;
  // }
  foundIndex: number = -1;
  onIncrement(prodId: number) {
    this.orderService.addToCart(prodId).subscribe(

      (data) => {
        for (let i = 0; i < this.prodsItems.length; i++) {
          if (this.prodsItems[i].presentId === prodId) {
            this.foundIndex = i;
            break;
          }
        }
        this.prodsItems[this.foundIndex].quantity++;
        if (this.arrFlag[prodId] == true) {
          this.totalAmount = this.totalAmount + (this.prodsItems[this.foundIndex].price);
          this.numCard = this.numCard + 1;
          this.sumProducts++;
          this.payNow.push(prodId);
        }


        console.log("הוספתי אחד");
        console.log(data);
      },
      (error) => {
        if (error.status == 400) {
          alert("מוצר כבר הוגרל ולא ניתן להוסיפו לסל")
        }
      }
      //לעדכן את האינפוט של הכמות


    )

  }

  onDecrement(prodId: number) {
    //לעדכן את האינפוט של הכמות
    this.orderService.deleteFromCartOne(prodId).subscribe(
      (data) => {
        for (let i = 0; i < this.prodsItems.length; i++) {
          if (this.prodsItems[i].presentId === prodId) {
            this.foundIndex = i;
            break;
          }
        }
        this.prodsItems[this.foundIndex].quantity--;
        if (this.arrFlag[prodId] == true) {
          this.totalAmount = this.totalAmount - (this.prodsItems[this.foundIndex].price);
          this.numCard = this.numCard - 1;
          this.sumProducts--;
        this.deleteFirstProductById(prodId);
        }
        console.log("מחקתי אחד");
        console.log(data);
      },
      (error) => {
        console.log(error);

      }

    )

  }
  deleteFirstProductById(idToDelete: number): void {
    const indexToDelete = this.prodsItems.findIndex(product => product.presentId === idToDelete);
  
    if (indexToDelete !== -1) {
      this.payNow.splice(indexToDelete, 1);
    }
  }
  
  removeFromCart(presentId: number) {
    this.orderService.deleteFromCart(presentId).subscribe(

      (data) => {
        for (let i = 0; i < this.prodsItems.length; i++) {
          if (this.prodsItems[i].presentId === presentId) {
            this.foundIndex = i;
            break;
          }
        }
        if (this.arrFlag[presentId] == true) {
          this.totalAmount = this.totalAmount - (this.prodsItems[this.foundIndex].price * this.prodsItems[this.foundIndex].quantity);
          this.numCard = this.numCard - this.prodsItems[this.foundIndex].quantity;
        }
        // productToDeleteId הוא ה prodId של המוצר שברצונך למחוק

        this.prodsItems = this.prodsItems.filter(product => product.presentId !== presentId);
        this.prodsItems.forEach(prod => {
          this.payNow.push(prod.presentId);
        });



        this.show("מוצר נמחק מהסל בהצלחה")
        // this.products=data;
        // this.prodsItems=data;
        this.prodsItems = [];
        this.prodsId = [];
        console.log("Success delete:", data)
        data.forEach(item => {
          let foundItemIndex = -1;

          for (let i = 0; i < this.prodsItems.length; i++) {
            if (this.prodsItems[i].presentId === item.presentId) {
              foundItemIndex = i;
              break;
            }
          }


          if (this.prodsId.includes(item.presentId)) {
            if (foundItemIndex !== -1) {
              this.prodsItems[foundItemIndex].quantity++;


            }
          } else {
            this.prodsId.push(item.presentId);
            this.prodsItems.push({
              presentId: item.presentId,
              imagUrl: item.imagUrl,
              price: item.price,
              description: item.description,
              category: item.category,
              name: item.name,
              quantity: 1
            });
          }

          console.log(this.prodsItems);

        });
      },
      (error) => {
        if (error.status === 401) {
          console.error("Anuthorized:", error.statusText);
          this.showError("אירעה שגיאה, אינך רשום לביצוע פעולות");
        }
        if (error.status === 400) {
          console.error("Missing requires fields:", error.statusText);
          this.showError("אירעה שגיאה בעת מחיקת המוצר מהסל");
        }
      }
    )
  }
  addToCart(presentId: number) {
    this.orderService.addToCart(presentId).subscribe(
      (data) => {
        this.show("מוצר נוסף לסל בהצלחה")
        console.log("Success:", data)
      },
      (error) => {

        if (error.status === 401) {
          console.error("Anuthorized:", error.statusText);
          this.showError("אירעה שגיאה, אינך רשום לביצוע פעולות");
        }
        if (error.status === 400) {
          console.error("Missing requires fields:", error.statusText);
          this.showError("אירעה שגיאה בעת מחיקת המוצר מהסל");
        }
      }
    )
  }

}

