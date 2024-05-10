import {Component, OnInit} from '@angular/core';
import {AccountingAnalyticService} from "../../../services/analytics-services/accounting-analytic.service";
import {InventoryAnalyticService} from "../../../services/analytics-services/inventory-analytic.service";
import Chart from "chart.js";

@Component({
  selector: 'app-inventory-page',
  standalone: true,
  imports: [],
  templateUrl: './inventory-page.component.html',
  styleUrl: './inventory-page.component.css'
})
export class InventoryPageComponent implements OnInit {

  public categoryStockChart: any;
  public lessStockChart: any;
  public providerStockChart: any;
  dataStock: any ;

  ngOnInit(): void {
    this.loadData( );
  }

  constructor( private inventoryService: InventoryAnalyticService ) { }


  loadData() {
    this.inventoryService.getcategoryVsStockPercentage().subscribe(data => {
      console.log('Category vs Stock Percentage Data:', data);
      this.categoryVsStockPercentageChart(data);
    });

    this.inventoryService.getproductVsTop5lessStock().subscribe(data => {
      console.log('Product vs Top 5 Less Stock Data:', data);
      this.productVsTop5lessStockChart(data);
    });

    this.inventoryService.getproviderVsStockPercentage().subscribe(data => {
      console.log('Provider vs Stock Percentage Data:', data);
      this.providerVsStockPercentageChart(data);
    });
  }


  categoryVsStockPercentageChart(data: { categories: any; stock: any; }) {
    this.categoryStockChart = new Chart("categoryVsStockPercentage", {
      type: 'doughnut',
      data: {
        labels: data.categories,
        datasets: [{
          label: 'Porcentaje de perdida y ganancia',
          data: data.stock,
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



  productVsTop5lessStockChart(data: { products: any; stock: any; }) {
    this.lessStockChart = new Chart("productVsTop5lessStock", {
      type: 'bar',
      data: {
        labels: data.products,
        datasets: [{
          label: 'Productos con menos stock',
          data: data.stock,
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


  providerVsStockPercentageChart(data: { providers: any; stock: any; }) {
    this.providerStockChart = new Chart("providerVsStockPercentage", {
      type: 'doughnut',
      data: {
        labels: data.providers,
        datasets: [{
          label: 'Porcentaje de perdida y ganancia',
          data: data.stock,
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
