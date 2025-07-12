import { Hono } from 'hono';
import { verify } from 'hono/jwt';

const companies = new Hono();

// Mock companies data
const mockCompanies = [
  {
    id: '1',
    name: 'Spotify',
    slug: 'spotify',
    logo: '/logos/spotify.png',
    website: 'https://spotify.com',
    country: 'Sweden',
    city: 'Stockholm',
    employees: '6000+',
    foundedYear: 2006,
    industry: 'Music Streaming',
    description: 'The world\'s most popular audio streaming subscription service.',
    culture: 'Innovative, collaborative, and music-focused environment.',
    benefits: ['Visa sponsorship', 'Flexible working', 'Health insurance', 'Stock options'],
    techStack: ['React', 'TypeScript', 'Node.js', 'Python', 'Kafka'],
    activeJobs: 12,
    totalApplications: 234,
    status: 'active',
    featured: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    name: 'Adyen',
    slug: 'adyen',
    logo: '/logos/adyen.png',
    website: 'https://adyen.com',
    country: 'Netherlands',
    city: 'Amsterdam',
    employees: '3000+',
    foundedYear: 2006,
    industry: 'Financial Technology',
    description: 'The payments platform of choice for leading companies.',
    culture: 'Fast-paced, international environment focused on innovation.',
    benefits: ['Full visa sponsorship', 'Competitive salary', 'International opportunities'],
    techStack: ['Java', 'Python', 'AWS', 'Kubernetes', 'Docker'],
    activeJobs: 8,
    totalApplications: 156,
    status: 'active',
    featured: true,
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-10T14:30:00Z'
  }
];

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

// Get all companies
companies.get('/', authenticate, async (c) => {
  try {
    const url = new URL(c.req.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const search = url.searchParams.get('search') || '';
    const country = url.searchParams.get('country');
    const featured = url.searchParams.get('featured');

    let filteredCompanies = [...mockCompanies];

    // Apply filters
    if (search) {
      filteredCompanies = filteredCompanies.filter(company => 
        company.name.toLowerCase().includes(search.toLowerCase()) ||
        company.city.toLowerCase().includes(search.toLowerCase()) ||
        company.industry.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (country) {
      filteredCompanies = filteredCompanies.filter(company => company.country === country);
    }

    if (featured !== null && featured !== undefined) {
      filteredCompanies = filteredCompanies.filter(company => 
        company.featured === (featured === 'true')
      );
    }

    // Sort by name
    filteredCompanies.sort((a, b) => a.name.localeCompare(b.name));

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedCompanies = filteredCompanies.slice(startIndex, endIndex);

    return c.json({
      success: true,
      companies: paginatedCompanies,
      pagination: {
        page,
        limit,
        total: filteredCompanies.length,
        pages: Math.ceil(filteredCompanies.length / limit),
        hasNext: endIndex < filteredCompanies.length,
        hasPrev: page > 1
      },
      stats: {
        totalCompanies: mockCompanies.length,
        featuredCompanies: mockCompanies.filter(c => c.featured).length,
        activeCompanies: mockCompanies.filter(c => c.status === 'active').length
      }
    });
  } catch (error) {
    return c.json({ success: false, error: 'Failed to fetch companies' }, 500);
  }
});

// Get single company
companies.get('/:id', authenticate, async (c) => {
  try {
    const id = c.req.param('id');
    const company = mockCompanies.find(comp => comp.id === id);

    if (!company) {
      return c.json({ success: false, error: 'Company not found' }, 404);
    }

    return c.json({ success: true, company });
  } catch (error) {
    return c.json({ success: false, error: 'Failed to fetch company' }, 500);
  }
});

// Create company
companies.post('/', authenticate, async (c) => {
  try {
    const companyData = await c.req.json();
    
    const requiredFields = ['name', 'country', 'city', 'industry', 'description'];
    const missingFields = requiredFields.filter(field => !companyData[field]);
    
    if (missingFields.length > 0) {
      return c.json({
        success: false,
        error: 'Missing required fields',
        missingFields
      }, 400);
    }

    const newCompany = {
      id: (mockCompanies.length + 1).toString(),
      slug: companyData.name.toLowerCase().replace(/\s+/g, '-'),
      ...companyData,
      activeJobs: 0,
      totalApplications: 0,
      status: companyData.status || 'active',
      featured: companyData.featured || false,
      techStack: companyData.techStack || [],
      benefits: companyData.benefits || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    mockCompanies.push(newCompany);

    return c.json({
      success: true,
      company: newCompany,
      message: 'Company created successfully'
    }, 201);
  } catch (error) {
    return c.json({ success: false, error: 'Failed to create company' }, 500);
  }
});

// Update company
companies.put('/:id', authenticate, async (c) => {
  try {
    const id = c.req.param('id');
    const updates = await c.req.json();
    
    const companyIndex = mockCompanies.findIndex(comp => comp.id === id);
    
    if (companyIndex === -1) {
      return c.json({ success: false, error: 'Company not found' }, 404);
    }

    if (updates.name && updates.name !== mockCompanies[companyIndex].name) {
      updates.slug = updates.name.toLowerCase().replace(/\s+/g, '-');
    }

    const updatedCompany = {
      ...mockCompanies[companyIndex],
      ...updates,
      id,
      updatedAt: new Date().toISOString()
    };

    mockCompanies[companyIndex] = updatedCompany;

    return c.json({
      success: true,
      company: updatedCompany,
      message: 'Company updated successfully'
    });
  } catch (error) {
    return c.json({ success: false, error: 'Failed to update company' }, 500);
  }
});

// Delete company
companies.delete('/:id', authenticate, async (c) => {
  try {
    const id = c.req.param('id');
    const companyIndex = mockCompanies.findIndex(comp => comp.id === id);
    
    if (companyIndex === -1) {
      return c.json({ success: false, error: 'Company not found' }, 404);
    }

    const deletedCompany = mockCompanies[companyIndex];
    mockCompanies.splice(companyIndex, 1);

    return c.json({
      success: true,
      message: 'Company deleted successfully',
      deletedCompany: {
        id: deletedCompany.id,
        name: deletedCompany.name
      }
    });
  } catch (error) {
    return c.json({ success: false, error: 'Failed to delete company' }, 500);
  }
});

export default companies;