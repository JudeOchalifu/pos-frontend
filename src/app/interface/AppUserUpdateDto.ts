export interface AppUserUpdateDto {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  dateOfEmployment?: string;
  firebaseId?: string;
  roleIds?: string[];
} 