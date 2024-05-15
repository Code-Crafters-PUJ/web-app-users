import { Injectable } from '@angular/core';
import {supplier} from "../../../Models/Inventory/supplier";
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import {environment} from "../../../../environments/environment";
import {of} from "rxjs";
import {ProductService} from "../product/product.service";
import {branch} from "../../../models/Inventory/branch";
import {product} from "../../../models/Inventory/product";
import {branchesProductTemplate} from "../../../Models/Inventory/branchesProductTemplate";
import {order} from "../../../Models/Inventory/order";

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private products: product[] = [
    {
      id: 1,
      name: 'Producto 1',
      description: 'Descripción 1',
      category: 'Categoría 1',
      sellPrice: 100
    },
    {
      id: 2,
      name: 'Producto 2',
      description: 'Descripción 2',
      category: 'Categoría 2',
      sellPrice: 200
    },
    {
      id: 3,
      name: 'Producto 3',
      description: 'Descripción 3',
      category: 'Categoría 3',
      sellPrice: 300
    },
    {
      id: 4,
      name: 'Producto 4',
      description: 'Descripción 4',
      category: 'Categoría 4',
      sellPrice: 400
    }
  ];
  private branches: branch[] = [
    {
      id: 1,
      name: 'Sucursal 1',
      enabled: false,
      products: [
        {
          discount: 0,
          quantity: 10,
          product:{
            id: 1,
            name: 'Producto 1',
            description: 'Descripción 1',
            category: 'Categoría 1',
            sellPrice: 100
          }
        },
        {
          discount: 10,
          quantity: 5,
          product:{
            id: 2,
            name: 'Producto 2',
            description: 'Descripción 2',
            category: 'Categoría 2',
            sellPrice: 200
          }
        },
        {
          discount: 0,
          quantity: 20,
          product:{
            id: 3,
            name: 'Producto 3',
            description: 'Descripción 3',
            category: 'Categoría 3',
            sellPrice: 300
          }
        },
        {
          discount: 0,
          quantity: 10,
          product:{
            id: 4,
            name: 'Producto 4',
            description: 'Descripción 4',
            category: 'Categoría 4',
            sellPrice: 400

          }
        }
      ],
    },
    {
      id: 2,
      name: 'Sucursal 2',
      enabled: false,
      products: [
        {
          discount: 10,
          quantity: 40,
          product:{
            id: 2,
            name: 'Producto 2',
            description: 'Descripción 2',
            category: 'Categoría 2',
            sellPrice: 200
          }
        },
        {
          discount: 0,
          quantity: 20,
          product:
            {
              id: 3,
              name: 'Producto 3',
              description: 'Descripción 3',
              category: 'Categoría 3',
              sellPrice: 300
            }
        }
      ]
    },
  ];
  orders:order[]=[];
  order ={
    productName: 'Producto 1',
    supplierName: 'Ana Perez',
    costPrice: 25,
    purchaseDate: 2024-15-12,
    branchOrders: [
      {
        branchName: 'Sucursal 1',
        quantity: 10
      },
      {
        branchName: 'Sucursal 2',
        quantity: 5
      },
      {
        branchName: 'Sucursal 3',
        quantity: 20
      }

    ],
  }

  private suppliers: supplier[] = [
    {
      id: 82374,
      name: 'Juan Perez',
      supplierType: '1',
      address: 'Calle 123',
      phone: '123456',
      email: 'akfhk@',
      urlPage: 'www.juanperez.com',
      serviceType: 'Servicio'
    },
    {
      id: 82375,
      name: 'Maria Perez',
      supplierType: '1',
      address: 'Calle 123',
      phone: '123456',
      email: 'akfhk@',
      urlPage: 'www.juanperez.com',
      serviceType: 'Servicio'
    },
    {
      id: 82376,
      name: 'Pedro Perez',
      supplierType: '2',
      address: 'Calle 123',
      phone: '123456',
      email: 'akfhk@',
      urlPage: 'www.juanperez.com',
      serviceType: 'Servicio'
    },
    {
      id: 82377,
      name: 'Jose Perez',
      supplierType: '4',
      address: 'Calle 123',
      phone: '123456',
      email: 'akfhk@',
      urlPage: 'www.juanperez.com',
      serviceType: 'Servicio'
    },
    {
      id: 82378,
      name: 'Ana Perez',
      supplierType: '3',
      address: 'Calle 123',
      phone: '123456',
      email: 'akfhk@',
      urlPage: 'www.juanperez.com',
      serviceType: 'Servicio'
    }
  ];

  constructor(
    private http: HttpClient,
    private productService: ProductService
  ) { }

   createSupplier(newsupplier: supplier, companyId: number): Observable<boolean> {
     switch (newsupplier.supplierType) {
        case 'Persona':
          newsupplier.supplierType = '1';
          break;
        case 'Empresa':
          newsupplier.supplierType = '2';
          break;
        case 'Organización':
          newsupplier.supplierType = '3';
          break;
        case 'Fundación':
          newsupplier.supplierType = '4';
          break;
     }
     //TODO: 'include company id in the request'
     //return this.http.post<supplier>(`${environment.baseURL}/create/supplier`, newsupplier);
     //return this.http.post<supplier>('https://localhost:7071/api/supplier', newsupplier);
      //create the supplier in the database
      this.suppliers.push(newsupplier);
     return of(true);
  }

  generateSupplierId(): Observable<number> {
    //return this.http.get<number>(`${environment.baseURL}/supplier/generate/id`);
    //return this.http.get<number>('https://localhost:7071/api/supplier/generate/id');
    //generate a random number that is diferent from the ones in the database

    let num = Math.floor(Math.random() * 100000);
    let i = 0;
    while (i < this.suppliers.length) {
      if (this.suppliers[i].id == num) {
        num = Math.floor(Math.random() * 100000);
        i = 0;
      } else {
        i++;
      }
    }
    return of(num);
  }

  getSupplierById(supplierId: number, companyId: number): Observable<supplier> {
    //TODO: 'include company id in the request'
    //return this.http.get<supplier>(`${environment.baseURL}/get/supplier/${supplierId}`);
    //return this.http.get<supplier>(`https://localhost:7071/api/get/supplier/${supplierId}`);
    //get the supplier from the database
    let supplier: supplier = {
      id: 0,
      name: '',
      supplierType: '',
      address: '',
      phone: '',
      email: '',
      urlPage: '',
      serviceType: ''
    };

    const result = this.suppliers.find(supplier => supplier.id === supplierId);
    if (result !== undefined){
      supplier = result;
    }
    return of(supplier);
  }

  getAllSuppliersByCompany(companyId: number): Observable<supplier[]>{
    //return this.http.get<supplier[]>(`${environment.baseURL}/get/suppliers/${companyId}`);
    //return this.http.get<supplier[]>(`https://localhost:7071/get/suppliers/${companyId}`);
    return of(this.suppliers);
  }

  deleteSupplier(supplierId: number, companyId:number): Observable<boolean>{
    //TODO: 'include company id in the request'
    //return this.http.delete(`${environment.baseURL}/delete/supplier/${supplierId}`);
    //return this.http.delete(`https://localhost:7071/delete/supplier/${supplierId}`);
    //delete the supplier from the database
    let i = 0;
    while (i < this.suppliers.length) {
      if (this.suppliers[i].id == supplierId) {
        this.suppliers.splice(i, 1);
        i = this.suppliers.length;
      } else {
        i++;
      }
    }
    return of(true);
  }

  editSupplier(supplier: supplier, companyId:number): Observable<boolean>{
    switch (supplier.supplierType) {
      case 'Persona':
        supplier.supplierType = '1';
        break;
      case 'Empresa':
        supplier.supplierType = '2';
        break;
      case 'Organización':
        supplier.supplierType = '3';
        break;
      case 'Fundación':
        supplier.supplierType = '4';
        break;
    }
    //TODO: 'include company id in the request'
    //return this.http.put(`${environment.baseURL}/edit/supplier`, supplier);
    //return this.http.put(`https://localhost:7071/edit/supplier`, supplier);
    //edit the supplier in the database
    let i = 0;
    while (i < this.suppliers.length) {
      if (this.suppliers[i].id == supplier.id) {
        this.suppliers[i] = supplier;
        i = this.suppliers.length;
      } else {
        i++;
      }
    }
    return of(true);
  }

  getOrdersBySupplierId(supplierId:any, companyId: number): Observable<order[]> {
    //return this.http.get<order[]>(`${environment.baseURL}/get/orders/${companyId}`);
    //return this.http.get<order[]>(`https://localhost:7071/api/orders/${companyId}`);
    //Get supplier name
    let supplier:any;
      this.getSupplierById(supplierId, companyId).subscribe(
        (data) => {
          supplier = data;
        }
      );

    let ord = this.orders.filter(order => order.supplierName === supplier.name);
    return of(ord);
  }
  getAllBranchesByCompany(id: number): Observable<branch[]> {
    //return this.http.get<branch[]>(`${environment.baseURL}/get/branches/`, { params: { companyId: id.toString() } });
    return of(this.branches);
  }
  generateproductId(): Observable<number> {
    //return this.http.get<number>(`${environment.baseURL}/supplier/generate/id`);
    //return this.http.get<number>('https://localhost:7071/api/supplier/generate/id');
    //generate a random number that is different from the ones in the database

    let num = Math.floor(Math.random() * 100000);
    let i = 0;
    while (i < this.products.length) {
      if (this.products[i].id == num) {
        num = Math.floor(Math.random() * 100000);
        i = 0;
      } else {
        i++;
      }
    }
    return of(num);
  }
  getAllBranchesNames(): Observable<string[]> {
    return of(this.branches.map(branch => branch.name));
  }

  createProduct(newProduct: product, branchesProducts: branchesProductTemplate[]) {
    //return this.http.post<product>(`${environment.baseURL}/create/product`, newProduct);
    //return this.http.post<product>('https://localhost:7071/api/product', newProduct);

    this.products.push(newProduct);
    //add on the branch the branches products and the product
    branchesProducts.forEach(branchProduct => {
      const branch = this.branches.find(branch => branch.name === branchProduct.branchName);
      if (branch) {
        branch.products.push({
          discount: branchProduct.discount,
          quantity: branchProduct.quantity,
          product: newProduct
        });
      }
      else{
        console.error('Branch not found');
      }
    });
    return of(true);

  }
  getProductById(id: number): Observable<product> {
    //return this.http.get<product>(`${environment.baseURL}/get/product`, { params: { productId: id.toString() } });
    //return this.http.get<product>(`https://localhost:7071/api/product/${id}`);
    const product = this.products.find(product => product.id === id);
    if (product !== undefined){
      return of(product);
    }
    else{
      return of({
        id: 0,
        name: '',
        description: '',
        category: '',
        sellPrice: 0
      });
    }

  }

  getAllBranchesByProduct(productId: number): Observable<branchesProductTemplate[]> {
    //return this.http.get<branchesProductTemplate[]>(`${environment.baseURL}/get/branches/product`, { params: { productId: productId.toString() } });
    //return this.http.get<branchesProductTemplate[]>(`https://localhost:7071/api/product/${productId}/branches`);
    const branchesProducts: branchesProductTemplate[] = [];
    this.branches.forEach(branch => {
      branch.products.forEach(product => {
        if (product.product.id === productId){
          branchesProducts.push({
            branchName: branch.name,
            discount: product.discount,
            quantity: product.quantity,
            enabled: false
          });
        }
      });
    });
    return of(branchesProducts);
  }

  deleteProduct(productId: number) {
    //return this.http.delete(`${environment.baseURL}/delete/product`, { params: { productId: productId.toString() } });
    //return this.http.delete(`https://localhost:7071/api/product/${productId}`);
    this.products = this.products.filter(product => product.id !== productId);
    this.branches.forEach(branch => {
      branch.products = branch.products.filter(product => product.product.id !== productId);
    });
    return of(true);

  }

  updateProduct(product: product, enabledBranches: branchesProductTemplate[]) {
    //return this.http.put<product>(`${environment.baseURL}/update/product`, product);
    //return this.http.put<product>(`https://localhost:7071/api/product`, product);
    let result =false;
    const productIndex = this.products.findIndex(p => p.id === product.id);
    if (productIndex !== -1){
      this.products[productIndex] = product;
      //update the branches
      enabledBranches.forEach(branchProduct => {
        const branch = this.branches.find(branch => branch.name === branchProduct.branchName);
        if (branch){
          const productIndex = branch.products.findIndex(p => p.product.id === product.id);
          if (productIndex !== -1){
            branch.products[productIndex].quantity = branchProduct.quantity;
            branch.products[productIndex].discount = branchProduct.discount;
          }
          else{
            //add the product to the branch
            branch.products.push({
              discount: branchProduct.discount,
              quantity: branchProduct.quantity,
              product: product
            });
          }
          result = true;
        }
        else{
          console.error('Branch not found');
        }
      });
    }
    else{
      console.error('Product not found');

    }
    return of(result);
  }

  generateOrderId(): Observable<number> {
    //return this.http.get<number>(`${environment.baseURL}/supplier/generate/id`);
    //return this.http.get<number>('https://localhost:7071/api/supplier/generate/id');
    //generate a random number that is different from the ones in the database

    let num = Math.floor(Math.random() * 100000);
    let i = 0;
    while (i < this.products.length) {
      if (this.products[i].id == num) {
        num = Math.floor(Math.random() * 100000);
        i = 0;
      } else {
        i++;
      }
    }
    return of(num);
  }

  getAllProductsByCompany(number: number) {
    return of(this.products);

  }

  sendOrder(orderProducts: order) {
    let answer = true;
    const product = this.products.find(product => product.name === orderProducts.productName);
    if(product) {
      //For each branchOrder on orderProdcuts, add the quantity to the product
      orderProducts.branchOrders.forEach(branchOrder => {
        const branch = this.branches.find(branch => branch.name === branchOrder.branchName);
        if (branch) {
          const productIndex = branch.products.findIndex(p => p.product.id === product.id);
          if (productIndex !== -1) {
            branch.products[productIndex].quantity += branchOrder.quantity;
          } else {
            branch.products.push({
              discount: 0,
              quantity: branchOrder.quantity,
              product: product
            });
          }
        } else {
          console.error('Branch not found');
          answer = false;
        }
      });
      console.log("En este momento en product service las ordenes son: ", this.orders);
      this.orders.push(orderProducts);
      console.log("Ahora en este momento en product service las ordenes son: ", this.orders);
    }else {
      console.error('Product not found');
      answer = false;
    }
    return of(answer);
  }


}

