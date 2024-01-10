import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, Message, MessageService, TreeNode } from 'primeng/api';
import { Product } from 'src/app/domain/product';
import { buyingService } from 'src/app/services/buyingService';
import { orderService } from 'src/app/services/orderService';
import { ProductService } from 'src/app/services/productservice';
import { user } from 'src/app/domain/user';
import { winnerService } from 'src/app/services/winnerService';
@Component({
  selector: 'app-lottery',
  templateUrl: './lottery.component.html',
  styleUrls: ['./lottery.component.css'],
  providers: [ProductService, buyingService, orderService, winnerService, MessageService],
  encapsulation: ViewEncapsulation.Emulated
})

export class LotteryComponent {
  responsiveOptions;
  constructor(private orderService: orderService, private router: Router, private productService: ProductService, private buyingService: buyingService,
    private winnerService: winnerService, private messageService: MessageService) { }
  myBuyers: user[]
  myPurches: Product[]
  allDtailsPurchees: any[];
  allProducts: Product[];
  data: TreeNode[] = [];
  visible: boolean = false;
  totalIncome: any;
  messages: Message[] | undefined;
  winner: any;
  
  showTotalIncome() {
    this.visible = true;
    this.orderService.getTotalIncome().subscribe(data => {
      this.totalIncome = data
      console.log("total income " + data);
    })
  }
  show(userId: string) {
    this.messageService.add({ severity: 'success', summary: ' מוצר הוגרל בהצלחה  ', detail: ' הזוכה: ' + userId });
  }
  showWinner(user: string) {
    this.messageService.add({ severity: 'success', summary: 'תודה שהשתתפתם בהגרלה', detail: ' הזוכה: ' + user });
  }
  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'שגיאה', detail: message });
  }

  ngOnInit() {
    this.orderService.getAllBuyersDetails().subscribe(

      (data) => {
        this.myBuyers = data;
        console.log(data + "buyers detayls !!");
        console.log(this.myBuyers + "my data");
      },
      (error) => {
        if (error.status === 401) {
          console.error("Anuthorized:", error.statusText);

        }
        else {
          console.error("Unexpected error:", error.statusText);

        }
      }
    )

    this.orderService.getBuyerPresent().subscribe(data => {
      this.myPurches = data;
      console.log(this.myPurches + "from buyer present");

      this.productService.getProducts()
        .subscribe(data => this.allProducts = data
        );
    })

    // this.orderService.getAllpurchases().subscribe(data=>{console.log(data);
    //   this.allDtailsPurchees=data;
    //   console.log(this.allDtailsPurchees);

    // })
    this.orderService.getAllpurchases().subscribe(
      (data) => {
        this.allDtailsPurchees = data;
        // כל item ב-allDtailsPurchees יהיה TreeNode
        this.allDtailsPurchees.forEach(item => {
          const treeNode: TreeNode = {
            label: item.presentName,
            expanded: true,
            data: item.presentUrl,

            children: item.purchases.map(purchase => {
              return {
                label: purchase.user.userName,
                data: purchase.user
              };
            })
          };

          // הוסף את ה-TreeNode ל-data
          this.data.push(treeNode);
        });
        console.log(this.data);
      },
      (error) => {
        if (error.status === 401) {
          console.error("Anuthorized:", error.statusText);
          this.showError("אירעה שגיאה, אינך רשום לביצוע פעולות");
        }
        else {
          console.error("Unexpected error:", error.statusText);
          this.showError("פעולה נדחתה, אין לך הרשאה");
        }
      }
    )
  }
  makeLottery(presentId: number) {
    this.winnerService.makingLottery(presentId).subscribe(
      (data) => {
        if(data==null){
this.showError("לא ניתן להגריל את המוצר כיוון שאף משתמש לא רכש ממנו");
        }
        console.log(data);
        this.winner = data;
        this.show(this.winner.userId);
      },
      (error) => {
        if (error.status == 401 || error.status == 403) {
          this.showError("אינך מנהל,ואין לך הרשאה לביצוע ההגרלה");
        }
        else {
          console.log(this.data);
          this.showError("מוצר כבר הוגרל,אין אפשרות להגרילו בשנית");
        }

      }
    )



  }
  winnerStr:string;
  showPresentWinner(presentId: number) {
    this.winnerService.getPresentWinner(presentId).subscribe(
    //   data => {
    
    // }
    (data)=>{
  console.log(data);
      this.winner = data;
      this.winnerStr = this.winner.userName + '\n' +
      this.winner.userFirstName + '\n' +
      this.winner.userLastName + '\n' +
      this.winner.userPhone + '\n' +
      this.winner.userEmail;

      this.showWinner(this.winnerStr);
    },(error)=>{
if(error.status==404){
  this.showError("מוצר טרם הוגרל,אין אפשרות לצפות בזוכה");
}
    }
    );
  }

}


