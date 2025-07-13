'use client';

import { useState, useEffect } from 'react';
import { useAuth, UserType } from '@/contexts/AuthContext';
import PasswordStrengthIndicator, { getPasswordStrength } from './PasswordStrengthIndicator';
// import { useLanguage } from '@/contexts/LanguageContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultType?: UserType;
  initialMode?: 'login' | 'register';
}

export default function LoginModal({ isOpen, onClose, defaultType = 'individual', initialMode = 'login' }: LoginModalProps) {
  const { login, register, loading } = useAuth();
  // const { t } = useLanguage();
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [userType, setUserType] = useState<UserType>(defaultType);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Reset form when modal opens/closes or initialMode changes
  useEffect(() => {
    if (isOpen) {
      setIsLogin(initialMode === 'login');
      setFormData({
        email: '',
        password: '',
        name: '',
        confirmPassword: ''
      });
      setError('');
      setFieldErrors({});
      setShowPasswordRequirements(false);
      setShowPassword(false);
      setShowConfirmPassword(false);
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  const validateEmail = (email: string): string => {
    if (!email) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return '';
  };

  const validatePassword = (password: string): string => {
    if (!password) return 'Password is required';
    if (!isLogin) {
      const { level } = getPasswordStrength(password);
      if (level === 'weak') return 'Password is too weak';
    }
    return '';
  };

  const validateName = (name: string): string => {
    if (!name) return 'Name is required';
    if (name.length < 2) return 'Name must be at least 2 characters';
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});

    // Validation
    const errors: Record<string, string> = {};
    
    if (!isLogin) {
      errors.name = validateName(formData.name);
    }
    
    errors.email = validateEmail(formData.email);
    errors.password = validatePassword(formData.password);

    if (!isLogin && formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    // Remove empty errors
    Object.keys(errors).forEach(key => {
      if (!errors[key]) delete errors[key];
    });

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    try {
      if (isLogin) {
        await login(formData.email, formData.password, userType);
      } else {
        await register(formData.email, formData.password, formData.name, userType);
      }
      onClose();
    } catch {
      setError('Authentication failed. Please try again.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Show password requirements when typing in password field during registration
    if (name === 'password' && !isLogin) {
      setShowPasswordRequirements(value.length > 0);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
      <div className="bg-[var(--surface)] backdrop-blur-md rounded-xl shadow-2xl border border-[var(--border-color)] p-6 w-full max-w-md mx-4 animate-in slide-in-from-bottom-4 duration-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">
            {isLogin ? 'Sign In' : 'Sign Up'}
          </h2>
          <button
            onClick={onClose}
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xl transition-colors"
          >
            ×
          </button>
        </div>

        {/* User Type Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
            I am a:
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setUserType('individual')}
              className={`py-3 px-3 rounded-lg border transition-colors text-sm ${
                userType === 'individual'
                  ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                  : 'bg-[var(--card-background)] text-[var(--text-primary)] border-[var(--border-color)] hover:bg-[var(--input-background)]'
              }`}
            >
              👤 Job Seeker
            </button>
            <button
              type="button"
              onClick={() => setUserType('recruiter')}
              className={`py-3 px-3 rounded-lg border transition-colors text-sm ${
                userType === 'recruiter'
                  ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                  : 'bg-[var(--card-background)] text-[var(--text-primary)] border-[var(--border-color)] hover:bg-[var(--input-background)]'
              }`}
            >
              🎯 Recruiter
            </button>
            <button
              type="button"
              onClick={() => setUserType('company')}
              className={`py-3 px-3 rounded-lg border transition-colors text-sm ${
                userType === 'company'
                  ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                  : 'bg-[var(--card-background)] text-[var(--text-primary)] border-[var(--border-color)] hover:bg-[var(--input-background)]'
              }`}
            >
              🏢 Company
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                {userType === 'individual' ? 'Full Name' : 
                 userType === 'recruiter' ? 'Full Name' : 'Company Name'}
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className={`w-full px-3 py-2 bg-[var(--input-background)] border text-[var(--text-primary)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--input-focus)] focus:border-[var(--input-focus)] ${
                  fieldErrors.name ? 'border-red-400 focus:ring-red-400' : 'border-[var(--input-border)]'
                }`}
                placeholder={userType === 'individual' ? 'John Doe' : 
                           userType === 'recruiter' ? 'Jane Smith' : 'TechCorp Inc.'}
              />
              {fieldErrors.name && (
                <p className="mt-1 text-sm text-red-400">{fieldErrors.name}</p>
              )}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className={`w-full px-3 py-2 bg-[var(--input-background)] border text-[var(--text-primary)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--input-focus)] focus:border-[var(--input-focus)] ${
                fieldErrors.email ? 'border-red-400 focus:ring-red-400' : 'border-[var(--input-border)]'
              }`}
              placeholder="you@example.com"
            />
            {fieldErrors.email && (
              <p className="mt-1 text-sm text-red-400">{fieldErrors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className={`w-full px-3 py-2 pr-10 bg-[var(--input-background)] border text-[var(--text-primary)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--input-focus)] focus:border-[var(--input-focus)] ${
                  fieldErrors.password ? 'border-red-400 focus:ring-red-400' : 'border-[var(--input-border)]'
                }`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                tabIndex={-1}
              >
                {showPassword ? (
                  // Eye slash icon (hide)
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                ) : (
                  // Eye icon (show)
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            {fieldErrors.password && (
              <p className="mt-1 text-sm text-red-400">{fieldErrors.password}</p>
            )}
            
            {/* Password Requirements Indicator for Registration */}
            {!isLogin && showPasswordRequirements && (
              <div className="mt-3">
                <PasswordStrengthIndicator password={formData.password} />
              </div>
            )}
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-3 py-2 pr-10 bg-[var(--input-background)] border text-[var(--text-primary)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--input-focus)] focus:border-[var(--input-focus)] ${
                    fieldErrors.confirmPassword ? 'border-red-400 focus:ring-red-400' : 'border-[var(--input-border)]'
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                  tabIndex={-1}
                >
                  {showConfirmPassword ? (
                    // Eye slash icon (hide)
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    // Eye icon (show)
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {fieldErrors.confirmPassword && (
                <p className="mt-1 text-sm text-red-400">{fieldErrors.confirmPassword}</p>
              )}
            </div>
          )}

          {error && (
            <div className="text-red-400 text-sm">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--primary)] text-white py-2 px-4 rounded-lg hover:bg-[var(--primary-hover)] transition-colors disabled:opacity-50"
          >
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-[var(--primary)] hover:text-[var(--primary-hover)] text-sm transition-colors"
          >
            {isLogin ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
          </button>
        </div>

        {/* Demo credentials hint */}
        {isLogin && (
          <div className="mt-4 p-3 bg-[var(--card-background)] border border-[var(--border-color)] rounded-lg">
            <p className="text-xs text-[var(--text-muted)]">
              <strong>Demo:</strong> Use any email/password combination to test the system
            </p>
          </div>
        )}

        {/* Registration Info */}
        {!isLogin && (
          <div className="mt-4 p-3 bg-[var(--card-background)] border border-[var(--border-color)] rounded-lg">
            <p className="text-xs text-[var(--text-muted)]">
              By creating an account, you agree to our{' '}
              <span className="text-[var(--primary)] hover:underline cursor-pointer">Terms of Service</span>
              {' '}and{' '}
              <span className="text-[var(--primary)] hover:underline cursor-pointer">Privacy Policy</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}