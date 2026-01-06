import { AuthService } from "../service/auth.service.js";
import type { FastifyRequest, FastifyReply } from "fastify";

export class AuthController {
    constructor(private service: AuthService) {}

    async test(request: FastifyRequest, reply: FastifyReply): Promise<void> {
        const testresult = await this.service.testService();

        reply.code(200).send({ message: testresult });
    }
}

