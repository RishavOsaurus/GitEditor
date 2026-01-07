import crypto from 'crypto'
import type { FastifyRequest } from 'fastify';

export class AuthService {
    constructor() {}

    async testService() :Promise<string> {
        return "Service is working";
    }

    async handleGithubCallback(request: FastifyRequest): Promise<any> {
        const code = (request.query as any).code;

        // Exchange code for access token
        const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code
            })
        });

        const tokenData = await tokenResponse.json() as { access_token?: string };

        if (!tokenData.access_token) {
            throw new Error('Failed to obtain access token from GitHub');
        }

        // Use the access token to fetch user data
        const userResponse = await fetch('https://api.github.com/user', {
            headers: {
                'Authorization': `Bearer ${tokenData.access_token}`,
                'Accept': 'application/json'
            }
        });

        const userData = await userResponse.json();

        return { success: true, user: userData };
    }
    
    async handleGithubStart(): Promise<any> {
        const state = crypto.randomBytes(32).toString('hex');
        const clientId = process.env.GITHUB_CLIENT_ID;
        const redirectUri = process.env.GITHUB_REDIRECT_URI;
        const scope = 'read:user user:email';

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