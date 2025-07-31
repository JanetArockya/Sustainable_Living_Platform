// API Configuration for Cloud Backend
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: any[];
}

class ApiClient {
  private baseUrl: string;
  private token: string | null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.token = localStorage.getItem('token');
  }

  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}/api${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }
      
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Authentication endpoints
  async register(userData: { name: string; email: string; password: string }) {
    const response = await this.request<{ token: string; user: any }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    
    if (response.success && response.data?.token) {
      this.token = response.data.token;
      localStorage.setItem('token', this.token);
    }
    
    return response;
  }

  async login(credentials: { email: string; password: string }) {
    const response = await this.request<{ token: string; user: any }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (response.success && response.data?.token) {
      this.token = response.data.token;
      localStorage.setItem('token', this.token);
    }
    
    return response;
  }

  async logout() {
    this.token = null;
    localStorage.removeItem('token');
  }

  async getCurrentUser() {
    return this.request('/auth/me');
  }

  // User endpoints
  async updateUser(userData: any) {
    return this.request('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  // Challenge endpoints
  async getChallenges() {
    return this.request('/challenges');
  }

  async joinChallenge(challengeId: string) {
    return this.request(`/challenges/${challengeId}/join`, {
      method: 'POST',
    });
  }

  // Carbon calculation endpoints
  async calculateCarbon(data: any) {
    return this.request('/carbon/calculate', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Community endpoints
  async getCommunityFeed() {
    return this.request('/community/feed');
  }

  async getLeaderboard() {
    return this.request('/community/leaderboard');
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
export default apiClient;
