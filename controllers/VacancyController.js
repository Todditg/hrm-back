import { UserService } from "../service/userService.js";
import { cookie, validationResult } from "express-validator";
import {VacanciesService} from "../service/vacanciesService.js";

export class vacancyController {
  static async createVacancy(req, res, next) {
    try {
      const { name, pos } = req.body;

      const vacancyData = await VacanciesService.createVacancy(name, pos);

      return res.json(vacancyData);
    } catch (error) {
      console.log(error);
    }
  }

  static async getVacancies(req, res, next) {
    try {
      const users = await VacanciesService.getAllVacancies();
      res.json(users);
    } catch (error) {}
  }

  static async updateVacancy(req, res, next) {
    try {
      const vacancyId = req.params.id; //
      const { name } = req.body; // Данные для обновления

      const userData = await VacanciesService.updateVacancy(vacancyId, {
        name
      });

      return res.json(userData);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: "Failed to update user" });
    }
  }
}
