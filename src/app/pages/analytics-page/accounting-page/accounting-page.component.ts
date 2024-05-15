import {Component, OnInit} from '@angular/core';
import Chart from "chart.js";
import {AccountingAnalyticService} from "../../../services/analytics-services/accounting-analytic.service";
import {SidebarComponent} from "../../../general/sidebar/sidebar.component";

@Component({
  selector: 'app-accounting-page',
  standalone: true,
  imports: [
    SidebarComponent
  ],
  templateUrl: './accounting-page.component.html',
  styleUrl: './accounting-page.component.css'
})
export class AccountingPageComponent implements OnInit {

  public profitChart: any;
  public purchaseChart: any;

  constructor( private analyticService: AccountingAnalyticService ) { }

  ngOnInit(): void {
    this.loadData( );
  }

  loadData() {
    this.analyticService.getlossVsProfitPercentage().subscribe(data => {
      this.lossVsProfitPercentageChart(data);
    });

    this.analyticService.getcategoryVsPurchaseAndSales().subscribe(data => {
      this.categoryVsPurchaseAndSalesChart(data);
    });

  }


  lossVsProfitPercentageChart(data: { loss: any; profit: any; }) {
    this.profitChart = new Chart("lossVsProfitPercentage", {
      type: 'doughnut',
      data: {
        labels: ['Perdida', 'Ganancias'],
        datasets: [{
          label: 'Porcentaje de perdida y ganancia',
          data: [ data.profit, data.loss ],
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





  categoryVsPurchaseAndSalesChart(data: { categories: string[], purchase: number[], sales: number[] }) {
    this.purchaseChart = new Chart("categoryVsPurchaseAndSales", {
      type: 'radar',
      data: {
        labels: data.categories,
        datasets: [
          {
            label: 'Compras',
            data: data.purchase,
            fill: true,
            backgroundColor: 'rgba(33,50,91,0.34)',
            borderColor: 'rgb(33,50,91)',
            pointBackgroundColor: 'rgb(33,50,91)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(33,50,91)'
          },
          {
            label: 'Ventas',
            data: data.sales,
            fill: true,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            pointBackgroundColor: 'rgb(54, 162, 235)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(81,189,255)'
          }
        ]
      },
      options: {
        elements: {
          line: {
            borderWidth: 3
          }
        }
      }
    });
  }
}
