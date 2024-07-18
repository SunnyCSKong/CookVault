export class Recipes {
  id!: string;
  name!: string;
  ingredients?: string[];
  instructions?: string[];
  imageUrl?: string;
  link?: string;
  cookTime!: string;
  origin!: string;
}
