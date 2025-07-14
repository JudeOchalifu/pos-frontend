export interface Sale {
  id: string;
  appUserId: string;
  initiationTime: string;
  productList: { [key: string]: number };
  tableNumber: number;
  closed: boolean;
  lastEntryTimestamp: string;
  grossAmount: number;
  removedProductsId: string;
  userFirstName: string;
  userLastName: string;
}
