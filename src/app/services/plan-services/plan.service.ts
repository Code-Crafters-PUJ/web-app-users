import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Plan } from '../../models/user-models/plan';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  private planSubject: BehaviorSubject<Plan | null> = new BehaviorSubject<Plan | null>(null);

  constructor() { }

  setPlan(plan: Plan): void {
    this.planSubject.next(plan);
  }

  getPlan(): Observable<Plan | null> {
    return this.planSubject.asObservable();
  }

  clearPlan(): void {
    this.planSubject.next(null);
  }

  getFreeTrial(): Observable<Plan> {
    const freeTrialPlan: Plan = {
      id: 1,
      type: 'free',
      mensual_price: 0,
      semestral_price: 0,
      anual_price: 0,
      plan_description: 'Plan de prueba gratuita',
      maxUsers: 10
    };
    return of(freeTrialPlan);
  }

}
