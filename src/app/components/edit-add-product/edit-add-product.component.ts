import { AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Product } from 'src/app/domain/product';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProductService } from 'src/app/services/productservice';
import { donorService } from 'src/app/services/donorService';

@Component({
    selector: 'app-edit-add-product',
    templateUrl: './edit-add-product.component.html',
    styleUrls: ['./edit-add-product.component.css'],
    providers: [ConfirmationService, MessageService, ProductService, donorService]
})
export class EditAddProductComponent {

    constructor(private donorService: donorService, private productService: ProductService, private messageService: MessageService, private confirmationService: ConfirmationService) {

    }
    donors: any[] = [];
    donorsString: any[] = [];
    @Input()
    selectedDonors!: any[];
    //   selectedDonors: any[] = this.editProd && this.editProd.donors ? [...this.editProd.donors] : [];
    @Input()
    editProd: Product;
    ngOnInit() {
        this.productService.getProducts().subscribe(data => this.products = data);
        this.donorService.getDonors().subscribe(data => {
            this.donors = data
            this.donors.forEach(element => {
                this.donorsString.push(element.donorName)
                console.log(this.donorsString);
            });
        })
    }
    show(message: string) {
        this.messageService.add({ severity: 'success', summary:  'הצלחה', detail: message});
      }
      showError(message: string) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
      }
    @Input()
    selectProd: Product[];
    @Input()
    listProducts: Product[];

    @Input()
    submitted: boolean;
    products: Product[];
    selectedProducts: Product[];
    product: Product;
    @Input()
    open: string;
    @Input()
    isVisible: boolean;
    @Output()
    Visible = new EventEmitter<boolean>();
    @Output()
    updatedList = new EventEmitter<any>();
    @Input()
    update:boolean=false;
    defaultValue: number = 10;
    i: number = 0;
    saveProduct() {
       
        // && this.editProd.donors.length
        this.submitted = true;
        if (this.editProd.name.trim() && this.editProd.category.trim()&&
        this.editProd.description.trim() && this.editProd.imagUrl
        &&this.editProd.name&&this.editProd.price!=null&&this.isNameExists()==false||(this.isNameExists()==true&&this.update)) {
            if (this.editProd.presentId) {
                this.productService.updatePresent(this.editProd.presentId, this.editProd)
                    .subscribe((data) => {
                        this.listProducts = data;
                        this.show("מתנה עודכנה בהצלחה")
                        this.updatedList.emit(data);
                        console.log("//////////////////");
                        
                        console.log("Success:", data);
                        console.log("/////////////");
                        this.submitted = false;
                        
                    },
                        (error) => {
                            if (error.status === 403) {
                                console.error("Access forbidden:", error.statusText);
                                this.showError("פעולה נדחתה,אין לך הרשאה ")
                            } else {
                                if (error.status === 401) {
                                    console.error("Anuthorized:", error.statusText);
                                    this.showError("אירעה שגיאה, אינך רשום לביצוע פעולות");
                                }
                                if (error.status === 400) {
                                    console.error("Missing requires fields:", error.statusText);
                                    this.showError("חסר שדות חובה,מלא שנית");
                                }
                                else {
                                    console.error("Unexpected error:", error.statusText);
                                    this.showError("אירעה שגיאה, אינך רשום לביצוע פעולות");
                                }
                            }
                        })
            }
            else {
                this.editProd.donors = [];
                this.selectedDonors.forEach(element => {
                    this.editProd.donors.push(element)
                });
                console.log(this.editProd);
                this.productService.createPresent(this.editProd)
                    .subscribe((data) => {
                        this.listProducts = data;
                        this.show("מתנה נוספה בהצלחה")
                        this.updatedList.emit(data);
                        console.log("Success:", data);
                    },
                        (error) => {
                            // הפעולה במקרה של כישלון
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
                                    this.showError("חסר שדות חובה,מלא שנית");
                                }
                                else {
                                    console.error("Unexpected error:", error.statusText);
                                    this.showError("אירעה שגיאה, אינך רשום לביצוע פעולות");
                                }
                            }
                        });
            }
            console.log(this.listProducts);
            this.isVisible = false;
        }
    }

    hideDialog() {
        console.log("נכנסתי כדי למחוק");
        this.isVisible = false;
        this.submitted = false;
       
    }
    showInputField = false;

    handleDonorChange(event: any) {
        const selectedOption = event.value;
        if (selectedOption === 'אחר') {
            this.showInputField = true;
        } else {
            this.showInputField = false;
        }
    }

    sendVisible() {
        this.Visible.emit(this.isVisible);
        this.showInputField = false;
    }
    isNameExists(): boolean {
        return this.listProducts.some((p) => p.name === this.editProd.name);
    }
}


