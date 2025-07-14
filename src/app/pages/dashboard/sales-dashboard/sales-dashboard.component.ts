import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { AppSalesProfitComponent } from '../../../components/sales-profit/sales-profit.component';
import { AppTotalIncomeComponent } from '../../../components/total-income/total-income.component';
import { AppStockReportComponent } from '../../../components/stock/stock-report.component';
import { AppEarningReportsComponent } from '../../../components/earning-reports/earning-reports.component';
import { AppTotalTablesComponent } from '../../../components/total-tables/total-tables.component';
import { SalesComponent } from '../../../components/sales/sales.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { DashboardService, DashboardConfig } from '../../../services/dashboard.service';

@Component({
  selector: 'app-sales-dashboard',
  imports: [
    CommonModule,
    MaterialModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    AppSalesProfitComponent,
    AppTotalTablesComponent,
    AppTotalIncomeComponent,
    AppStockReportComponent,
    AppEarningReportsComponent,
  ],
  templateUrl: './sales-dashboard.component.html',
  encapsulation: ViewEncapsulation.None,
  standalone: true
})
export class SalesDashboardComponent implements OnInit {
  dashboardConfig: DashboardConfig;

  constructor(private dashboardService: DashboardService) {
    this.dashboardConfig = this.dashboardService.getDashboardConfig();
  }

  ngOnInit() {
    // Dashboard config is already set in constructor
  }
} 