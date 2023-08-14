import { Request, Response, NextFunction } from "express";
import { genSaltSync, hashSync, compareSync } from "bcryptjs";
import UserModel from "../models/users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface UserInterface {
  id?: number;
  name: string;
  email: string;
  password: string;
  role: string;
}

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allUsers: UserInterface[] = await UserModel.findAll({ raw: true });
    return res.status(200).json({ message: "success", data: allUsers });
  } catch (err) {
    console.error("Error fetching all users:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const createNewUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password } = req.body;

    const salt = genSaltSync(10);
    const hashPassword = hashSync(password, salt);
    const newUser: UserInterface = await UserModel.create({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
      role: req.body.role,
    });

    return res
      .status(201)
      .json({ message: "User Added Successfully!!", data: newUser });
  } catch (err) {
    console.error("Sequelize validation error:", err.message);
    return res.status(500).json(err);
  }
};

const updateUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id: number = Number(req.params.id);

    console.log(id);
    let { name, email, password } = req.body;
    const salt = genSaltSync(10);
    const hashPassword = hashSync(password, salt);

    await UserModel.update(
      {
        name: name,
        email: email,
        password: hashPassword,
      },
      { where: { id } }
    );
    const updatedUser: UserInterface = await UserModel.findByPk(id);

    return res
      .status(200)
      .json({ message: "user updated sucsessfully!!", data: updatedUser });
  } catch (err) {
    return res.status(400).json(err);
  }
};

const deleteUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id: number = Number(req.params.id);
    const deletedUser: UserInterface = await UserModel.findByPk(id);

    await UserModel.destroy({ where: { id } });
    res
      .status(200)
      .json({ message: "user deleted sucsesfully", data: deletedUser });
  } catch (err) {
    return res.status(400).json(err);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({
        success: 0,
        data: "Invalid email or password!!",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      user.password = undefined;

      const jsontoken = jwt.sign({ user }, "qwe1234", {
        expiresIn: "1h",
      });

      return res.json({
        success: 1,
        message: "Login successfully",
        token: jsontoken,
      });
    } else {
      return res.json({
        success: 0,
        message: "Invalid email or password",
      });
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};

export { getAllUsers, createNewUser, updateUserById, deleteUserById, login };
