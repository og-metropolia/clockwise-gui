export type Role = 'EMPLOYEE' | 'MANAGER' | 'ADMIN';

export type Language = 'en' | 'fi' | 'sv';

type User = {
  id: string;
  email: string;
  password: string;
  role: Role;
  first_name: string;
  last_name: string;
  job_title?: string;
  phone?: string;
  language: Language;
  profile_picture?: string;
  manager?: string;
  createdAt: Date;
  updatedAt: Date;
  company: Company;
};

export type LoginUser = Omit<User, 'password'>;

export type UserInput = Pick<
  User,
  'email' | 'password' | 'first_name' | 'last_name' | 'language' | 'manager'
> & {
  company: string;
};

export type EntryType =
  | 'working'
  | 'official duties'
  | 'Sick child'
  | 'family member sick'
  | 'holiday leave'
  | 'special leave'
  | 'sick leave';

export type Entry = {
  id: string;
  user_id: string;
  start_timestamp: Date;
  end_timestamp: Date;
  type: EntryType;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Company = {
  id: string;
  name: string;
  allowed_emails: string[];
  business_identity_code: string;
  createdAt: Date;
  updatedAt: Date;
};
