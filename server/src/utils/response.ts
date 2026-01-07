import type {FastifyReply} from 'fastify';

export function sendSuccessResponse(reply: FastifyReply, data: any, statusCode = 200): void {
    reply.code(statusCode).send({
        success: true,
        data
    });
}

export function sendErrorResponse(reply: FastifyReply, message: string, statusCode = 500): void {
    reply.code(statusCode).send({
        success: false,
        error: {
            message
        }
    });
}