/**
 * Cloudflare Workers API for Tunel Authentication
 * Simple authentication API without external dependencies
 */

export interface Env {
  DB?: D1Database;
  JWT_SECRET: string;
}

interface User {
  id: string;
  email: string;
  name: string;
  type: 'individual' | 'company' | 'recruiter';
  password_hash: string;
  profile: string; // JSON string
  created_at: string;
  updated_at: string;
}

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Utility functions
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + 'tunel-salt');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const passwordHash = await hashPassword(password);
  return passwordHash === hash;
}

function generateToken(userId: string, secret: string): string {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({
    sub: userId,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // 24 hours
  }));
  
  return `${header}.${payload}.signature`; // Simplified JWT for demo
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password: string): { valid: boolean; message?: string } {
  if (password.length < 8) {
    return { valid: false, message: 'Password must be at least 8 characters' };
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: 'Password must contain an uppercase letter' };
  }
  if (!/[a-z]/.test(password)) {
    return { valid: false, message: 'Password must contain a lowercase letter' };
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, message: 'Password must contain a number' };
  }
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    return { valid: false, message: 'Password must contain a special character' };
  }
  return { valid: true };
}

// Mock database for now (since D1 needs setup)
const mockDB = {
  users: new Map<string, User>(),
  
  async findUserByEmail(email: string, type: string): Promise<User | null> {
    for (const user of this.users.values()) {
      if (user.email === email && user.type === type) {
        return user;
      }
    }
    return null;
  },
  
  async createUser(user: User): Promise<void> {
    this.users.set(user.id, user);
  },
  
  async findUserById(id: string): Promise<User | null> {
    return this.users.get(id) || null;
  }
};

async function handleRegister(request: Request, env: Env): Promise<Response> {
  try {
    const body = await request.json() as {
      email: string;
      password: string;
      name: string;
      type: 'individual' | 'company' | 'recruiter';
    };

    const { email, password, name, type = 'individual' } = body;

    // Validation
    if (!email || !password || !name) {
      return new Response(JSON.stringify({ error: 'Email, password, and name are required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    if (!validateEmail(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email format' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      return new Response(JSON.stringify({ error: passwordValidation.message }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Check if user exists
    const existingUser = await mockDB.findUserByEmail(email, type);
    if (existingUser) {
      return new Response(JSON.stringify({ error: 'User already exists with this email' }), {
        status: 409,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Create user
    const userId = crypto.randomUUID();
    const passwordHash = await hashPassword(password);
    const now = new Date().toISOString();
    
    const defaultProfile = type === 'individual' 
      ? {
          firstName: name.split(' ')[0] || '',
          lastName: name.split(' ')[1] || '',
          location: '',
          bio: '',
          skills: [],
          experience: []
        }
      : type === 'company'
      ? {
          description: '',
          website: '',
          industry: '',
          size: '',
          location: '',
          techStack: [],
          benefits: []
        }
      : { // recruiter
          firstName: name.split(' ')[0] || '',
          lastName: name.split(' ')[1] || '',
          company: '',
          location: '',
          bio: '',
          specialties: [],
          languages: []
        };

    const newUser: User = {
      id: userId,
      email,
      name,
      type,
      password_hash: passwordHash,
      profile: JSON.stringify(defaultProfile),
      created_at: now,
      updated_at: now
    };

    await mockDB.createUser(newUser);

    // Generate token
    const token = generateToken(userId, env.JWT_SECRET);

    // Return user data (without password)
    const responseData = {
      message: 'User registered successfully',
      user: {
        id: userId,
        email,
        name,
        type,
        profile: defaultProfile,
        created_at: now,
        updated_at: now
      },
      token
    };

    return new Response(JSON.stringify(responseData), {
      status: 201,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Registration error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

async function handleLogin(request: Request, env: Env): Promise<Response> {
  try {
    const body = await request.json() as {
      email: string;
      password: string;
      type: 'individual' | 'company' | 'recruiter';
    };

    const { email, password, type = 'individual' } = body;

    // Validation
    if (!email || !password) {
      return new Response(JSON.stringify({ error: 'Email and password are required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Find user
    const user = await mockDB.findUserByEmail(email, type);
    if (!user) {
      return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, user.password_hash);
    if (!isValidPassword) {
      return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Generate token
    const token = generateToken(user.id, env.JWT_SECRET);

    // Return user data (without password)
    const responseData = {
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        type: user.type,
        profile: JSON.parse(user.profile),
        created_at: user.created_at,
        updated_at: user.updated_at
      },
      token
    };

    return new Response(JSON.stringify(responseData), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Login error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

async function handleHealth(): Promise<Response> {
  return new Response(JSON.stringify({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'tunel-auth-api'
  }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);
    const path = url.pathname;

    // Route requests
    if (path === '/health') {
      return handleHealth();
    }
    
    if (path === '/api/auth/register' && request.method === 'POST') {
      return handleRegister(request, env);
    }
    
    if (path === '/api/auth/login' && request.method === 'POST') {
      return handleLogin(request, env);
    }

    // 404 for unknown routes
    return new Response(JSON.stringify({ error: 'Not found' }), {
      status: 404,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
};