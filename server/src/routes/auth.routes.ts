import type { FastifyInstance } from "fastify";
import { authController } from "../controllers/index.js";

export default async function authRoutes(fastify: FastifyInstance): Promise<void> {
  fastify.register(async (app) => {
    app.get('/', {
      handler: authController.test.bind(authController)
    });

    app.get('/github/callback', {
      handler: authController.githubCallback.bind(authController)
    });
  }, { prefix: '/api/v1/auth' });
}