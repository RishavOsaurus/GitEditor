import { AuthService } from "../service/auth.service.js";
import type { FastifyRequest, FastifyReply } from "fastify";
import { sendErrorResponse, sendSuccessResponse } from "../utils/response.js";
export class AuthController {
    constructor(private service: AuthService) {}

    async test(request: FastifyRequest, reply: FastifyReply): Promise<void> {
        const testresult = await this.service.testService();

        reply.code(200).send({ message: testresult });
    }

    async githubCallback(request: FastifyRequest, reply: FastifyReply): Promise<void> {
        const state_cookie = request.cookies['oauth_state'];
        const returned_state = (request.query as any).state;
        
        if (!state_cookie || state_cookie !== returned_state) {
            return sendErrorResponse(reply, 'Invalid OAuth state', 400);
        }

        await this.service.handleGithubCallback(request);

        const redirectUrl = process.env.GITHUB_DASHBOARD_URL || ""
        return reply.redirect(redirectUrl);
    }

    async githubStart(request: FastifyRequest, reply: FastifyReply): Promise<void> {
        const { authUrl, state } = await this.service.handleGithubStart();

        // set HttpOnly cookie with the generated state
        reply.setCookie('oauth_state', state, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 15 // 15 minutes
        });

        return reply.redirect(authUrl);
    }

 
}

