import {Component, OnInit} from '@angular/core';
import {PayrollAnalyticService} from "../../../services/analytics-services/payroll-analytic.service";
import Chart from "chart.js";
import {SalesAnalyticService} from "../../../services/analytics-services/sales-analytic.service";
import {InventoryAnalyticService} from "../../../services/analytics-services/inventory-analytic.service";
import {AccountingAnalyticService} from "../../../services/analytics-services/accounting-analytic.service";

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent implements OnInit {

  public monthlyChart: any;
  public topSaledChart: any;
  public categoryStockChart: any;
  public profitChart: any;


  constructor(private payrollService: PayrollAnalyticService, private salesService: SalesAnalyticService, private inventoryService: InventoryAnalyticService, private analyticService: AccountingAnalyticService) {
  }


  ngOnInit(): void {
    this.loadData();
  }


  loadData() {
    this.payrollService.getMonthVsSalary().subscribe(data => {
      this.monthVsSalaryChart(data);
    });

    this.salesService.getTopSaledProductsVsSales().subscribe(data => {
      this.topSaledProductsVsSalesChart(data);
    });

    this.inventoryService.getcategoryVsStockPercentage().subscribe(data => {
      this.categoryVsStockPercentageChart(data);
    });

    this.analyticService.getlossVsProfitPercentage().subscribe(data => {
      this.lossVsProfitPercentageChart(data);
    });

  }


  monthVsSalaryChart(data: { months: any; salaries: any; }) {
    this.monthlyChart = new Chart("monthVsSalary", {
      type: 'line',
      data: {
        labels: data.months,
        datasets: [{
          label: 'Salario Mensual',
          data: data.salaries,
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


  categoryVsStockPercentageChart(data: { categories: any; stock_percentage: any; }) {
    this.categoryStockChart = new Chart("categoryVsStockPercentage", {
      type: 'doughnut',
      data: {
        labels: data.categories,
        datasets: [{
          label: 'Porcentaje de perdida y ganancia',
          data: data.stock_percentage,
          backgroundColor: [
            'rgb(33,50,91)',
            'rgb(81,189,255)',
            'rgb(81,189,255)',
            'rgb(81,189,255)',
            'rgb(81,189,255)'
          ],
        }]
      },
      options: {
        plugins: {
          legend: {
            display: true,
            labels: {
              font: {
                size: 14,
                family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
              }
            }
          }
        }
      }
    });
  }

  lossVsProfitPercentageChart(data: { loss: any; profit: any; }) {
    this.profitChart = new Chart("lossVsProfitPercentage", {
      type: 'doughnut',
      data: {
        labels: ['Perdida', 'Ganancias'],
        datasets: [{
          label: 'Porcentaje de perdida y ganancia',
          data: [data.profit, data.loss],
          backgroundColor: [
            'rgb(33,50,91)',
            'rgb(81,189,255)'
          ],
        }]
      },
      options: {
        plugins: {
          legend: {
            display: true,
            labels: {
              font: {
                size: 14,
                family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
              }
            }
          }
        }
      }
    });
  }

}




