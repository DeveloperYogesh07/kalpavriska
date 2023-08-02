import { Request, Response, NextFunction } from "express";
import { genSaltSync, hashSync, compareSync } from "bcryptjs";
import { Connection,  RowDataPacket, ResultSetHeader } from "mysql2/promise"; // Import the necessary types for the promise-based client
import { sign } from "jsonwebtoken";

const connection: Connection = require("../dbConnection/dbconnection");

interface User {
  id?: number; // Add an optional 'id' property to the User interface for update and delete operations
  name: string;
  email: string;
  password: string;
  role: string;
}

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query: string = "SELECT * FROM user_table";
    const [results] = await connection.query<RowDataPacket[]>(query);
    return res.status(200).json(results);
  } catch (err) {
    return res.status(401).json(err);
  }
};

const createNewUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: User = req.body;
    const salt = genSaltSync(10);
    user.password = hashSync(user.password, salt);
    const query: string = "INSERT INTO user_table (name, email, password, role) VALUES (?, ?, ?, ?)";
    const [results] = await connection.query<ResultSetHeader>(query, [user.name, user.email, user.password, user.role]);
    return res.status(201).json({ message: "User Added Successfully!!", data: user });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const updateUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id: number = Number(req.params.id);
    let user: User = req.body;
    const salt = genSaltSync(10);
    user.password = hashSync(user.password, salt);
    const query: string = "UPDATE user_table SET name=?, email=?, password=? WHERE id=?";
    const [results] = await connection.query<ResultSetHeader>(query, [user.name, user.email, user.password, id]);
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "User ID not found" });
    }
    return res.status(200).json({ message: "User is updated" });
  } catch (err) {
    return res.status(400).json(err);
  }
};

const deleteUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id: number = Number(req.params.id);
    const query: string = "DELETE FROM user_table WHERE id=?";
    const [results] = await connection.query<ResultSetHeader>(query, [id]);
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "User ID not found" });
    }
    return res.status(200).json({ message: "User is deleted!!" });
  } catch (err) {
    return res.status(400).json(err);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const query: string = "SELECT * FROM user_table WHERE email=?";
    const [results] = await connection.query<RowDataPacket[]>(query, [email]);
    if (!results[0]) {
      return res.status(404).json({
        success: 0,
        data: "Invalid email or password!!",
      });
    }
    const result: boolean = compareSync(password, results[0].password);
    if (result) {
      results[0].password = undefined;
      const jsontoken = sign({ result: results[0] }, "qwe1234", {
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

export {
  getAllUsers,
  createNewUser,
  updateUserById,
  deleteUserById,
  login,
};
