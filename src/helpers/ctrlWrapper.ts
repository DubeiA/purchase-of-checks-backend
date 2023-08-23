import { Request, Response, NextFunction, RequestHandler } from "express";

export const ctrlWrapper = (ctrl: RequestHandler) => {
  const wrapper = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      next(error);
    }
  };

  return wrapper;
};
