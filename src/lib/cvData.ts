export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  linkedIn?: string;
  github?: string;
  website?: string;
  summary: string;
  photo?: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate?: string; // undefined means current job
  isCurrentJob: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate?: string;
  gpa?: string;
  description?: string;
  isCurrentlyStudying: boolean;
}

export interface Skill {
  id: string;
  name: string;
  category: 'Programming' | 'Framework' | 'Database' | 'Cloud' | 'Tool' | 'Language' | 'Soft Skill';
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  yearsOfExperience?: number;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  url?: string;
  github?: string;
  startDate: string;
  endDate?: string;
  highlights: string[];
}

export interface Language {
  id: string;
  name: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'Native';
  certification?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  url?: string;
}

export interface CVData {
  id: string;
  personalInfo: PersonalInfo;
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  languages: Language[];
  certifications: Certification[];
  createdAt: string;
  updatedAt: string;
  template: 'modern' | 'classic' | 'creative' | 'minimal';
}

// AI categorization interfaces
export interface AIAnalysisResult {
  extractedData: Partial<CVData>;
  confidence: number;
  suggestions: string[];
  categorizedSkills: {
    technical: Skill[];
    soft: Skill[];
    languages: Language[];
  };
  detectedExperience: {
    totalYears: number;
    seniorityLevel: 'Junior' | 'Mid' | 'Senior' | 'Lead' | 'Executive';
    primaryTechnologies: string[];
  };
}

// Mock AI analysis function (in real app, this would call an AI service)
export const analyzeCV = async (): Promise<AIAnalysisResult> => {
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock analysis - in real app, this would use OpenAI/Claude API
  const mockResult: AIAnalysisResult = {
    extractedData: {
      personalInfo: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@email.com',
        phone: '+31 6 12345678',
        location: 'Amsterdam, Netherlands',
        linkedIn: 'linkedin.com/in/johndoe',
        github: 'github.com/johndoe',
        summary: 'Experienced software developer with 5+ years in full-stack development.'
      },
      workExperience: [
        {
          id: '1',
          company: 'TechCorp',
          position: 'Senior Full Stack Developer',
          location: 'Amsterdam',
          startDate: '2021-01',
          endDate: undefined,
          isCurrentJob: true,
          description: 'Lead development of React applications and Node.js APIs',
          achievements: [
            'Increased performance by 40%',
            'Led team of 4 developers',
            'Implemented CI/CD pipeline'
          ],
          technologies: ['React', 'Node.js', 'TypeScript', 'AWS']
        }
      ],
      skills: [
        { id: '1', name: 'React', category: 'Framework', level: 'Advanced', yearsOfExperience: 5 },
        { id: '2', name: 'TypeScript', category: 'Programming', level: 'Advanced', yearsOfExperience: 4 },
        { id: '3', name: 'AWS', category: 'Cloud', level: 'Intermediate', yearsOfExperience: 3 }
      ]
    },
    confidence: 0.87,
    suggestions: [
      'Add more specific metrics to achievements',
      'Include certification details',
      'Expand project descriptions'
    ],
    categorizedSkills: {
      technical: [
        { id: '1', name: 'React', category: 'Framework', level: 'Advanced', yearsOfExperience: 5 },
        { id: '2', name: 'TypeScript', category: 'Programming', level: 'Advanced', yearsOfExperience: 4 }
      ],
      soft: [
        { id: '3', name: 'Leadership', category: 'Soft Skill', level: 'Intermediate', yearsOfExperience: 2 },
        { id: '4', name: 'Problem Solving', category: 'Soft Skill', level: 'Advanced', yearsOfExperience: 5 }
      ],
      languages: [
        { id: '1', name: 'English', level: 'C2' },
        { id: '2', name: 'Dutch', level: 'B2' }
      ]
    },
    detectedExperience: {
      totalYears: 5,
      seniorityLevel: 'Senior',
      primaryTechnologies: ['React', 'TypeScript', 'Node.js', 'AWS']
    }
  };
  
  return mockResult;
};

// Default empty CV
export const createEmptyCV = (): CVData => ({
  id: crypto.randomUUID(),
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    summary: ''
  },
  workExperience: [],
  education: [],
  skills: [],
  projects: [],
  languages: [],
  certifications: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  template: 'modern'
});

// Mock user CV data
export const mockUserCV: CVData = {
  id: 'user-cv-1',
  personalInfo: {
    firstName: 'Özge',
    lastName: 'Ahras',
    email: 'ozge.ahras@email.com',
    phone: '+90 555 123 4567',
    location: 'Istanbul, Turkey',
    linkedIn: 'linkedin.com/in/ozgeahras',
    github: 'github.com/ozgeahras',
    summary: 'Passionate software developer with experience in full-stack development. Looking for opportunities in Europe with visa sponsorship.'
  },
  workExperience: [
    {
      id: '1',
      company: 'Tech Startup Istanbul',
      position: 'Full Stack Developer',
      location: 'Istanbul, Turkey',
      startDate: '2022-06',
      endDate: undefined,
      isCurrentJob: true,
      description: 'Developing modern web applications using React and Node.js',
      achievements: [
        'Built responsive admin dashboard',
        'Improved page load speed by 30%',
        'Implemented authentication system'
      ],
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Docker']
    }
  ],
  education: [
    {
      id: '1',
      institution: 'Istanbul Technical University',
      degree: 'Bachelor of Science',
      field: 'Computer Engineering',
      location: 'Istanbul, Turkey',
      startDate: '2018-09',
      endDate: '2022-06',
      gpa: '3.4/4.0',
      isCurrentlyStudying: false
    }
  ],
  skills: [
    { id: '1', name: 'React', category: 'Framework', level: 'Advanced', yearsOfExperience: 3 },
    { id: '2', name: 'TypeScript', category: 'Programming', level: 'Intermediate', yearsOfExperience: 2 },
    { id: '3', name: 'Node.js', category: 'Programming', level: 'Intermediate', yearsOfExperience: 2 },
    { id: '4', name: 'PostgreSQL', category: 'Database', level: 'Intermediate', yearsOfExperience: 2 }
  ],
  projects: [
    {
      id: '1',
      name: 'Tunel Job Platform',
      description: 'Multi-language job platform for Turkish developers seeking European opportunities',
      technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
      github: 'github.com/ozgeahras/tunel',
      startDate: '2024-01',
      highlights: [
        'Built with Next.js 15 and React 19',
        'Multi-language support (EN, DE, NL, TR)',
        'Company directory with follow functionality'
      ]
    }
  ],
  languages: [
    { id: '1', name: 'Turkish', level: 'Native' },
    { id: '2', name: 'English', level: 'B2' },
    { id: '3', name: 'German', level: 'A2' }
  ],
  certifications: [],
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: new Date().toISOString(),
  template: 'modern'
};