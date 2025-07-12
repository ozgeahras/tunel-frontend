// Cloudflare Workers entry point
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { jwt } from 'hono/jwt';
import { bearerAuth } from 'hono/bearer-auth';

// Import route handlers
import authRoutes from './routes/auth';
import jobsRoutes from './routes/jobs';
import companiesRoutes from './routes/companies';
import contentRoutes from './routes/content';
import analyticsRoutes from './routes/analytics';

// Create Hono app (like Express but for Workers)
const app = new Hono();

// CORS middleware
app.use('*', cors({
  origin: ['https://tunel.com', 'https://tunel-three.vercel.app', 'http://localhost:3000'],
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
}));

// Health check
app.get('/', (c) => {
  return c.json({
    message: '🚀 Tunel Admin API - Cloudflare Workers',
    version: '1.0.0',
    status: 'active',
    timestamp: new Date().toISOString(),
    endpoints: {
      auth: '/api/auth',
      jobs: '/api/jobs',
      companies: '/api/companies',
      content: '/api/content',
      analytics: '/api/analytics'
    }
  });
});

app.get('/health', (c) => {
  return c.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    worker: 'tunel-admin-api',
    region: c.env?.CF_RAY ? 'Cloudflare Edge' : 'Local'
  });
});

// Mount routes
app.route('/api/auth', authRoutes);
app.route('/api/jobs', jobsRoutes);
app.route('/api/companies', companiesRoutes);
app.route('/api/content', contentRoutes);
app.route('/api/analytics', analyticsRoutes);

// 404 handler
app.notFound((c) => {
  return c.json({
    error: 'Endpoint not found',
    path: c.req.path,
    method: c.req.method,
    timestamp: new Date().toISOString()
  }, 404);
});

// Error handler
app.onError((err, c) => {
  console.error('Worker Error:', err);
  return c.json({
    error: 'Internal server error',
    message: err.message,
    timestamp: new Date().toISOString()
  }, 500);
});

export default app;