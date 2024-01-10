import { Component } from '@angular/core';
// import { Router } from 'express';
import { MenuItem } from 'primeng/api';
import {Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  items: MenuItem[] | undefined;

  activeItem: MenuItem| undefined;
  constructor(private router:Router){}
  ngOnInit() {
      this.items = [
          { label: 'בית', icon: 'pi pi-fw pi-home' },
          //{ label: 'עגלה', icon: 'pi pi-shopping-cart' },
          { label: 'תורמים', icon: 'pi pi-users' },
          { label: 'רכישה', icon: 'pi pi-fw pi-cog' },
          { label: 'מתנות', icon: 'pi pi-gift' },
          //{ label: 'תשלום', icon: 'pi pi-credit-card' },
          { label: 'כניסה', icon: 'pi pi-verified' },
          {label:'הגרלה',icon:'pi pi-thumbs-up'}
      ];

      this.activeItem = this.items[0];
  }
changeRoute(item:any){
 let route=item.label
 this.router.navigate(['/'+route+'/']);
}
today = new Date();
  }



