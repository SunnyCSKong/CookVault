import { Router } from "express";
import { sample_users } from "../data";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { User, UserModel } from "../models/user.model";
import { HTTP_BAD_REQUEST } from "../constants/http_status";
import bcrypt from "bcryptjs";

const router = Router();

router.get(
  "/seed",
  asyncHandler(async (req, res) => {
    const userCount = await UserModel.countDocuments();
    if (userCount > 0) {
      res.send("Seed is already done");
      return;
    }
    await UserModel.create(sample_users);
    res.send("Seed is done!");
  })
);

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.send(generateTokenResponse(user));
    } else {
      res.status(HTTP_BAD_REQUEST).send("Email or password is invalid");
    }
  })
);

router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      res
        .status(HTTP_BAD_REQUEST)
        .send("Email has already been used. Please login.");
      return;
    } else {
      const encryptedPassword = await bcrypt.hash(password, 10);
      const newUser: User = {
        id: "",
        name,
        email: email.toLowerCase(),
        password: encryptedPassword,
        isAdmin: false,
        recipes: [],
      };
      const dbUser = await UserModel.create(newUser);
      res.send(generateTokenResponse(dbUser));
    }
  })
);

router.post(
  "/addRecipeToUser",
  asyncHandler(async (req, res) => {
    const { recipe, user } = req.body;
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(
        user.id,
        {
          $push: { recipes: recipe },
        },
        { new: true }
      );
      res.send(updatedUser);
    } catch (error) {
      res.send(error);
    }
  })
);

const generateTokenResponse = (user: any) => {
  const token = jwt.sign(
    {
      email: user.email,
      isAdmin: user.isAdmin,
    },
    "sometext",
    {
      expiresIn: "30d",
    }
  );
  user.token = token;
  return user;
};

export default router;
