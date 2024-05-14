export interface Plan{
  id: number;
  type: string;
  mensual_price: number;
  semestral_price: number;
  anual_price: number;
  plan_description: string;
  maxUsers: number;
}
