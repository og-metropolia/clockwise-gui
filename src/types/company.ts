import { LoginUser } from './user';

export type Company = {
  id: string;
  name: string;
  allowed_emails: string[];
  business_identity_code: string;
  employees: LoginUser[];
  managers: LoginUser[];
  createdAt: Date;
  updatedAt: Date;
};
