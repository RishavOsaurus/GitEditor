import Fastify from 'fastify';
import cors from '@fastify/cors';
import routes from './routes/index.js';
import cookie from '@fastify/cookie';
import { loadAllowedOrigins } from './config/allowedOrigins.js';

 const fastify = Fastify({
  logger: false,
 // trustProxy: true, //for production
  requestIdHeader: 'x-request-id',
  requestIdLogLabel: 'reqId',
  disableRequestLogging: true,
  bodyLimit: 1048576, // 1MB
}); 

const required = ['GITHUB_CLIENT_ID','GITHUB_CLIENT_SECRET'];
const missing = required.filter(k => !process.env[k]);
if (missing.length) {
  console.error('Missing required env vars:', missing.join(', '));
  process.exit(1);
}
// Register plugins
const allowedOrigins = loadAllowedOrigins();

if (allowedOrigins.length === 0) {
  console.warn("Warning: No ALLOWED_ORIGINS set, CORS is disabled");
}

fastify.register(cors, {
  // origin can be a function to perform dynamic checks
  origin: (origin, cb) => {
    // allow requests with no origin (e.g. curl, server-to-server)
    if (!origin) return cb(null, true);
    const allowed = allowedOrigins.includes(origin);
    cb(null, allowed);
  }
});

// register cookie plugin so we can set HttpOnly cookies
fastify.register(cookie, {
  secret: process.env.COOKIE_SECRET || 'dev-secret',
});

fastify.register(routes)

const gracefulShutdown = async (signal: string) => {
  console.log(`Received ${signal}, closing server...`);
  try {
    await fastify.close();
    console.log('Server closed gracefully.');
    process.exit(0);
  } catch (err) {
    console.error('Error during server shutdown:', err);
    process.exit(1);
  }
}

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));




// Start server
const start = async () => {
  try {
    const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
    await fastify.listen({ port, host: '0.0.0.0' });
    console.log(`Server listening on http://localhost:${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

process.on('uncaughtException', (error) => {
  console.log('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

start();