import { CustomerPersistenceModel } from './customer.pd';

export interface ProjectPersistenceModel {
  id: string;
  name: string;
  billable: boolean;
  customer: CustomerPersistenceModel;
}
