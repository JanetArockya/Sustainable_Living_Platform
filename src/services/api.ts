// API service for backend communication
class ApiService {
  private baseURL: string;
  private token: string | null = null;

  constructor() {
    this.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  }

  setToken(token: string | null) {
    this.token = token;
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> || {}),
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      // Handle different response types
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || `HTTP error! status: ${response.status}`);
        }
        
        return data;
      } else {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.text();
      }
    } catch (error) {
      console.error('API request failed:', error);
      
      // Return mock data for demo mode when backend is not available
      if (error instanceof TypeError && error.message.includes('fetch')) {
        return this.getMockData(endpoint);
      }
      
      throw error;
    }
  }

  private getMockData(endpoint: string) {
    // Return appropriate mock data based on endpoint
    if (endpoint.includes('/user/goals')) {
      return {
        success: true,
        data: [
          {
            id: '1',
            title: 'Reduce Energy Usage',
            description: 'Cut household energy consumption by 25%',
            target_value: 25,
            current_value: 18,
            unit: '%',
            deadline: '2024-12-31',
            category: 'energy',
            completed: false
          },
          {
            id: '2',
            title: 'Carbon Neutral',
            description: 'Achieve net-zero carbon footprint',
            target_value: 0,
            current_value: 2.1,
            unit: 'tons CO2',
            deadline: '2024-06-30',
            category: 'carbon',
            completed: false
          }
        ]
      };
    }
    
    if (endpoint.includes('/user/badges')) {
      return {
        success: true,
        data: [
          {
            id: '1',
            name: 'Energy Saver',
            description: 'Reduced energy consumption by 20%',
            icon: 'zap',
            earnedDate: '2024-02-01',
            category: 'energy'
          },
          {
            id: '2',
            name: 'Carbon Crusher',
            description: 'Achieved carbon neutral for a month',
            icon: 'leaf',
            earnedDate: '2024-02-15',
            category: 'carbon'
          }
        ]
      };
    }
    
    if (endpoint.includes('/user/carbon-data')) {
      return {
        success: true,
        data: {
          monthly: [
            { month: 'Jan', value: 8.5 },
            { month: 'Feb', value: 7.8 },
            { month: 'Mar', value: 6.9 },
            { month: 'Apr', value: 6.2 },
            { month: 'May', value: 5.8 },
            { month: 'Jun', value: 5.5 }
          ],
          total: 6.2,
          categories: {
            energy: 2.1,
            transportation: 2.8,
            food: 1.1,
            waste: 0.2
          }
        }
      };
    }
    
    if (endpoint.includes('/user/metrics')) {
      return {
        success: true,
        data: [
          { metric: 'energy_usage', value: 1245, unit: 'kWh', date: '2024-07-29' },
          { metric: 'water_usage', value: 1245, unit: 'gallons', date: '2024-07-29' },
          { metric: 'carbon_footprint', value: 6.2, unit: 'tons', date: '2024-07-29' }
        ]
      };
    }

    if (endpoint.includes('/user/activities')) {
      return {
        success: true,
        data: [
          {
            id: '1',
            type: 'energy_saving',
            description: 'Switched to LED bulbs',
            impact: 'Reduced energy usage by 15%',
            date: '2024-07-29',
            points: 50
          },
          {
            id: '2',
            type: 'transportation',
            description: 'Biked to work',
            impact: 'Saved 5.2kg CO2',
            date: '2024-07-28',
            points: 30
          }
        ]
      };
    }
    
    // Default response
    return {
      success: true,
      data: [],
      message: 'Demo mode: No data available'
    };
  }

  // API methods
  async get(endpoint: string) {
    return this.request(endpoint, { method: 'GET' });
  }

  async post(endpoint: string, data: any) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put(endpoint: string, data: any) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete(endpoint: string) {
    return this.request(endpoint, { method: 'DELETE' });
  }

  // Specific API endpoints
  async getUserGoals() {
    return this.get('/users/goals');
  }

  async getUserBadges() {
    return this.get('/users/badges');
  }

  async getCarbonData() {
    return this.get('/users/carbon-data');
  }

  async getUserMetrics() {
    return this.get('/users/metrics');
  }

  async saveMetric(type: string, value: number, unit: string) {
    // For demo mode, simulate a successful save without hitting the backend
    console.log('📊 Demo mode: Saving metric locally', { type, value, unit });
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Return success response
    return {
      success: true,
      data: {
        id: Math.random().toString(36).substr(2, 9),
        metric_type: type,
        value,
        unit,
        date: new Date().toISOString(),
        user_id: 'demo-user'
      },
      message: 'Metric saved successfully'
    };
  }

  async getUserActivities(date?: string, limit?: number) {
    const params = new URLSearchParams();
    if (date) params.append('date', date);
    if (limit) params.append('limit', limit.toString());
    
    const query = params.toString() ? `?${params.toString()}` : '';
    return this.get(`/users/activities${query}`);
  }

  async getChallenges() {
    return this.get('/challenges');
  }

  async joinChallenge(challengeId: string) {
    return this.post('/challenges/join', { challengeId });
  }

  async getCommunityData() {
    return this.get('/community');
  }

  async getAnalytics() {
    return this.get('/analytics');
  }
}

export const apiService = new ApiService();
export default apiService;
