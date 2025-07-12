// Cloudflare Workers entry point
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { verify, sign } from 'hono/jwt';

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

// Auth middleware
async function authenticate(c: any, next: any) {
  try {
    const authHeader = c.req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ success: false, error: 'Authentication required' }, 401);
    }

    const token = authHeader.substring(7);
    const jwtSecret = c.env?.JWT_SECRET || 'fallback-secret';
    
    await verify(token, jwtSecret);
    await next();
  } catch (error) {
    return c.json({ success: false, error: 'Invalid token' }, 401);
  }
}

// AUTH ROUTES
app.post('/api/auth/login', async (c) => {
  try {
    const { email, password } = await c.req.json();

    if (!email || !password) {
      return c.json({
        success: false,
        error: 'Missing credentials',
        message: 'Email and password are required'
      }, 400);
    }

    const adminEmail = c.env?.ADMIN_EMAIL || 'admin@tunel.com';
    const adminPassword = c.env?.ADMIN_PASSWORD || 'admin123';
    const jwtSecret = c.env?.JWT_SECRET || 'fallback-secret';

    if (email !== adminEmail || password !== adminPassword) {
      return c.json({
        success: false,
        error: 'Invalid credentials',
        message: 'Email or password is incorrect'
      }, 401);
    }

    const payload = {
      id: '1',
      email: email,
      name: 'Admin',
      role: 'admin',
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
    };

    const token = await sign(payload, jwtSecret);

    return c.json({
      success: true,
      token,
      admin: {
        id: '1',
        email: email,
        name: 'Admin',
        role: 'admin'
      },
      expiresIn: '24h'
    });

  } catch (error) {
    console.error('Login error:', error);
    return c.json({
      success: false,
      error: 'Internal server error',
      message: 'Something went wrong during authentication'
    }, 500);
  }
});

app.get('/api/auth/verify', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({
        success: false,
        error: 'No token provided'
      }, 401);
    }

    const token = authHeader.substring(7);
    const jwtSecret = c.env?.JWT_SECRET || 'fallback-secret';

    const payload = await verify(token, jwtSecret);

    return c.json({
      success: true,
      admin: {
        id: payload.id,
        email: payload.email,
        name: payload.name || 'Admin',
        role: payload.role || 'admin'
      },
      message: 'Token is valid'
    });

  } catch (error) {
    return c.json({
      success: false,
      error: 'Invalid token',
      message: 'The provided token is invalid or expired'
    }, 401);
  }
});

// JOBS ROUTES
app.get('/api/jobs', authenticate, async (c) => {
  try {
    const mockJobs = [
      {
        id: '1',
        title: 'Senior React Developer',
        company: 'Spotify',
        location: 'Stockholm, Sweden',
        salary: '€70,000 - €95,000',
        status: 'active',
        applications: 23,
        technologies: ['React', 'TypeScript', 'Node.js'],
        createdAt: '2024-01-15T10:00:00Z'
      },
      {
        id: '2',
        title: 'DevOps Engineer',
        company: 'Adyen',
        location: 'Amsterdam, Netherlands',
        salary: '€65,000 - €85,000',
        status: 'active',
        applications: 15,
        technologies: ['AWS', 'Kubernetes', 'Docker'],
        createdAt: '2024-01-10T14:30:00Z'
      }
    ];

    return c.json({
      success: true,
      jobs: mockJobs,
      pagination: {
        page: 1,
        total: mockJobs.length,
        pages: 1
      }
    });
  } catch (error) {
    return c.json({
      success: false,
      error: 'Failed to fetch jobs'
    }, 500);
  }
});

app.post('/api/jobs', authenticate, async (c) => {
  try {
    const jobData = await c.req.json();
    
    const newJob = {
      id: Date.now().toString(),
      ...jobData,
      status: 'active',
      applications: 0,
      createdAt: new Date().toISOString()
    };

    return c.json({
      success: true,
      job: newJob,
      message: 'Job created successfully'
    }, 201);
  } catch (error) {
    return c.json({
      success: false,
      error: 'Failed to create job'
    }, 500);
  }
});

// COMPANIES ROUTES
app.get('/api/companies', authenticate, async (c) => {
  try {
    const mockCompanies = [
      {
        id: '1',
        name: 'Spotify',
        country: 'Sweden',
        city: 'Stockholm',
        activeJobs: 12,
        status: 'active',
        featured: true
      },
      {
        id: '2',
        name: 'Adyen',
        country: 'Netherlands',
        city: 'Amsterdam',
        activeJobs: 8,
        status: 'active',
        featured: true
      }
    ];

    return c.json({
      success: true,
      companies: mockCompanies,
      stats: {
        totalCompanies: mockCompanies.length,
        featuredCompanies: mockCompanies.filter(c => c.featured).length
      }
    });
  } catch (error) {
    return c.json({
      success: false,
      error: 'Failed to fetch companies'
    }, 500);
  }
});

// CONTENT ROUTES
app.get('/api/content/homepage', authenticate, async (c) => {
  try {
    const content = {
      hero: {
        title: 'Find Your Dream Job in Europe',
        subtitle: 'Connect with top European companies offering visa sponsorship'
      },
      stats: {
        jobs: { label: 'Active Jobs', value: 500 },
        companies: { label: 'Partner Companies', value: 50 },
        countries: { label: 'European Countries', value: 15 }
      }
    };

    return c.json({
      success: true,
      content,
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    return c.json({
      success: false,
      error: 'Failed to fetch content'
    }, 500);
  }
});

// ANALYTICS ROUTES
app.get('/api/analytics', authenticate, async (c) => {
  try {
    const analytics = {
      overview: {
        totalJobs: 156,
        totalCompanies: 42,
        totalApplications: 1247,
        activeUsers: 892
      },
      topTechnologies: [
        { technology: 'React', mentions: 89, percentage: 57.1 },
        { technology: 'TypeScript', mentions: 76, percentage: 48.7 },
        { technology: 'Node.js', mentions: 64, percentage: 41.0 }
      ]
    };

    return c.json({
      success: true,
      analytics,
      generatedAt: new Date().toISOString()
    });
  } catch (error) {
    return c.json({
      success: false,
      error: 'Failed to fetch analytics'
    }, 500);
  }
});

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