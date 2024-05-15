import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CarouselModule, ButtonModule, StyleClassModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {

  data: any = [
    {
      title: "Nómina Eficiente para Negocios Ágiles",
      description:"Optimiza el proceso de pago a empleados, garantizando eficiencia y cumplimiento normativo.",
      benefits:["Registro de empleados y detalles.", "Cálculo automático de salarios.", "Generación de nóminas y documentos fiscales.", "Gestión de ausencias y vacaciones."]
    },
    {
      title: "Impulsa las Ventas de tu Negocio  con Facilidad",
      description:"Facilita el registro y seguimiento de transacciones, mejorando la eficiencia en las ventas y el control de inventario.",
      benefits:["Registro de ventas y productos.", "Facturación simplificada.", "Gestión de inventarios en tiempo real.", "Descuentos y promociones."]
    },
    {
      title: "Finanzas en Automático, Informes en un Vistazo",
      description:"Automatiza la gestión contable para informes financieros precisos, proporcionando una visión clara de tus finanzas.",
      benefits:["Registro de transacciones financieras.","Seguimiento detallado de transacciones.","Ajustes contables auditados.","Generación de informes financieros."]
    },
    {
      title: "Controla tu Stock con Maestría y Elegancia",
      description:"Optimiza la administración de inventarios, proporcionando una visión en tiempo real y mejorando la precisión.",
      benefits:["Registro de productos y detalles.","Seguimiento de existencias y ajustes manuales.","Registro de movimientos de inventario."]
    },
    {
      title: "Visión Estratégica en Tiempo Real",
      description:"Utiliza datos para generar insights estratégicos, permitiendo la toma de decisiones informadas. ",
      benefits:["Extracción y procesamiento avanzado de datos.","Informes predictivos y visualizaciones interactivas."]
    }
  ]

  responsiveOptions: any[] | undefined;

  ngOnInit() {
    this.responsiveOptions = [
      {
          breakpoint: '1199px',
          numVisible: 1,
          numScroll: 1
      },
      {
          breakpoint: '991px',
          numVisible: 2,
          numScroll: 1
      },
      {
          breakpoint: '767px',
          numVisible: 1,
          numScroll: 1
      }
  ];
  }

}
