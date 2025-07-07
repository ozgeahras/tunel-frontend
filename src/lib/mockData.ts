export interface JobTranslation {
  title: string;
  description: string;
  requirements: string[];
  benefits: string[];
}

export interface Job {
  id: string;
  translations: {
    en: JobTranslation;
    tr: JobTranslation;
    de: JobTranslation;
    nl: JobTranslation;
  };
  company: string;
  location: string;
  country: string;
  salary: string;
  salaryMin: number;
  salaryMax: number;
  type: 'full-time' | 'part-time' | 'contract' | 'remote';
  technologies: string[];
  experienceLevel: 'junior' | 'mid' | 'senior' | 'lead';
  visaSponsorship: boolean;
  remote: boolean;
  postedDate: string;
  applicationDeadline: string;
  companyLogo?: string;
}

export const EU_COUNTRIES = [
  'Almanya', 'Avusturya', 'Belçika', 'Bulgaristan', 'Çekya', 'Danimarka',
  'Estonya', 'Finlandiya', 'Fransa', 'Hırvatistan', 'Hollanda', 'İrlanda',
  'İspanya', 'İsveç', 'İtalya', 'Kıbrıs', 'Letonya', 'Litvanya', 'Lüksemburg',
  'Macaristan', 'Malta', 'Polonya', 'Portekiz', 'Romanya', 'Slovakya',
  'Slovenya', 'Yunanistan'
];

export const TECHNOLOGIES = [
  'React', 'Vue.js', 'Angular', 'Node.js', 'Python', 'Java', 'C#', 'PHP',
  'JavaScript', 'TypeScript', 'Go', 'Rust', 'Swift', 'Kotlin', 'Flutter',
  'React Native', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'PostgreSQL',
  'MongoDB', 'Redis', 'GraphQL', 'REST API', 'Microservices'
];

export const mockJobs: Job[] = [
  {
    id: '1',
    translations: {
      en: {
        title: 'Senior Full Stack Developer',
        description: 'We develop scalable web applications using modern technologies.',
        requirements: [
          '5+ years software development experience',
          'Advanced experience with React and Node.js',
          'TypeScript knowledge',
          'PostgreSQL or similar database experience',
          'Cloud platforms (AWS, Azure) experience'
        ],
        benefits: [
          'Visa sponsorship',
          'Relocation support',
          'Flexible working hours',
          'Remote work opportunity',
          'Private health insurance'
        ]
      },
      tr: {
        title: 'Kıdemli Full Stack Developer',
        description: 'Modern teknolojiler kullanarak skalabilitesi yüksek web uygulamaları geliştiriyoruz.',
        requirements: [
          '5+ yıl software geliştirme deneyimi',
          'React ve Node.js ile ileri seviye deneyim',
          'TypeScript bilgisi',
          'PostgreSQL veya benzer veritabanı deneyimi',
          'Cloud platformları (AWS, Azure) deneyimi'
        ],
        benefits: [
          'Vize sponsorluğu',
          'Relocation desteği',
          'Esnek çalışma saatleri',
          'Remote work imkanı',
          'Özel sağlık sigortası'
        ]
      },
      de: {
        title: 'Senior Full Stack Entwickler',
        description: 'Wir entwickeln skalierbare Webanwendungen mit modernen Technologien.',
        requirements: [
          '5+ Jahre Softwareentwicklungserfahrung',
          'Fortgeschrittene Erfahrung mit React und Node.js',
          'TypeScript-Kenntnisse',
          'PostgreSQL oder ähnliche Datenbankerfahrung',
          'Cloud-Plattformen (AWS, Azure) Erfahrung'
        ],
        benefits: [
          'Visa-Sponsoring',
          'Umzugsunterstützung',
          'Flexible Arbeitszeiten',
          'Remote-Arbeit möglich',
          'Private Krankenversicherung'
        ]
      },
      nl: {
        title: 'Senior Full Stack Ontwikkelaar',
        description: 'We ontwikkelen schaalbare webapplicaties met moderne technologieën.',
        requirements: [
          '5+ jaar softwareontwikkelingservaring',
          'Gevorderde ervaring met React en Node.js',
          'TypeScript kennis',
          'PostgreSQL of vergelijkbare database ervaring',
          'Cloud platforms (AWS, Azure) ervaring'
        ],
        benefits: [
          'Visa sponsoring',
          'Verhuisondersteuning',
          'Flexibele werktijden',
          'Remote werk mogelijkheid',
          'Particuliere zorgverzekering'
        ]
      }
    },
    company: 'TechCorp Amsterdam',
    location: 'Amsterdam',
    country: 'Hollanda',
    salary: '€70,000 - €90,000',
    salaryMin: 70000,
    salaryMax: 90000,
    type: 'full-time',
    technologies: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS'],
    experienceLevel: 'senior',
    visaSponsorship: true,
    remote: true,
    postedDate: '2024-01-15',
    applicationDeadline: '2024-02-15'
  },
  {
    id: '2',
    translations: {
      en: {
        title: 'Frontend Developer',
        description: 'We develop modern web applications focused on user experience.',
        requirements: [
          '3+ years frontend development experience',
          'Experience with Vue.js',
          'Modern CSS/Sass knowledge',
          'RESTful API integration experience',
          'German (B1 level) or English'
        ],
        benefits: [
          'Visa sponsorship',
          'German language courses',
          'Startup equity',
          'Modern office environment',
          'Free meals'
        ]
      },
      tr: {
        title: 'Frontend Developer',
        description: 'Kullanıcı deneyimi odaklı modern web uygulamaları geliştiriyoruz.',
        requirements: [
          '3+ yıl frontend geliştirme deneyimi',
          'Vue.js ile deneyim',
          'Modern CSS/Sass bilgisi',
          'RESTful API entegrasyonu deneyimi',
          'Almanca (B1 seviye) veya İngilizce'
        ],
        benefits: [
          'Vize sponsorluğu',
          'Almanca kursları',
          'Startup equity',
          'Modern ofis ortamı',
          'Ücretsiz yemek'
        ]
      },
      de: {
        title: 'Frontend Entwickler',
        description: 'Wir entwickeln moderne Webanwendungen mit Fokus auf Benutzererfahrung.',
        requirements: [
          '3+ Jahre Frontend-Entwicklungserfahrung',
          'Erfahrung mit Vue.js',
          'Moderne CSS/Sass Kenntnisse',
          'RESTful API Integration Erfahrung',
          'Deutsch (B1 Level) oder Englisch'
        ],
        benefits: [
          'Visa-Sponsoring',
          'Deutsche Sprachkurse',
          'Startup-Beteiligung',
          'Moderne Büroumgebung',
          'Kostenloses Essen'
        ]
      },
      nl: {
        title: 'Frontend Ontwikkelaar',
        description: 'We ontwikkelen moderne webapplicaties gericht op gebruikerservaring.',
        requirements: [
          '3+ jaar frontend ontwikkelingservaring',
          'Ervaring met Vue.js',
          'Moderne CSS/Sass kennis',
          'RESTful API integratie ervaring',
          'Duits (B1 niveau) of Engels'
        ],
        benefits: [
          'Visa sponsoring',
          'Duitse taalcursussen',
          'Startup equity',
          'Moderne kantooromgeving',
          'Gratis maaltijden'
        ]
      }
    },
    company: 'Berlin Startup GmbH',
    location: 'Berlin',
    country: 'Almanya',
    salary: '€55,000 - €70,000',
    salaryMin: 55000,
    salaryMax: 70000,
    type: 'full-time',
    technologies: ['Vue.js', 'JavaScript', 'Sass', 'Webpack', 'Docker'],
    experienceLevel: 'mid',
    visaSponsorship: true,
    remote: false,
    postedDate: '2024-01-10',
    applicationDeadline: '2024-02-10'
  },
  {
    id: '3',
    translations: {
      en: {
        title: 'DevOps Engineer',
        description: 'We manage cloud infrastructure and CI/CD pipelines.',
        requirements: [
          '4+ years DevOps experience',
          'Docker and Kubernetes experience',
          'AWS or Azure cloud platforms',
          'Infrastructure as Code (Terraform)',
          'Python or Go programming'
        ],
        benefits: [
          'Visa sponsorship',
          'French language courses',
          'Flexible working hours',
          'Home office opportunity',
          '25 days annual leave'
        ]
      },
      tr: {
        title: 'DevOps Engineer',
        description: 'Cloud infrastructure ve CI/CD pipeline\'ları yönetiyoruz.',
        requirements: [
          '4+ yıl DevOps deneyimi',
          'Docker ve Kubernetes deneyimi',
          'AWS veya Azure cloud platformları',
          'Infrastructure as Code (Terraform)',
          'Python veya Go programlama'
        ],
        benefits: [
          'Vize sponsorluğu',
          'Fransızca kursları',
          'Esnek çalışma saatleri',
          'Home office imkanı',
          '25 gün yıllık izin'
        ]
      },
      de: {
        title: 'DevOps Ingenieur',
        description: 'Wir verwalten Cloud-Infrastruktur und CI/CD-Pipelines.',
        requirements: [
          '4+ Jahre DevOps-Erfahrung',
          'Docker und Kubernetes Erfahrung',
          'AWS oder Azure Cloud-Plattformen',
          'Infrastructure as Code (Terraform)',
          'Python oder Go Programmierung'
        ],
        benefits: [
          'Visa-Sponsoring',
          'Französische Sprachkurse',
          'Flexible Arbeitszeiten',
          'Home Office Möglichkeit',
          '25 Tage Jahresurlaub'
        ]
      },
      nl: {
        title: 'DevOps Engineer',
        description: 'We beheren cloud infrastructuur en CI/CD pipelines.',
        requirements: [
          '4+ jaar DevOps ervaring',
          'Docker en Kubernetes ervaring',
          'AWS of Azure cloud platforms',
          'Infrastructure as Code (Terraform)',
          'Python of Go programmeren'
        ],
        benefits: [
          'Visa sponsoring',
          'Franse taalcursussen',
          'Flexibele werktijden',
          'Thuiswerk mogelijkheid',
          '25 dagen jaarlijks verlof'
        ]
      }
    },
    company: 'Paris Tech Solutions',
    location: 'Paris',
    country: 'Fransa',
    salary: '€60,000 - €80,000',
    salaryMin: 60000,
    salaryMax: 80000,
    type: 'full-time',
    technologies: ['Docker', 'Kubernetes', 'AWS', 'Terraform', 'Python'],
    experienceLevel: 'mid',
    visaSponsorship: true,
    remote: true,
    postedDate: '2024-01-12',
    applicationDeadline: '2024-02-12'
  }
];

export const getJobsByCountry = (country: string): Job[] => {
  if (country === 'Tüm Ülkeler') {
    return mockJobs;
  }
  return mockJobs.filter(job => job.country === country);
};

export const searchJobs = (query: string, country: string = 'Tüm Ülkeler'): Job[] => {
  const jobs = getJobsByCountry(country);
  
  if (query.trim() === '') {
    return jobs;
  }
  
  const searchQuery = query.toLowerCase();
  return jobs.filter(job => 
    // Search in all language versions
    Object.values(job.translations).some(translation =>
      translation.title.toLowerCase().includes(searchQuery)
    ) ||
    job.company.toLowerCase().includes(searchQuery) ||
    job.technologies.some(tech => tech.toLowerCase().includes(searchQuery)) ||
    job.location.toLowerCase().includes(searchQuery)
  );
};