export interface SubscriptionBilling {
  id: number,
  initial_date: Date,
  final_date: Date,
  amount: number,
  active: boolean,
  payment_date: Date,
  payment_method: string
  plan:string
}
