import Fastify from 'fastify';
import cors from '@fastify/cors';
import routes from './routes/index.js';

 const fastify = Fastify({
  logger: false,
 // trustProxy: true, //for production
  requestIdHeader: 'x-request-id',
  requestIdLogLabel: 'reqId',
  disableRequestLogging: true,
  bodyLimit: 1048576, // 1MB
}); 


// Register plugins
fastify.register(cors, {
  origin: true, // Allow all origins for development
});

fastify.register(routes)


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

start();