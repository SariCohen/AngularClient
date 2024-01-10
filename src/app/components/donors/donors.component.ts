
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { donor } from 'src/app/domain/donor';
import { donorService } from 'src/app/services/donorService';

@Component({
  selector: 'app-donors',
  templateUrl: './donors.component.html',
  styleUrls: ['./donors.component.css'],
  providers: [ConfirmationService, MessageService, donorService]
})
export class DonorsComponent {
  donors: donor[];
  imageUrl: string;
  myDonor?: donor = null;
  visible: boolean = false;
  email: string | undefined;
  present: string | undefined;
  name: string | undefined;
  constructor(private donorServices: donorService, private messageService: MessageService) { }

  ngOnInit() {
    this.donorServices.getDonors()
      .subscribe(
        (data) => {
          this.donors = data;
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
            if (error.status === 404) {
              console.error("Donors not found:", error.statusText);
              this.showError("לא נמצאו תורמים");
            }
            else {
              console.error("Unexpected error:", error.statusText);
            }
          }
        });

    this.myDonor = {};
  }
  show(message: string) {
    this.messageService.add({ severity: 'success', summary: 'הצלחה', detail: message });
  }
  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'שגיאה', detail: message });
  }
  deleteDonor(donorId: string) {
    this.donorServices.deleteDonor(donorId).subscribe(
      (data) => {
        if(data!=null){
          this.donors = data;
          this.show("תורם נמחק בהצלחה")
          console.log("Success:", data)
        }
        else{
          this.showError("בלי חרטות!תורם זה כבר תרם מתנה ואין אפשרות למחוק אותו")
        }
       
       
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
          if (error.status === 404) {
            console.error("Not deleted:", error.statusText);
            this.showError("אירעה שגיאה בעת מחיקת התורם");
          }
          else {
            console.error("Unexpected error:", error.statusText);
          }
        }
      })
  };
  submitted:boolean=false;
  saveDonor() {
  
    this.submitted = true;
    if(this.myDonor.donationType!=null && this.myDonor.donorEmail&&this.myDonor.donorId&&this.myDonor.donorName
      &&this.myDonor.donorPhone&&this.myDonor.imageUrl&&this.validateEmail(this.myDonor.donorEmail)==true){
        this.visible = false;
        this.myDonor.donorId.toString();
        this.myDonor.donations = [];
    this.donorServices.createNewDonor(this.myDonor).subscribe(
      (data) => {
        this.donors = data;
        this.show(" תורם נוסף בהצלחה בהצלחה");
        console.log("Success:", data)
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
            this.showError("חסר שדות חובה,מלא שנית");
          }
          else {
            console.error("Unexpected error:", error.statusText);
            this.showError("אירעה שגיאה, אינך רשום לביצוע פעולות");
          }
        }
      })
    }
  };
  donorsNotFound: boolean = false;
  searchDonorByEmail(email: string) {

    this.donorServices.getDonorByEmail(email).subscribe(data => {
      if (data.length == 0) {
        this.donors = [];
        this.donorsNotFound = true;
      }
      else {
        this.donors = data
        this.donorsNotFound = false;
      }

    });
  }
  searchDonorByPresent(present: string) {
    this.donorServices.getDonorByPresentName(present).subscribe(data => {
      if (data.length == 0) {
        this.donors = [];
        this.donorsNotFound = true;
      }
      else {
        this.donors = data
        this.donorsNotFound = false;
      }
    });
  }
  searchDonorByName(name: string) {
    this.donorServices.getDonorByName(name).subscribe(data => {
      if (data.length == 0) {
        this.donors = [];
        this.donorsNotFound = true;

      }
      else {
        this.donors = data
        this.donorsNotFound = false;
      }
    });
  }
  showDialog() {
    this.visible = true;
    this.myDonor = {};
   
  }
  hideDialog() {
    this.visible = false;
    this.submitted = false;
  }
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

}
