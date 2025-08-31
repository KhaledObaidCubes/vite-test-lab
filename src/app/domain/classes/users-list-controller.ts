export default class UsersList {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  phone?: string; // optional
  address?: {
    street: string;
    city: string;
    country: string;
  };
  createdAt: string; // ISO date
  updatedAt?: string;
  constructor() {}
}
