import { Hono } from 'hono';
import { verify } from 'hono/jwt';

const jobs = new Hono();

// Mock data - in production, use Cloudflare D1 database
const mockJobs = [
  {
    id: '1',
    title: 'Senior React Developer',
    company: 'Spotify',
    companyId: '1',
    location: 'Stockholm',
    country: 'Sweden',
    type: 'full-time',
    salaryMin: 70000,
    salaryMax: 95000,
    currency: 'EUR',
    status: 'active',
    applications: 23,
    views: 156,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    technologies: ['React', 'TypeScript', 'Node.js', 'GraphQL'],
    description: 'Join our team building next-generation music streaming experiences.',
    requirements: ['5+ years React experience', 'TypeScript proficiency'],
    benefits: ['Visa sponsorship', 'Remote work', 'Health insurance']
  },
  {
    id: '2',
    title: 'DevOps Engineer',
    company: 'Adyen',
    companyId: '2',
    location: 'Amsterdam',
    country: 'Netherlands',
    type: 'full-time',
    salaryMin: 65000,
    salaryMax: 85000,
    currency: 'EUR',
    status: 'active',
    applications: 15,
    views: 89,
    createdAt: '2024-01-10T14:30:00Z',
    updatedAt: '2024-01-10T14:30:00Z',
    technologies: ['AWS', 'Kubernetes', 'Docker', 'Terraform'],
    description: 'Scale payment infrastructure for global merchants.',
    requirements: ['3+ years DevOps experience', 'AWS expertise'],
    benefits: ['Visa sponsorship', 'Learning budget', 'Flexible hours']
  }
];

// Auth middleware
async function authenticate(c: any, next: any) {
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
    
    await verify(token, jwtSecret);
    await next();
  } catch (error) {
    return c.json({
      success: false,
      error: 'Invalid token'
    }, 401);
  }
}

// Get all jobs with filtering
jobs.get('/', authenticate, async (c) => {
  try {
    const url = new URL(c.req.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const search = url.searchParams.get('search') || '';
    const status = url.searchParams.get('status');
    const country = url.searchParams.get('country');

    let filteredJobs = [...mockJobs];

    // Apply filters
    if (search) {
      filteredJobs = filteredJobs.filter(job => 
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase()) ||
        job.technologies.some(tech => tech.toLowerCase().includes(search.toLowerCase()))
      );
    }

    if (status) {
      filteredJobs = filteredJobs.filter(job => job.status === status);
    }

    if (country) {
      filteredJobs = filteredJobs.filter(job => job.country === country);
    }

    // Sort by created date
    filteredJobs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedJobs = filteredJobs.slice(startIndex, endIndex);

    return c.json({
      success: true,
      jobs: paginatedJobs,
      pagination: {
        page,
        limit,
        total: filteredJobs.length,
        pages: Math.ceil(filteredJobs.length / limit),
        hasNext: endIndex < filteredJobs.length,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    return c.json({
      success: false,
      error: 'Failed to fetch jobs'
    }, 500);
  }
});

// Get single job
jobs.get('/:id', authenticate, async (c) => {
  try {
    const id = c.req.param('id');
    const job = mockJobs.find(j => j.id === id);

    if (!job) {
      return c.json({
        success: false,
        error: 'Job not found'
      }, 404);
    }

    return c.json({
      success: true,
      job
    });
  } catch (error) {
    return c.json({
      success: false,
      error: 'Failed to fetch job'
    }, 500);
  }
});

// Create job
jobs.post('/', authenticate, async (c) => {
  try {
    const jobData = await c.req.json();
    
    const requiredFields = ['title', 'company', 'location', 'country', 'type'];
    const missingFields = requiredFields.filter(field => !jobData[field]);
    
    if (missingFields.length > 0) {
      return c.json({
        success: false,
        error: 'Missing required fields',
        missingFields
      }, 400);
    }

    const newJob = {
      id: (mockJobs.length + 1).toString(),
      ...jobData,
      status: jobData.status || 'active',
      applications: 0,
      views: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      technologies: jobData.technologies || [],
      requirements: jobData.requirements || [],
      benefits: jobData.benefits || []
    };

    // In production, save to D1 database
    mockJobs.push(newJob);

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

// Update job
jobs.put('/:id', authenticate, async (c) => {
  try {
    const id = c.req.param('id');
    const updates = await c.req.json();
    
    const jobIndex = mockJobs.findIndex(j => j.id === id);
    
    if (jobIndex === -1) {
      return c.json({
        success: false,
        error: 'Job not found'
      }, 404);
    }

    const updatedJob = {
      ...mockJobs[jobIndex],
      ...updates,
      id,
      updatedAt: new Date().toISOString()
    };

    mockJobs[jobIndex] = updatedJob;

    return c.json({
      success: true,
      job: updatedJob,
      message: 'Job updated successfully'
    });
  } catch (error) {
    return c.json({
      success: false,
      error: 'Failed to update job'
    }, 500);
  }
});

// Delete job
jobs.delete('/:id', authenticate, async (c) => {
  try {
    const id = c.req.param('id');
    const jobIndex = mockJobs.findIndex(j => j.id === id);
    
    if (jobIndex === -1) {
      return c.json({
        success: false,
        error: 'Job not found'
      }, 404);
    }

    const deletedJob = mockJobs[jobIndex];
    mockJobs.splice(jobIndex, 1);

    return c.json({
      success: true,
      message: 'Job deleted successfully',
      deletedJob: {
        id: deletedJob.id,
        title: deletedJob.title
      }
    });
  } catch (error) {
    return c.json({
      success: false,
      error: 'Failed to delete job'
    }, 500);
  }
});

export default jobs;