import { AuthController } from "./auth.controller.js";
import {AuthService} from "../service/auth.service.js";

const authService = new AuthService();
export const authController = new AuthController(authService);