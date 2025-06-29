import {Component} from '@angular/core';
import {MaterialModule} from '../../material.module';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {TablerIconsModule} from 'angular-tabler-icons';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {NgScrollbarModule} from 'ngx-scrollbar';


export interface productsData {
  id: number;
  imagePath: string;
  uname: string;
  quantity: string;

  status: string;
  progress: string;
}

const ELEMENT_DATA: productsData[] = [
  {
    id: 1,
    imagePath: 'assets/images/products/s1.jpg',
    uname: 'Heineken Large',
    quantity: '12',
    status: 'LOW',
    progress: 'primary',
  },
  {
    id: 2,
    imagePath: 'assets/images/products/s2.jpg',
    uname: 'Guinness Stout-Large',
    quantity: '500',

    status: 'STOCKED',
    progress: 'secondary',
  },
  {
    id: 3,
    imagePath: 'assets/images/products/s3.jpg',
    uname: 'Star Lager',
    quantity: '200',
    status: 'MEDIUM',
    progress: 'error',
  },
  {
    id: 4,
    imagePath: 'assets/images/products/s4.jpg',
    uname: 'Chivita',
    quantity: '45',

    status: 'LOW',
    progress: 'primary',
  },
];

@Component({
  selector: 'app-stock',
  imports: [
    MaterialModule,
    MatMenuModule,
    MatButtonModule,
    CommonModule,
    TablerIconsModule,
    MatProgressBarModule,
    NgScrollbarModule
  ],
  templateUrl: './stock-report.component.html',
})
export class AppStockReportComponent {

  displayedColumns: string[] = ['products', 'payment', 'status', 'menu'];
  dataSource = ELEMENT_DATA;

  constructor() {
  }
}
