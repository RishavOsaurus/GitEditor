import crypto from 'crypto'
import type { FastifyRequest } from 'fastify';
import { fetchGithubAccessToken, fetchGithubUser } from '../utils/fetchGithubData.js';
import { UserRepository } from '../repositories/user.repository.js';
export class AuthService {


    async testService() :Promise<string> {
        return "Service is working";
    }

    async handleGithubCallback(request: FastifyRequest): Promise<any> {
        const code = (request.query as any).code;
        const accessToken = await fetchGithubAccessToken(code);
        const userData = await fetchGithubUser(accessToken);
        userData.redirectToDashboard = "/dashboard";
        return {userData}
    }
    
    async handleGithubStart(): Promise<any> {
        const state = crypto.randomBytes(32).toString('hex');
        const clientId = process.env.GITHUB_CLIENT_ID;
        const redirectUri = process.env.GITHUB_REDIRECT_URI;
        const scope = 'read:user user:email repo';

        const params = new URLSearchParams({
            client_id: clientId || '',
            redirect_uri: redirectUri || '',
            scope,
            state,
            allow_signup: 'true'
        });

        const authUrl = `https://github.com/login/oauth/authorize?${params.toString()}`;

        return { authUrl, state };
    }
}