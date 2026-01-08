

export type SignOptions = import("jsonwebtoken").SignOptions;

export class JwtService {
    async generateToken(payload: object, options?: SignOptions): Promise<string> {
        const jwt = await import("jsonwebtoken");
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }

        return jwt.sign(payload, jwtSecret, options);
    }

    async generateAccessToken(payload: object, options?: SignOptions): Promise<string> {
        type ExpiresIn = SignOptions['expiresIn'];
        const env = process.env.ACCCESS_TOKEN_EXPIRES_IN;
        const defaultOptions: SignOptions | undefined = env
            ? ({ expiresIn: env as unknown as ExpiresIn } as SignOptions)
            : undefined;
        return this.generateToken(payload, options ?? defaultOptions);
    }

    async generateRefreshToken(payload: object, options?: SignOptions): Promise<string> {
        type ExpiresIn = SignOptions['expiresIn'];
        const env = process.env.REFRESH_TOKEN_EXPIRES_IN;
        const defaultOptions: SignOptions | undefined = env
            ? ({ expiresIn: env as unknown as ExpiresIn } as SignOptions)
            : undefined;
        return this.generateToken(payload, options ?? defaultOptions);
    }

    async verifyToken(token: string): Promise<any> {
        const jwt = await import("jsonwebtoken");
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }

        return jwt.verify(token, jwtSecret);
    }
}