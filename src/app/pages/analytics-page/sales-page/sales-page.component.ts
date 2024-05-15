import {Component, OnInit} from '@angular/core';
import Chart from "chart.js";
import {SalesAnalyticService} from "../../../services/analytics-services/sales-analytic.service";
import {SidebarComponent} from "../../../general/sidebar/sidebar.component";

@Component({
  selector: 'app-sales-page',
  standalone: true,
  imports: [
    SidebarComponent
  ],
  templateUrl: './sales-page.component.html',
  styleUrl: './sales-page.component.css'
})
export class SalesPageComponent implements OnInit {

  public topSaledChart: any;
  public incomeChart: any;
  public branchChart: any;

  ngOnInit(): void {
    this.loadData();
  }

  constructor(private salesService: SalesAnalyticService) {}


  loadData() {
    this.salesService.getTopSaledProductsVsSales().subscribe(data => {
      this.topSaledProductsVsSalesChart(data);
    });

    this.salesService.getMonthVsIncome().subscribe(data => {
      this.monthVsIncomeChart(data);
    });

    this.salesService.getBranchVsSales().subscribe(data => {
      this.branchVsSalesChart(data);
    });
  }

  topSaledProductsVsSalesChart(data: { products: any; sales: any; }) {
    this.topSaledChart = new Chart("topSaledProductsVsSales", {
      type: 'bar',
      data: {
        labels: data.products,
        datasets: [{
          label: 'Productos con menos stock',
          data: data.sales,
          backgroundColor: [
            'rgb(81,189,255)',
            'rgb(81,189,255)',
            'rgb(81,189,255)',
            'rgb(81,189,255)',
            'rgb(81,189,255)'
          ]
        }]
      }
    })
  }


  monthVsIncomeChart(data: { months: any; income: any; }) {
    this.incomeChart = new Chart("monthVsIncome", {
      type: 'line',
      data: {
        labels: data.months,
        datasets: [{
          label: 'Salario Quincenal',
          data: data.income,
          borderColor: 'rgb(81,189,255)',
          fill: false,
          pointRadius: 2,
          pointHitRadius: 3
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }


  branchVsSalesChart(data: { branches: any; sales: any; }) {
    this.branchChart = new Chart("branchVsSales", {
      type: 'bar',
      data: {
        labels: data.branches,
        datasets: [{
          label: 'Productos con menos stock',
          data: data.sales,
          backgroundColor: [
            'rgb(81,189,255)',
            'rgb(81,189,255)',
            'rgb(81,189,255)',
            'rgb(81,189,255)',
            'rgb(81,189,255)'
          ]
        }]
      }
    })
  }
}
