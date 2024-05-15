export interface Compras {
    Codigo: number;
    Fecha: string;
    Proveedor: string;
    Descripcion: string;
    "Cantidad de Articulos": number;
    Impuestos: number;
    Total: number;
  }
  
  export interface Ventas {
    Codigo: number;
    Fecha: string;
    Cliente: string;
    Descripcion: string;
    "Cantidad de Articulos": number;
    Impuestos: number;
    Total: number;
  }
  
  export interface Gastos {
    Codigo: number;
    Fecha: string;
    "Tipo de gasto": string;
    Detalle: string;
    Cantidad: number;
    Impuestos: number;
    Total: number;
  }
  
  export interface CuentasPorCobrar {
    Codigo: number;
    Fecha: string;
    Cliente: string;
    Monto: number;
    "Fecha de vencimiento": string;
    Estado: string;
  }
  
  export interface CuentasPorPagar {
    Codigo: number;
    Fecha: string;
    Proveedor: string;
    Monto: number;
    "Fecha de Vencimiento": string;
    Estado: string;
  }
  
  export interface Activos {
    Codigo: number;
    "Tipo de activo": string;
    Nombre: string;
    Valor: number;
    "Fecha de adquisicion": string;
    "Vida util": number;
  }
  
  export interface Pasivos {
    Codigo: number;
    "Tipo de pasivos": string;
    Nombre: string;
    Monto: number;
    "Fecha de vencimiento": string;
    "Tasa de interes": number;
  }
  
  export interface CapitalContable {
    Codigo: number;
    Capital: number;
    "Ganancias Retenidas": number;
    "Número de inversionistas": number;
    Fecha: string;
  }
  
  export interface TransaccionBancaria {
    Codigo: number;
    Fecha: string;
    "Tipo de transaccion": string;
    Monto: number;
    "Cuenta de Origen": string;
    "Cuenta de Destino": string;
    Descripcion: string;
  }
  
  export interface Impuestos {
    Codigo: number;
    "Tipo de Impuesto": string;
    Monto: number;
    Fecha: string;
    Descripcion: string;
  }
  
  export interface AsuntosContables {
    Codigo: number;
    Fecha: string;
    "Cuenta de Debito": string;
    "Cuenta de Credito": string;
    Monto: number;
    Descripcion: string;
  }
  
  export interface EstadosFinancieros {
    Codigo: number;
    Fecha: string;
    "Tipo de Estado Financiero": string;
    Contenido: string;
    Analisis: string;
  }
  