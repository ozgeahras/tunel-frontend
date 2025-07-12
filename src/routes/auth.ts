import { Hono } from 'hono';
import { sign, verify } from 'hono/jwt';

const auth = new Hono();

// Simple password hash function for Cloudflare Workers
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Admin login
auth.post('/login', async (c) => {
  try {
    const { email, password } = await c.req.json();

    // Input validation
    if (!email || !password) {
      return c.json({
        success: false,
        error: 'Missing credentials',
        message: 'Email and password are required'
      }, 400);
    }

    // Get environment variables
    const adminEmail = c.env?.ADMIN_EMAIL || 'admin@tunel.com';
    const adminPassword = c.env?.ADMIN_PASSWORD || 'admin123';
    const jwtSecret = c.env?.JWT_SECRET || 'fallback-secret';

    // Check credentials
    if (email !== adminEmail || password !== adminPassword) {
      return c.json({
        success: false,
        error: 'Invalid credentials',
        message: 'Email or password is incorrect'
      }, 401);
    }

    // Generate JWT token
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

// Verify token
auth.get('/verify', async (c) => {
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

// Logout endpoint
auth.post('/logout', async (c) => {
  return c.json({
    success: true,
    message: 'Logged out successfully'
  });
});

// Get admin profile
auth.get('/profile', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({
        success: false,
        error: 'Authentication required'
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
        role: payload.role || 'admin',
        loginCount: 1,
        lastLogin: new Date().toISOString(),
        permissions: ['read', 'write', 'delete', 'manage']
      }
    });

  } catch (error) {
    return c.json({
      success: false,
      error: 'Invalid token'
    }, 401);
  }
});

export default auth;