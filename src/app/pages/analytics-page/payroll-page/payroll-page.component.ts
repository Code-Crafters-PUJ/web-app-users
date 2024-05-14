import {Component, OnInit} from '@angular/core';
import Chart from "chart.js";
import {PayrollAnalyticService} from "../../../services/analytics-services/payroll-analytic.service";

@Component({
  selector: 'app-payroll-page',
  standalone: true,
  imports: [],
  templateUrl: './payroll-page.component.html',
  styleUrl: './payroll-page.component.css'
})
export class PayrollPageComponent implements OnInit {


  public monthlyChart: any;
  public fortnightChart: any;



  constructor(private payrollService: PayrollAnalyticService) {}

  ngOnInit(): void {
    this.loadData();
  }


  loadData() {
    this.payrollService.getMonthVsSalary().subscribe(data => {
      this.monthVsSalaryChart(data);
    });

    this.payrollService.getFortnightVsSalary().subscribe(data => {
      this.fortnightsChart(data);
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

  fortnightsChart(data: { fortnights: any; salaries: any; }) {
    this.fortnightChart = new Chart("fortnights", {
      type: 'line',
      data: {
        labels: data.fortnights,
        datasets: [{
          label: 'Salario Quincenal',
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
}
