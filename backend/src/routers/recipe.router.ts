import { Router } from "express";
import { sample_foods } from "../data";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { RecipeModel, Recipes } from "../models/recipe.model";
const router = Router();

router.get(
  "/seed",
  asyncHandler(async (req, res) => {
    const recipeCount = await RecipeModel.countDocuments();
    if (recipeCount > 0) {
      res.send("Seed is already done");
      return;
    }
    await RecipeModel.create(sample_foods);
    res.send("Seed is done!");
  })
);

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const recipes = await RecipeModel.find();
    res.send(recipes);
  })
);

router.get(
  "/search/:searchTerm",
  asyncHandler(async (req, res) => {
    const searchRegex = new RegExp(req.params.searchTerm, "i");
    const recipes = await RecipeModel.find({ name: { $regex: searchRegex } });
    res.send(recipes);
  })
);

router.get(
  "/:recipeID",
  asyncHandler(async (req, res) => {
    const recipe = await RecipeModel.findById(req.params.recipeID);
    res.send(recipe);
  })
);

router.post(
  "/newRecipe",
  asyncHandler(async (req, res) => {
    const {
      name,
      imageUrl,
      link,
      cookTime,
      origin,
      instructions,
      ingredients,
    } = req.body;
    try {
      const newRecipe: Recipes = {
        id: "",
        name,
        ingredients,
        instructions,
        imageUrl,
        link,
        cookTime,
        origin,
      };
      const dbRecipe = await RecipeModel.create(newRecipe);
      res.send(dbRecipe);
    } catch (error) {
      res.send(error);
    }
    const recipeDetails = req.body;
    res.send(recipeDetails);
  })
);
export default router;
