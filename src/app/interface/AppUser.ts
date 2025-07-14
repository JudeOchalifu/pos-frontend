export interface AppUser {
  id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  dateCreated: string;
  dateModified: string | null;
  dateOfEmployment: string | null;
  phoneNumber: string | null;
  firebaseId: string | null;
  appUserRoles: AppUserRole[];
}

export interface AppUserRole {
  id: string;
  name: string;
  description: string;
  dateCreated: string;
  privileges: AppUserPrivilege[];
}

export interface AppUserPrivilege {
  id: string;
  name: string;
  description: string;
  type: string | null;
}

export interface AppUserPageable {
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}

export interface AppUserPaginatedResponse {
  content: AppUser[];
  pageable: AppUserPageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
} 