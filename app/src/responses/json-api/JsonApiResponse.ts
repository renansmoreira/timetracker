import { Meta } from './Meta';
import { ResourceObject } from './ResourceObject';

export type JsonApiResponse<T> = {
  meta: Meta,
  type?: string,
  id?: string,
  attributes?: { [key: string]: string },
  data?: ResourceObject<T>[]
};
