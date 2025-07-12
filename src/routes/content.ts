import { Hono } from 'hono';
import { verify } from 'hono/jwt';

const content = new Hono();

// Mock homepage content - in production, store in Cloudflare D1
let homepageContent = {
  hero: {
    title: 'Find Your Dream Job in Europe',
    subtitle: 'Connect with top European companies offering visa sponsorship for Turkish developers',
    searchPlaceholder: 'Search for jobs, companies, or skills...',
    backgroundImage: '/images/hero-bg.jpg'
  },
  stats: {
    jobs: { label: 'Active Jobs', value: 500 },
    companies: { label: 'Partner Companies', value: 50 },
    countries: { label: 'European Countries', value: 15 }
  },
  features: {
    visaOnly: {
      title: 'Visa Sponsorship Guaranteed',
      description: 'Every job posting guarantees visa sponsorship for Turkish citizens'
    },
    smartFiltering: {
      title: 'AI-Powered Job Matching',
      description: 'Find jobs that match your skills with our intelligent recommendation system'
    },
    turkishProfessionals: {
      title: 'Turkish Developer Community',
      description: 'Connect with other Turkish developers who relocated to Europe successfully'
    }
  },
  successStories: [
    {
      id: '1',
      name: 'Mehmet Akın',
      role: 'Frontend Developer',
      company: 'Spotify',
      location: 'Berlin, Germany',
      salary: '€65,000/year',
      story: 'Found my dream job through Tunel. Visa process was seamless.',
      image: '/images/testimonial-1.jpg'
    }
  ],
  companiesShowcase: [
    { name: 'Spotify', color: 'blue-600', logo: '/logos/spotify.png' },
    { name: 'Adyen', color: 'green-600', logo: '/logos/adyen.png' },
    { name: 'Klarna', color: 'purple-600', logo: '/logos/klarna.png' }
  ]
};

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

// Get homepage content
content.get('/homepage', authenticate, async (c) => {
  try {
    return c.json({
      success: true,
      content: homepageContent,
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    return c.json({
      success: false,
      error: 'Failed to fetch homepage content'
    }, 500);
  }
});

// Update homepage content
content.put('/homepage', authenticate, async (c) => {
  try {
    const updates = await c.req.json();
    
    if (!updates.content) {
      return c.json({
        success: false,
        error: 'Content is required'
      }, 400);
    }

    // Merge with existing content
    homepageContent = {
      ...homepageContent,
      ...updates.content
    };

    return c.json({
      success: true,
      message: 'Homepage content updated successfully',
      content: homepageContent
    });
  } catch (error) {
    return c.json({
      success: false,
      error: 'Failed to update homepage content'
    }, 500);
  }
});

// File upload placeholder - Cloudflare Workers has limitations
// For production, use Cloudflare R2 or Images
content.post('/upload', authenticate, async (c) => {
  try {
    // In Cloudflare Workers, file uploads need special handling
    // This is a placeholder - implement with R2 in production
    
    return c.json({
      success: true,
      message: 'File upload endpoint - integrate with Cloudflare R2 for production',
      image: {
        url: '/uploads/placeholder.jpg',
        filename: 'placeholder.jpg',
        size: 1024000
      }
    });
  } catch (error) {
    return c.json({
      success: false,
      error: 'Failed to upload file'
    }, 500);
  }
});

// Get uploaded images
content.get('/images', authenticate, async (c) => {
  try {
    // Mock images list - in production, query R2 bucket
    const images = [
      {
        id: '1',
        filename: 'hero-bg.jpg',
        url: '/uploads/hero-bg.jpg',
        originalName: 'hero-background.jpg',
        size: 1024000,
        mimetype: 'image/jpeg',
        uploadedAt: '2024-01-15T10:00:00Z'
      },
      {
        id: '2',
        filename: 'company-logo.png',
        url: '/uploads/company-logo.png',
        originalName: 'spotify-logo.png',
        size: 512000,
        mimetype: 'image/png',
        uploadedAt: '2024-01-14T14:30:00Z'
      }
    ];

    return c.json({
      success: true,
      images,
      total: images.length
    });
  } catch (error) {
    return c.json({
      success: false,
      error: 'Failed to fetch images'
    }, 500);
  }
});

// Delete image
content.delete('/images/:filename', authenticate, async (c) => {
  try {
    const filename = c.req.param('filename');
    
    // In production, delete from R2 bucket
    return c.json({
      success: true,
      message: `Image ${filename} deleted successfully`
    });
  } catch (error) {
    return c.json({
      success: false,
      error: 'Failed to delete image'
    }, 500);
  }
});

export default content;