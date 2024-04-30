import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {supplier} from "../../../Models/Inventory/supplier";
import {environment} from "../../../../environments/environment";
import {branch} from "../../../Models/Inventory/branch";
import {Observable} from "rxjs/internal/Observable";
import {of} from "rxjs";
import {product} from "../../../Models/Inventory/product";
import {branchesProductTemplate} from "../../../Models/Inventory/branchesProductTemplate";

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
    },
    {
      id: 5,
      name: 'Producto 5',
      description: 'Descripción 5',
      category: 'Categoría 5',
      sellPrice: 500
    },
    {
      id: 6,
      name: 'Producto 6',
      description: 'Descripción 6',
      category: 'Categoría 6',
      sellPrice: 600
    },
    {
      id: 7,
      name: 'Producto 7',
      description: 'Descripción 7',
      category: 'Categoría 7',
      sellPrice: 700
    },
    {
      id: 8,
      name: 'Producto 8',
      description: 'Descripción 8',
      category: 'Categoría 8',
      sellPrice: 800
    },
    {
      id: 9,
      name: 'Producto 9',
      description: 'Descripción 9',
      category: 'Categoría 9',
      sellPrice: 900
    },
    {
      id: 10,
      name: 'Producto 10',
      description: 'Descripción 10',
      category: 'Categoría 10',
      sellPrice: 1000
    },
    {
      id: 11,
      name: 'Producto 11',
      description: 'Descripción 11',
      category: 'Categoría 11',
      sellPrice: 1100
    },
    {
      id: 12,
      name: 'Producto 12',
      description: 'Descripción 12',
      category: 'Categoría 12',
      sellPrice: 1200
    },
    {
      id: 13,
      name: 'Producto 13',
      description: 'Descripción 13',
      category: 'Categoría 13',
      sellPrice: 1300
    },
    {
      id: 14,
      name: 'Producto 14',
      description: 'Descripción 14',
      category: 'Categoría 14',
      sellPrice: 1400
    },
    {
      id: 15,
      name: 'Producto 15',
      description: 'Descripción 15',
      category: 'Categoría 15',
      sellPrice: 1500
    },
    {
      id: 16,
      name: 'Producto 16',
      description: 'Descripción 16',
      category: 'Categoría 16',
      sellPrice: 1600
    },
    {
      id: 17,
      name: 'Producto 17',
      description: 'Descripción 17',
      category: 'Categoría 17',
      sellPrice: 1700
    },
    {
      id: 18,
      name: 'Producto 18',
      description: 'Descripción 18',
      category: 'Categoría 18',
      sellPrice: 1800
    },
    {
      id: 19,
      name: 'Producto 19',
      description: 'Descripción 19',
      category: 'Categoría 19',
      sellPrice: 1900
    },
    {
      id: 20,
      name: 'Producto 20',
      description: 'Descripción 20',
      category: 'Categoría 20',
      sellPrice: 2000
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

  constructor(
    private http: HttpClient
  ) { }

  getAllBranchesByCompany(id: number): Observable<branch[]> {
    //return this.http.get<branch[]>(`${environment.baseURL}/get/branches/`, { params: { companyId: id.toString() } });
    return of(this.branches);
  }
  generateproductId(): Observable<number> {
    //return this.http.get<number>(`${environment.baseURL}/supplier/generate/id`);
    //return this.http.get<number>('https://localhost:7071/api/supplier/generate/id');
    //generate a random number that is diferent from the ones in the database

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
    //add on the branch the branches prodcuts and the product
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
}
