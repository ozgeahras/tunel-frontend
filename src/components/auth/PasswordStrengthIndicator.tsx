'use client';

interface PasswordStrengthIndicatorProps {
  password: string;
  className?: string;
}

interface PasswordRequirement {
  id: string;
  label: string;
  test: (password: string) => boolean;
}

const passwordRequirements: PasswordRequirement[] = [
  {
    id: 'length',
    label: 'At least 8 characters',
    test: (password) => password.length >= 8
  },
  {
    id: 'uppercase',
    label: 'One uppercase letter',
    test: (password) => /[A-Z]/.test(password)
  },
  {
    id: 'lowercase',
    label: 'One lowercase letter',
    test: (password) => /[a-z]/.test(password)
  },
  {
    id: 'number',
    label: 'One number',
    test: (password) => /[0-9]/.test(password)
  },
  {
    id: 'special',
    label: 'One special character (!@#$%^&*)',
    test: (password) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
  }
];

export function getPasswordStrength(password: string): {
  score: number;
  level: 'weak' | 'fair' | 'good' | 'strong';
  percentage: number;
} {
  if (!password) return { score: 0, level: 'weak', percentage: 0 };
  
  const passedRequirements = passwordRequirements.filter(req => req.test(password));
  const score = passedRequirements.length;
  const percentage = (score / passwordRequirements.length) * 100;
  
  let level: 'weak' | 'fair' | 'good' | 'strong' = 'weak';
  if (score >= 5) level = 'strong';
  else if (score >= 4) level = 'good';
  else if (score >= 2) level = 'fair';
  
  return { score, level, percentage };
}

export default function PasswordStrengthIndicator({ password, className = '' }: PasswordStrengthIndicatorProps) {
  const { level, percentage } = getPasswordStrength(password);
  
  const getStrengthColor = () => {
    switch (level) {
      case 'strong': return 'bg-green-500';
      case 'good': return 'bg-blue-500';
      case 'fair': return 'bg-yellow-500';
      default: return 'bg-red-500';
    }
  };
  
  const getStrengthText = () => {
    switch (level) {
      case 'strong': return 'Strong password';
      case 'good': return 'Good password';
      case 'fair': return 'Fair password';
      default: return 'Weak password';
    }
  };

  if (!password) return null;

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Strength Bar */}
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <span className="text-xs text-[var(--text-secondary)]">Password Strength</span>
          <span className={`text-xs font-medium ${
            level === 'strong' ? 'text-green-400' :
            level === 'good' ? 'text-blue-400' :
            level === 'fair' ? 'text-yellow-400' :
            'text-red-400'
          }`}>
            {getStrengthText()}
          </span>
        </div>
        <div className="w-full bg-[var(--input-border)] rounded-full h-2 overflow-hidden">
          <div 
            className={`h-full transition-all duration-300 ${getStrengthColor()}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Requirements List */}
      <div className="space-y-1">
        {passwordRequirements.map((requirement) => {
          const isPassed = requirement.test(password);
          return (
            <div key={requirement.id} className="flex items-center space-x-2">
              <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                isPassed 
                  ? 'bg-green-500 text-white' 
                  : 'bg-[var(--input-border)] text-[var(--text-muted)]'
              }`}>
                {isPassed ? (
                  <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <div className="w-1.5 h-1.5 bg-current rounded-full" />
                )}
              </div>
              <span className={`text-xs ${
                isPassed ? 'text-green-400' : 'text-[var(--text-muted)]'
              }`}>
                {requirement.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}