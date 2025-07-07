export interface CompanyTranslation {
  name: string;
  description: string;
  culture: string[];
  benefits: string[];
}

export interface Company {
  id: string;
  translations: {
    en: CompanyTranslation;
    tr: CompanyTranslation;
    de: CompanyTranslation;
    nl: CompanyTranslation;
  };
  logo: string;
  website: string;
  location: string;
  country: string;
  category: 'Startup' | 'Enterprise' | 'Scale-up' | 'Unicorn' | 'Public';
  size: string;
  founded: number;
  funding: string;
  techStack: string[];
  visaSponsorship: boolean;
  openPositions: number;
  rating: number;
  reviews: number;
  socialMedia: {
    linkedin?: string;
    twitter?: string;
    glassdoor?: string;
  };
  isFollowing?: boolean;
}

export const COMPANY_CATEGORIES = [
  'All Companies',
  'Startup', 
  'Enterprise', 
  'Scale-up', 
  'Unicorn', 
  'Public'
] as const;

export const mockCompanies: Company[] = [
  {
    id: '1',
    translations: {
      en: {
        name: 'TechFlow Amsterdam',
        description: 'Leading fintech company developing next-generation payment solutions for European markets. We combine cutting-edge technology with financial expertise.',
        culture: [
          'Innovation-driven environment',
          'Work-life balance focus',
          'Continuous learning culture',
          'Diverse and inclusive team'
        ],
        benefits: [
          'Visa sponsorship & relocation support',
          'Competitive salary + equity',
          'Flexible working hours',
          'Annual learning budget €2000',
          'Premium health insurance',
          '25 days vacation + Dutch holidays'
        ]
      },
      tr: {
        name: 'TechFlow Amsterdam',
        description: 'Avrupa pazarları için yeni nesil ödeme çözümleri geliştiren önde gelen fintech şirketi. Son teknoloji ile finansal uzmanlığı birleştiriyoruz.',
        culture: [
          'İnovasyon odaklı ortam',
          'İş-yaşam dengesi odağı',
          'Sürekli öğrenme kültürü',
          'Çeşitli ve kapsayıcı ekip'
        ],
        benefits: [
          'Vize sponsorluğu ve relocation desteği',
          'Rekabetçi maaş + hisse',
          'Esnek çalışma saatleri',
          'Yıllık öğrenme bütçesi €2000',
          'Premium sağlık sigortası',
          '25 gün tatil + Hollanda tatilleri'
        ]
      },
      de: {
        name: 'TechFlow Amsterdam',
        description: 'Führendes Fintech-Unternehmen, das Next-Generation-Zahlungslösungen für europäische Märkte entwickelt. Wir kombinieren modernste Technologie mit Finanzexpertise.',
        culture: [
          'Innovationsgetriebene Umgebung',
          'Work-Life-Balance Fokus',
          'Kontinuierliche Lernkultur',
          'Vielfältiges und inklusives Team'
        ],
        benefits: [
          'Visa-Sponsoring & Relocation-Support',
          'Wettbewerbsfähiges Gehalt + Equity',
          'Flexible Arbeitszeiten',
          'Jährliches Lernbudget €2000',
          'Premium Krankenversicherung',
          '25 Tage Urlaub + niederländische Feiertage'
        ]
      },
      nl: {
        name: 'TechFlow Amsterdam',
        description: 'Toonaangevend fintech bedrijf dat next-generation betalingsoplossingen ontwikkelt voor Europese markten. We combineren cutting-edge technologie met financiële expertise.',
        culture: [
          'Innovatiegedreven omgeving',
          'Work-life balance focus',
          'Continue leercultuur',
          'Divers en inclusief team'
        ],
        benefits: [
          'Visa sponsoring & verhuisondersteuning',
          'Competitief salaris + equity',
          'Flexibele werktijden',
          'Jaarlijks leerbudget €2000',
          'Premium zorgverzekering',
          '25 dagen vakantie + Nederlandse feestdagen'
        ]
      }
    },
    logo: '🏦',
    website: 'https://techflow.nl',
    location: 'Amsterdam',
    country: 'Hollanda',
    category: 'Scale-up',
    size: '150-500',
    founded: 2018,
    funding: 'Series B - €45M',
    techStack: ['React', 'Node.js', 'Python', 'PostgreSQL', 'AWS', 'Kubernetes'],
    visaSponsorship: true,
    openPositions: 12,
    rating: 4.6,
    reviews: 127,
    socialMedia: {
      linkedin: 'https://linkedin.com/company/techflow',
      twitter: '@techflow',
      glassdoor: 'https://glassdoor.com/techflow'
    },
    isFollowing: false
  },
  {
    id: '2',
    translations: {
      en: {
        name: 'Berlin Innovations GmbH',
        description: 'AI-powered logistics startup revolutionizing supply chain management across Europe. We use machine learning to optimize delivery routes and reduce environmental impact.',
        culture: [
          'AI-first mindset',
          'Sustainability focus',
          'Fast-paced environment',
          'Global remote team'
        ],
        benefits: [
          'Visa sponsorship available',
          'Stock options program',
          'Remote-first culture',
          'Conference attendance budget',
          'Mental health support',
          'Unlimited vacation policy'
        ]
      },
      tr: {
        name: 'Berlin Innovations GmbH',
        description: 'Avrupa genelinde tedarik zinciri yönetiminde devrim yaratan AI destekli lojistik startup\'ı. Teslimat rotalarını optimize etmek ve çevresel etkiyi azaltmak için makine öğrenmesi kullanıyoruz.',
        culture: [
          'AI-öncelikli düşünce',
          'Sürdürülebilirlik odağı',
          'Hızlı tempolu ortam',
          'Küresel remote ekip'
        ],
        benefits: [
          'Vize sponsorluğu mevcut',
          'Hisse senedi opsiyonu programı',
          'Remote-öncelikli kültür',
          'Konferans katılım bütçesi',
          'Ruh sağlığı desteği',
          'Sınırsız tatil politikası'
        ]
      },
      de: {
        name: 'Berlin Innovations GmbH',
        description: 'KI-gestütztes Logistik-Startup, das das Supply Chain Management in ganz Europa revolutioniert. Wir nutzen Machine Learning zur Optimierung von Lieferrouten und zur Reduzierung der Umweltauswirkungen.',
        culture: [
          'KI-First-Mindset',
          'Nachhaltigkeitsfokus',
          'Schnelllebige Umgebung',
          'Globales Remote-Team'
        ],
        benefits: [
          'Visa-Sponsoring verfügbar',
          'Aktienoptionsprogramm',
          'Remote-First-Kultur',
          'Konferenz-Teilnahmebudget',
          'Mental Health Support',
          'Unbegrenzte Urlaubsregelung'
        ]
      },
      nl: {
        name: 'Berlin Innovations GmbH',
        description: 'AI-aangedreven logistiek startup die supply chain management in heel Europa revolutioneert. We gebruiken machine learning om bezorgroutes te optimaliseren en milieu-impact te verminderen.',
        culture: [
          'AI-first mindset',
          'Duurzaamheidsfocus',
          'Fast-paced omgeving',
          'Wereldwijd remote team'
        ],
        benefits: [
          'Visa sponsoring beschikbaar',
          'Aandelenoptieprogramma',
          'Remote-first cultuur',
          'Conferentie bijwoning budget',
          'Mentale gezondheidsondersteuning',
          'Onbeperkt verlofbeleid'
        ]
      }
    },
    logo: '🤖',
    website: 'https://berlin-innovations.de',
    location: 'Berlin',
    country: 'Almanya',
    category: 'Startup',
    size: '50-150',
    founded: 2020,
    funding: 'Series A - €18M',
    techStack: ['Python', 'TensorFlow', 'Django', 'PostgreSQL', 'Docker', 'GCP'],
    visaSponsorship: true,
    openPositions: 8,
    rating: 4.4,
    reviews: 89,
    socialMedia: {
      linkedin: 'https://linkedin.com/company/berlin-innovations',
      twitter: '@berlin_inno'
    },
    isFollowing: false
  },
  {
    id: '3',
    translations: {
      en: {
        name: 'DataVault Technologies',
        description: 'Enterprise security company providing zero-trust cloud solutions for Fortune 500 companies. We protect critical data infrastructure across 40+ countries.',
        culture: [
          'Security-first approach',
          'Enterprise-grade quality',
          'Continuous improvement',
          'Technical excellence'
        ],
        benefits: [
          'Full visa sponsorship',
          'Competitive compensation package',
          'Professional development fund',
          'Flexible hybrid working',
          'Top-tier equipment',
          'Annual team retreats'
        ]
      },
      tr: {
        name: 'DataVault Technologies',
        description: 'Fortune 500 şirketleri için zero-trust bulut çözümleri sağlayan kurumsal güvenlik şirketi. 40+ ülkede kritik veri altyapısını koruyoruz.',
        culture: [
          'Güvenlik-öncelikli yaklaşım',
          'Kurumsal kalite',
          'Sürekli iyileştirme',
          'Teknik mükemmellik'
        ],
        benefits: [
          'Tam vize sponsorluğu',
          'Rekabetçi ücret paketi',
          'Profesyonel gelişim fonu',
          'Esnek hibrit çalışma',
          'En iyi ekipman',
          'Yıllık ekip toplantıları'
        ]
      },
      de: {
        name: 'DataVault Technologies',
        description: 'Enterprise-Sicherheitsunternehmen, das Zero-Trust-Cloud-Lösungen für Fortune-500-Unternehmen bereitstellt. Wir schützen kritische Dateninfrastrukturen in über 40 Ländern.',
        culture: [
          'Security-First-Ansatz',
          'Enterprise-Grade-Qualität',
          'Kontinuierliche Verbesserung',
          'Technische Exzellenz'
        ],
        benefits: [
          'Vollständiges Visa-Sponsoring',
          'Wettbewerbsfähiges Vergütungspaket',
          'Berufliche Entwicklungsfonds',
          'Flexibles Hybrid-Arbeiten',
          'Top-Tier-Ausrüstung',
          'Jährliche Team-Retreats'
        ]
      },
      nl: {
        name: 'DataVault Technologies',
        description: 'Enterprise security bedrijf dat zero-trust cloud oplossingen levert voor Fortune 500 bedrijven. We beschermen kritieke data infrastructuur in 40+ landen.',
        culture: [
          'Security-first benadering',
          'Enterprise-grade kwaliteit',
          'Continue verbetering',
          'Technische excellentie'
        ],
        benefits: [
          'Volledige visa sponsoring',
          'Competitief compensatiepakket',
          'Professioneel ontwikkelingsfonds',
          'Flexibel hybride werken',
          'Top-tier apparatuur',
          'Jaarlijkse team retreats'
        ]
      }
    },
    logo: '🔒',
    website: 'https://datavault.com',
    location: 'Paris',
    country: 'Fransa',
    category: 'Enterprise',
    size: '500-1000',
    founded: 2015,
    funding: 'Series C - €120M',
    techStack: ['Java', 'Spring', 'Kubernetes', 'AWS', 'Terraform', 'Go'],
    visaSponsorship: true,
    openPositions: 15,
    rating: 4.3,
    reviews: 234,
    socialMedia: {
      linkedin: 'https://linkedin.com/company/datavault',
      glassdoor: 'https://glassdoor.com/datavault'
    },
    isFollowing: true
  },
  {
    id: '4',
    translations: {
      en: {
        name: 'GreenTech Solutions',
        description: 'Climate tech company developing renewable energy management platforms. Our software optimizes solar and wind energy distribution across European smart grids.',
        culture: [
          'Climate action focused',
          'Impact-driven work',
          'Collaborative environment',
          'Sustainability mindset'
        ],
        benefits: [
          'Visa sponsorship program',
          'Purpose-driven mission',
          'Green commuting allowance',
          'Sabbatical leave options',
          'Wellness programs',
          'Carbon-neutral office'
        ]
      },
      tr: {
        name: 'GreenTech Solutions',
        description: 'Yenilenebilir enerji yönetim platformları geliştiren iklim teknolojisi şirketi. Yazılımımız Avrupa akıllı şebekelerinde güneş ve rüzgar enerjisi dağıtımını optimize ediyor.',
        culture: [
          'İklim eylemi odaklı',
          'Etki odaklı çalışma',
          'İşbirlikçi ortam',
          'Sürdürülebilirlik düşüncesi'
        ],
        benefits: [
          'Vize sponsorluğu programı',
          'Amaç odaklı misyon',
          'Yeşil ulaşım ödeneği',
          'Sabatik izin seçenekleri',
          'Wellness programları',
          'Karbon-nötr ofis'
        ]
      },
      de: {
        name: 'GreenTech Solutions',
        description: 'Klimatechnologie-Unternehmen, das Plattformen für das Management erneuerbarer Energien entwickelt. Unsere Software optimiert die Verteilung von Solar- und Windenergie in europäischen Smart Grids.',
        culture: [
          'Klimaschutz-fokussiert',
          'Impact-getriebene Arbeit',
          'Kollaborative Umgebung',
          'Nachhaltigkeits-Mindset'
        ],
        benefits: [
          'Visa-Sponsoring-Programm',
          'Zweckgetriebene Mission',
          'Grüne Pendler-Zulage',
          'Sabbatical-Optionen',
          'Wellness-Programme',
          'CO2-neutrales Büro'
        ]
      },
      nl: {
        name: 'GreenTech Solutions',
        description: 'Climate tech bedrijf dat platforms voor hernieuwbare energie management ontwikkelt. Onze software optimaliseert zonne- en windenergie distributie over Europese smart grids.',
        culture: [
          'Klimaatactie gericht',
          'Impact-gedreven werk',
          'Collaboratieve omgeving',
          'Duurzaamheidsmindset'
        ],
        benefits: [
          'Visa sponsoring programma',
          'Doelgerichte missie',
          'Groene woon-werk vergoeding',
          'Sabbatical verlof opties',
          'Wellness programma\'s',
          'CO2-neutraal kantoor'
        ]
      }
    },
    logo: '🌱',
    website: 'https://greentech-solutions.eu',
    location: 'Copenhagen',
    country: 'Danimarka',
    category: 'Scale-up',
    size: '100-300',
    founded: 2019,
    funding: 'Series B - €35M',
    techStack: ['React', 'Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Azure'],
    visaSponsorship: true,
    openPositions: 6,
    rating: 4.7,
    reviews: 156,
    socialMedia: {
      linkedin: 'https://linkedin.com/company/greentech-solutions',
      twitter: '@greentechsol'
    },
    isFollowing: false
  },
  {
    id: '5',
    translations: {
      en: {
        name: 'Quantum Labs',
        description: 'Deep tech company pioneering quantum computing applications for financial modeling and cryptography. We are at the forefront of quantum advantage research.',
        culture: [
          'Research-driven innovation',
          'Academic collaboration',
          'Cutting-edge technology',
          'Scientific excellence'
        ],
        benefits: [
          'Research visa sponsorship',
          'PhD bonus programs',
          'Conference presentation budget',
          'Research sabbaticals',
          'Publication incentives',
          'State-of-the-art lab access'
        ]
      },
      tr: {
        name: 'Quantum Labs',
        description: 'Finansal modelleme ve kriptografi için kuantum hesaplama uygulamalarında öncülük eden deep tech şirketi. Kuantum avantajı araştırmalarının ön saflarındayız.',
        culture: [
          'Araştırma odaklı inovasyon',
          'Akademik işbirliği',
          'Son teknoloji',
          'Bilimsel mükemmellik'
        ],
        benefits: [
          'Araştırma vizesi sponsorluğu',
          'PhD bonus programları',
          'Konferans sunum bütçesi',
          'Araştırma sabatikleri',
          'Yayın teşvikleri',
          'Son teknoloji laboratuvar erişimi'
        ]
      },
      de: {
        name: 'Quantum Labs',
        description: 'Deep-Tech-Unternehmen, das Pionierarbeit bei Quantencomputing-Anwendungen für Finanzmodellierung und Kryptographie leistet. Wir stehen an der Spitze der Quantum-Advantage-Forschung.',
        culture: [
          'Forschungsgetriebene Innovation',
          'Akademische Zusammenarbeit',
          'Spitzentechnologie',
          'Wissenschaftliche Exzellenz'
        ],
        benefits: [
          'Forschungsvisa-Sponsoring',
          'PhD-Bonus-Programme',
          'Konferenz-Präsentationsbudget',
          'Forschungs-Sabbaticals',
          'Publikationsanreize',
          'Hochmoderner Laborzugang'
        ]
      },
      nl: {
        name: 'Quantum Labs',
        description: 'Deep tech bedrijf dat baanbrekend werk doet op het gebied van quantum computing toepassingen voor financiële modellering en cryptografie. We staan vooraan in quantum advantage onderzoek.',
        culture: [
          'Onderzoeksgedreven innovatie',
          'Academische samenwerking',
          'Cutting-edge technologie',
          'Wetenschappelijke excellentie'
        ],
        benefits: [
          'Onderzoeksvisa sponsoring',
          'PhD bonus programma\'s',
          'Conferentie presentatie budget',
          'Onderzoeks sabbaticals',
          'Publicatie incentives',
          'State-of-the-art lab toegang'
        ]
      }
    },
    logo: '⚛️',
    website: 'https://quantumlabs.ch',
    location: 'Zurich',
    country: 'İsviçre',
    category: 'Unicorn',
    size: '200-500',
    founded: 2016,
    funding: 'Series D - €200M',
    techStack: ['Python', 'C++', 'Qiskit', 'TensorFlow', 'Docker', 'HPC'],
    visaSponsorship: true,
    openPositions: 4,
    rating: 4.8,
    reviews: 92,
    socialMedia: {
      linkedin: 'https://linkedin.com/company/quantum-labs'
    },
    isFollowing: true
  }
];

export const getCompaniesByCategory = (category: string): Company[] => {
  if (category === 'All Companies') {
    return mockCompanies;
  }
  return mockCompanies.filter(company => company.category === category);
};

export const searchCompanies = (query: string, category: string = 'All Companies'): Company[] => {
  const companies = getCompaniesByCategory(category);
  
  if (query.trim() === '') {
    return companies;
  }
  
  const searchQuery = query.toLowerCase();
  return companies.filter(company => 
    // Search in all language versions
    Object.values(company.translations).some(translation =>
      translation.name.toLowerCase().includes(searchQuery) ||
      translation.description.toLowerCase().includes(searchQuery)
    ) ||
    company.location.toLowerCase().includes(searchQuery) ||
    company.techStack.some(tech => tech.toLowerCase().includes(searchQuery)) ||
    company.category.toLowerCase().includes(searchQuery)
  );
};