import { Component, ViewEncapsulation } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { AppBlogCardsComponent } from 'src/app/components/blog-card/blog-card.component';
import { AppSalesProfitComponent } from 'src/app/components/sales-profit/sales-profit.component';
import { AppTotalIncomeComponent } from 'src/app/components/total-income/total-income.component';
import {AppStockReportComponent} from 'src/app/components/stock/stock-report.component';
import { AppEarningReportsComponent } from 'src/app/components/earning-reports/earning-reports.component';
import {AppTotalTablesComponent} from "../../components/total-tables/total-tables.component";
import {SalesComponent} from "../../components/sales/sales.component";

@Component({
  selector: 'app-starter',
  imports: [
    MaterialModule,
    //AppBlogCardsComponent,
    AppSalesProfitComponent,
    AppTotalTablesComponent,
    AppTotalIncomeComponent,
    AppStockReportComponent,
    AppEarningReportsComponent,
  ],
  templateUrl: './starter.component.html',
  encapsulation: ViewEncapsulation.None,
  standalone: true
})
export class StarterComponent { }
