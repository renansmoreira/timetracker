export interface ProjectPersistenceModel {
  id: string;
  name: string;
  valuePerHour?: number;
  currency?: string;
  customerId: string;
}
