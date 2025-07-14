export interface SalesFilterRequest {
  page: number;
  size: number;
  fromDate: string;
  toDate: string;
  region: string;
  productType: string;
}
