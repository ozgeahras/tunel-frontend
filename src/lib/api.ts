/**
 * API client for Tunel Authentication
 * Handles communication with Cloudflare Workers API
 */

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://tunel-auth-api.your-subdomain.workers.dev'
  : 'http://localhost:8787';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  type: 'individual' | 'company' | 'recruiter';
}

export interface RegisterRequest extends LoginRequest {
  name: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
    type: 'individual' | 'company' | 'recruiter';
    profile: Record<string, any>;
    created_at: string;
    updated_at: string;
  };
  token: string;
  message: string;
}

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
    
    // Load token from localStorage if available
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('tunel_token');
    }
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  private async request<T = any>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      
      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.getHeaders(),
          ...options.headers,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || `HTTP ${response.status}`,
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error('API request failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
  }

  setToken(token: string | null) {
    this.token = token;
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('tunel_token', token);
      } else {
        localStorage.removeItem('tunel_token');
      }
    }
  }

  // Authentication endpoints
  async register(data: RegisterRequest): Promise<ApiResponse<AuthResponse>> {
    const response = await this.request<AuthResponse>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (response.success && response.data?.token) {
      this.setToken(response.data.token);
    }

    return response;
  }

  async login(data: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    const response = await this.request<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (response.success && response.data?.token) {
      this.setToken(response.data.token);
    }

    return response;
  }

  async getCurrentUser(): Promise<ApiResponse<{ user: AuthResponse['user'] }>> {
    return this.request('/api/auth/me');
  }

  async updateProfile(data: {
    name?: string;
    profile?: Record<string, any>;
  }): Promise<ApiResponse<{ user: AuthResponse['user'] }>> {
    return this.request('/api/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async logout(): Promise<void> {
    this.setToken(null);
  }

  // Health check
  async healthCheck(): Promise<ApiResponse<{ status: string; timestamp: string }>> {
    return this.request('/health');
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export convenience functions
export const authAPI = {
  register: (data: RegisterRequest) => apiClient.register(data),
  login: (data: LoginRequest) => apiClient.login(data),
  getCurrentUser: () => apiClient.getCurrentUser(),
  updateProfile: (data: { name?: string; profile?: Record<string, any> }) => 
    apiClient.updateProfile(data),
  logout: () => apiClient.logout(),
  healthCheck: () => apiClient.healthCheck(),
};

export default apiClient;