import { Request, Response } from "express";
import { InterfaceUser } from "../models/User";

export interface MyContext {
  req: Request;
  res: Response;
  user: InterfaceUser;
}
