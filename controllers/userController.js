import { UserService } from "../service/userService.js";
import { cookie, validationResult } from "express-validator";

export class userController {
  static async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.json({
          message: "Some errors at password or email validate"
        });
      }
      const { email, password, lastName, firstName } = req.body;
      const userData = await UserService.registration(
        email,
        password,
        firstName,
        lastName
      );

      //ВСЕ ЗАПРОСЫ К КЛАССАМ НА БЭКЕ ИСПОЛЬЗУЮТСЯ С ЭВЭЙТОМ И АСИНКОМ

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 2600000000,
        httpOnly: true
      });

      return res.json(userData);
    } catch (error) {
      console.log(error);
    }
  }
  static async updateUser(req, res, next) {
    try {
      const userId = req.params.id; // ID пользователя, переданный в параметрах URL
      const { firstName, lastName } = req.body; // Данные для обновления

      const userData = await UserService.updateUser(userId, { firstName, lastName });

      return res.json(userData);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: "Failed to update user" });
    }
  }

  static async getUser(req, res, next) {
    try {
      const userId = req.params.id;
      const userData = await UserService.getUser(userId);

      return res.json(userData);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: "Failed to get user" });
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const userData = await UserService.login(email, password);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 2600000000,
        httpOnly: true
      });
      return res.json(userData);
    } catch (error) {
      console.log(error.message);
    }
  }

  static async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await UserService.logout(refreshToken);

      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (error) {}
  }

  static async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      console.log(activationLink);
      await UserService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (error) {
      console.log(error);
    }
  }

  static async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await UserService.refresh(refreshToken);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 2600000000,
        httpOnly: true
      });

      return res.json(userData);
    } catch (error) {}
  }

  static async getUsers(req, res, next) {
    try {
      const users = await UserService.getAllUsers();
      res.json(users);
    } catch (error) {}
  }
}
