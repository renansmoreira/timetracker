import { CustomerSchema } from '../customers/CustomerSchema';

export type ProjectSchema = {
  id?: string;
  name: string;
  billable: boolean;
  customer: CustomerSchema;
};
