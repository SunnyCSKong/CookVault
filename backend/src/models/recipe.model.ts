import { Schema, model } from "mongoose";

export interface Recipes {
  id: string;
  name: string;
  ingredients: string[];
  instructions: string[];
  imageUrl: string;
  link: string;
  cookTime: string;
  origin: string;
}

export const RecipeSchema = new Schema<Recipes>(
  {
    name: { type: String, required: true },
    ingredients: { type: [String], required: true },
    instructions: { type: [String], required: true },
    imageUrl: { type: String, required: true },
    link: { type: String, required: true },
    origin: { type: String, required: true },
    cookTime: { type: String, required: true },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);

export const RecipeModel = model<Recipes>("recipe", RecipeSchema);
