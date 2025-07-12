import { Hono } from 'hono';
import { verify } from 'hono/jwt';

const analytics = new Hono();

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

// Get comprehensive analytics
analytics.get('/', authenticate, async (c) => {
  try {
    const analyticsData = {
      overview: {
        totalJobs: 156,
        totalCompanies: 42,
        totalApplications: 1247,
        activeUsers: 892,
        newUsersThisMonth: 156,
        jobViewsThisMonth: 8924,
        applicationSuccessRate: 23.5,
        averageSalary: 67500
      },
      
      jobStatistics: {
        byCountry: [
          { country: 'Germany', count: 45, percentage: 28.8 },
          { country: 'Netherlands', count: 38, percentage: 24.4 },
          { country: 'Sweden', count: 25, percentage: 16.0 },
          { country: 'Switzerland', count: 20, percentage: 12.8 }
        ],
        
        byType: [
          { type: 'Full-time', count: 120, percentage: 77.0 },
          { type: 'Contract', count: 25, percentage: 16.0 },
          { type: 'Freelance', count: 11, percentage: 7.0 }
        ]
      },
      
      topTechnologies: [
        { technology: 'React', mentions: 89, percentage: 57.1 },
        { technology: 'TypeScript', mentions: 76, percentage: 48.7 },
        { technology: 'Node.js', mentions: 64, percentage: 41.0 },
        { technology: 'Python', mentions: 58, percentage: 37.2 },
        { technology: 'AWS', mentions: 52, percentage: 33.3 }
      ],
      
      applicationTrends: {
        monthly: [
          { month: 'Sep 2023', applications: 89, jobs: 95 },
          { month: 'Oct 2023', applications: 112, jobs: 108 },
          { month: 'Nov 2023', applications: 145, jobs: 125 },
          { month: 'Dec 2023', applications: 134, jobs: 132 },
          { month: 'Jan 2024', applications: 167, jobs: 156 }
        ]
      },
      
      topCompanies: [
        { 
          company: 'Spotify', 
          jobs: 12, 
          applications: 234, 
          successRate: 28.5 
        },
        { 
          company: 'Adyen', 
          jobs: 8, 
          applications: 156, 
          successRate: 31.2 
        }
      ],
      
      userEngagement: {
        dailyActiveUsers: 245,
        weeklyActiveUsers: 892,
        monthlyActiveUsers: 2340,
        averageSessionDuration: '8m 34s',
        bounceRate: 23.5,
        pagesPerSession: 4.2
      },
      
      performanceMetrics: {
        apiResponseTime: 245, // ms
        pageLoadTime: 1.2, // seconds
        uptime: 99.97, // percentage
        errorRate: 0.03 // percentage
      }
    };

    return c.json({
      success: true,
      analytics: analyticsData,
      generatedAt: new Date().toISOString(),
      period: '30 days'
    });

  } catch (error) {
    return c.json({
      success: false,
      error: 'Failed to fetch analytics data'
    }, 500);
  }
});

// Get dashboard data
analytics.get('/dashboard', authenticate, async (c) => {
  try {
    const dashboard = {
      currentStats: {
        activeUsers: Math.floor(Math.random() * 50) + 200,
        jobsPostedToday: Math.floor(Math.random() * 10) + 5,
        applicationsToday: Math.floor(Math.random() * 50) + 25,
        newCompaniesThisWeek: Math.floor(Math.random() * 5) + 2
      },
      
      recentActivity: [
        {
          id: '1',
          type: 'job_posted',
          message: 'New job posted: Senior React Developer at Spotify',
          timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString()
        },
        {
          id: '2',
          type: 'application',
          message: 'New application for DevOps Engineer position',
          timestamp: new Date(Date.now() - 1000 * 60 * 32).toISOString()
        }
      ],
      
      alerts: [
        {
          type: 'info',
          message: 'System performing optimally',
          timestamp: new Date().toISOString()
        }
      ]
    };

    return c.json({
      success: true,
      dashboard,
      refreshedAt: new Date().toISOString()
    });

  } catch (error) {
    return c.json({
      success: false,
      error: 'Failed to fetch dashboard data'
    }, 500);
  }
});

// Get specific metrics
analytics.get('/metrics/:metric', authenticate, async (c) => {
  try {
    const metric = c.req.param('metric');
    
    const metricsData: { [key: string]: any } = {
      applications: {
        data: [
          { date: '2024-01-15', value: 23 },
          { date: '2024-01-16', value: 31 },
          { date: '2024-01-17', value: 28 },
          { date: '2024-01-18', value: 35 },
          { date: '2024-01-19', value: 42 }
        ],
        total: 159,
        change: '+12.5%'
      },
      
      jobs: {
        data: [
          { date: '2024-01-15', value: 5 },
          { date: '2024-01-16', value: 3 },
          { date: '2024-01-17', value: 7 },
          { date: '2024-01-18', value: 4 },
          { date: '2024-01-19', value: 6 }
        ],
        total: 25,
        change: '+8.2%'
      }
    };

    const data = metricsData[metric];
    
    if (!data) {
      return c.json({
        success: false,
        error: 'Metric not found'
      }, 404);
    }

    return c.json({
      success: true,
      metric,
      data
    });

  } catch (error) {
    return c.json({
      success: false,
      error: 'Failed to fetch metric data'
    }, 500);
  }
});

export default analytics;