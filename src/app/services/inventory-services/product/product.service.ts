import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {branch} from "../../../models/Inventory/branch";
import {Observable} from "rxjs/internal/Observable";
import {of} from "rxjs";
import {product} from "../../../models/Inventory/product";
import {branchesProductTemplate} from "../../../Models/Inventory/branchesProductTemplate";
import {order} from "../../../Models/Inventory/order";
import {branchOrder} from "../../../models/Inventory/branchOrder";
import {SupplierService} from "../supplier/supplier.service";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
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
  constructor(
    private http: HttpClient,
  ) { }

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

  getOrdersBySupplierId(supplierId:any, companyId: number): Observable<order[]> {
    //return this.http.get<order[]>(`${environment.baseURL}/get/orders/${companyId}`);
    //return this.http.get<order[]>(`https://localhost:7071/api/orders/${companyId}`);
    //Get supplier name


    let ord = this.orders.filter(order => order.supplierName === supplierId);
    return of(ord);
  }
}
