
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from 'src/app/domain/product';
import { ProductService } from 'src/app/services/productservice';

@Component({
    selector: 'app-presents',
    templateUrl: './presents.component.html',
    styleUrls: ['./presents.component.css'],
    providers: [ConfirmationService, MessageService, ProductService]
})
export class PresentsComponent implements OnInit {
    products: Product[];
    product: Product;
    productDialog: boolean;
    selectedProducts: Product[];
    submitted: boolean;
    openText: string;
    allId: number[] = [];
    selectedDonors:any[]=[];
    constructor(private productService: ProductService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

    ngOnInit() {
        this.productService.getProducts()
            .subscribe(data => {
                this.products = data;
                console.log(data);
            }
            );
    }
    show(message: string) {
        this.messageService.add({ severity: 'success', summary:  'הצלחה', detail: message});
      }
      showError(message: string) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
      }

    changeShowTable(p: Product[]) {
        this.products = p;
    }
    isUpdate:boolean=false;

    editProduct(product: Product) {
        this.isUpdate=true;
        this.selectedDonors=[];
        this.product = { ...product };
        console.log("openNew: this.editProd =", this.product);
        this.productDialog = true;
        this.openText = 'עריכת מתנה'
        this.product.donors.forEach(element => {
            this.selectedDonors.push(element)
          });
          console.log(this.selectedDonors);
          
        // this.selectedDonors = product.donors;
    }
myData:any[]
    deleteProduct(product: Product) {
        this.confirmationService.confirm({
            message: 'האם אתה בטוח שברצונך למחוק ' + product.name + '?',
            header: 'אישור מחיקה',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.productService.deletePresent(product.presentId)
                    .subscribe((data) => {
                        this.myData=data;
                        if (data && Array.isArray(data) && data.length > 0) {
                            this.products = data;
                            this.show("מתנה נמחקה בהצלחה")    
                             console.log("Success:", data);
                        }
                      else{
                        this.showError("אין אפשרות למחוק מתנה זו ,כיוון שמשתמשים כבר רכשו אותה");
                      }
                      },
                      (error) => {
                        if (error.status === 403) {
                          console.error("Access forbidden:", error.statusText);
                          this.showError("פעולה נדחתה,אין לך הרשאה ")
                        } else {
                          console.error("Unexpected error:", error.statusText);
                          this.showError("אירעה שגיאה, אינך רשום לביצוע פעולות");
                        }
                     })
}})
    }

    openNew() {
            this.selectedDonors=[];
            this.product = {
            price: 10,
            
        };
        this.submitted = false;
        this.productDialog = true;
        this.openText = 'הוספת מתנה'
this.isUpdate=false;
    
    }
    onChildValueChange(isVisible: boolean) {
        console.log(this.productDialog + "productDialog before");
        console.log(isVisible + "is visible that came from child");
        this.productDialog = isVisible;
        console.log(this.productDialog + "productDialog after");
    }
    changePdialog(Visible: boolean) {
        this.productDialog = Visible;
    }

}





