import { Schema, model } from "mongoose";
import { Recipes, RecipeSchema } from "./recipe.model";

export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  isAdmin: boolean;
  recipes: Recipes[];
}

export const UserSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true },
    recipes: { type: [RecipeSchema], required: true },
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

export const UserModel = model<User>("user", UserSchema);
