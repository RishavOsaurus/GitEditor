import type { FastifyInstance } from "fastify";

export default async function authRoutes(fastify: FastifyInstance) {
  fastify.register(async (app) => {
    app.get('/', async (req, res) => {
      return { message: "Auth route" };
    });
  }, { prefix: '/api/v1/auth' });
}