import { Recipes } from './Recipes';

export class User {
  id!: string;
  email!: string;
  name!: string;
  token!: string;
  isAdmin!: boolean;
  recipes?: Recipes[];
}
