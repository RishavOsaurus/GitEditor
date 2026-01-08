import type { IncomingMessage } from 'http';

export interface GithubUser {
  login: string;
  id: number;
  avatar_url?: string;
  name?: string;
  email?: string | null;
  [key: string]: unknown;
}

export async function fetchGithubAccessToken(code: string): Promise<string> {
  const res = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code
    })
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub token request failed: ${res.status} ${text}`);
  }

  const data = (await res.json()) as { access_token?: string; error?: string; error_description?: string };
  if (data.error) throw new Error(data.error_description || data.error);
  if (!data.access_token) throw new Error('No access_token in GitHub response');
  return data.access_token;
}

export async function fetchGithubUser(accessToken: string): Promise<GithubUser> {
  const res = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `token ${accessToken}`,
      Accept: 'application/vnd.github+json'
    }
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub user request failed: ${res.status} ${text}`);
  }

  return (await res.json()) as GithubUser;
}

export default fetchGithubAccessToken;
