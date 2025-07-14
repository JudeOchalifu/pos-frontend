import { AppUser } from './AppUser';

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  timestamp: string;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface Pageable {
  sort: Sort;
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}

export interface PaginatedResponse<T> {
  content: T[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: Sort;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface LoginResponse {
  appUser: AppUser;
  message: string;
  token: string;
  username: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  lastLoginAt?: string;
}

export interface ErrorResponse {
  message: string;
  error: string;
  statusCode: number;
  timestamp: string;
  path: string;
} 