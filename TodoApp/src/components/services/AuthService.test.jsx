import AuthService from './AuthService';
import api from '../utils/api';

// Mock the Axios library to simulate API calls
jest.mock('../utils/api');

describe('AuthService', () => {
  beforeEach(() => {
    // Clear any mocked API calls before each test
    api.post.mockClear();
    localStorage.clear();
  });

  it('should register a user', async () => {
    const userData = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    };

    // Mock a successful registration response
    api.post.mockResolvedValue({ data: 'Registration successful' });

    const response = await AuthService.register(
      userData.first_name,
      userData.last_name,
      userData.email,
      userData.password
    );

    expect(api.post).toHaveBeenCalledWith('/api/auth/register', userData);
    expect(response).toBe('Registration successful');
  });

  it('should handle registration errors', async () => {
    const userData = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    };

    // Mock a failed registration response
    api.post.mockRejectedValue({ response: { data: 'Registration failed' } });

    try {
      await AuthService.register(
        userData.first_name,
        userData.last_name,
        userData.email,
        userData.password
      );
    } catch (error) {
      expect(api.post).toHaveBeenCalledWith('/api/auth/register', userData);
      expect(error).toBe('Registration failed');
    }
  });

});
