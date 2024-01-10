import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from 'src/app/domain/product';
import { buyingService } from 'src/app/services/buyingService';
import { orderService } from 'src/app/services/orderService';
import { ProductService } from 'src/app/services/productservice';

@Component({
  selector: 'app-buying',
  templateUrl: './buying.component.html',
  styleUrls: ['./buying.component.css'],
  providers: [ConfirmationService, MessageService, ProductService, buyingService, orderService]
})
export class BuyingComponent implements OnInit {
  
  imageUrl: string;
  userId: string;
  userItems: Product[] = [];
  products!: Product[];
  user: string;
  prod: any;
  visible: boolean = false;
  allProducts: Product[];
  sortBy: string[] | undefined;
  selectedSort: string | undefined;
  name:string;
  selectedCategories: any[] = [];
  categories: string[] = [
    'מוצרי בית',
    'נופש ומרגוע',
    'כללי',
    'נשים',
    'גברים'
  ];
  noProducts:boolean=false;
  constructor(private orderService: orderService, private router: Router, private productService: ProductService, private buyingService: buyingService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.productService.getProducts()
      .subscribe(data => this.allProducts = data
      );

      this.sortBy = [
        'מחיר הנמוך לגבוה',
        'מחיר הגבוה לנמוך',
        'הנרכשים ביותר'
      ];
  }
  show(message: string) {
    this.messageService.add({ severity: 'success', summary:  'הצלחה', detail: message});
  }
  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'שגיאה', detail: message });
  }
  addToCart(presentId: number) {
    this.orderService.addToCart(presentId).subscribe(
    (data) => {
      this.products=data;
      this.show("מוצר נוסף לסל בהצלחה");
      console.log("Success:", data);
},
    (error) => {
      if (error.status === 403) {
        console.error("Access forbidden:", error.statusText);
        this.showError("פעולה נדחתה,אין לך הרשאה ");
      } else {
        if (error.status === 401) {
          console.error("Anuthorized:", error.statusText);
          this.showError("אירעה שגיאה, אינך רשום לביצוע פעולות");
        }
        if (error.status === 400) {
          console.error("Missing requires fields:", error.statusText);
          this.showError("מוצר הוגרל כבר ואינו זמין  לרכישה");
        }
      }
    }
    )}
  moveToCart() {
    this.router.navigate(["/עגלה/"]);
  }

  showCart() {
    this.orderService.getUserCart().subscribe(data => {
      this.products = data;
      this.visible = true;
    });
  }

  searchByName(productName: string) {
    if(productName=='undefined'){
      productName="";
    }
    this.productService.getProductsByName(productName)
      .subscribe(
        (data: any) => {
          this.allProducts = data;
          this.noProducts=false;
          } 
        ,
        (error: any) => {
          if (error.status === 404) {
            this.noProducts=true;
            this.allProducts=[];
        }
      });
  }

  onSortChange(){
    switch (this.selectedSort) {
      case  'מחיר הנמוך לגבוה':
      this.productService.getProductsByCheap().subscribe(data=>{this.allProducts = data
        this.noProducts=false;})
        break;

      case 'מחיר הגבוה לנמוך':
        this.productService.getProductsByExpensive().subscribe(data=>{this.allProducts = data
          this.noProducts=false;})
        break;

        case  'הנרכשים ביותר':
          this.productService.getProductsByPurches().subscribe(data=>{this.allProducts = data
            this.noProducts=false;})
        break;
  }
  }
 
  getPresentsByCategory(categories:string[]){
    if( !this.noProducts==true){
      this.productService.GetPresentByCategory(categories).subscribe(data=>{this.allProducts = data})
    }

  }


  onClearDropdown() {
    this.productService.getProducts()
    .subscribe(data => this.allProducts = data
    );
  }
}

