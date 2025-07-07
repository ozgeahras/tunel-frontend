# Tunel - European Job Opportunities for Turkish Tech Professionals

A comprehensive job platform connecting Turkish software developers and tech professionals with European companies offering visa sponsorship.

## 🌟 Features

### For Job Seekers
- **Smart Job Search**: Advanced filtering by location, salary, tech stack, and visa sponsorship
- **AI-Powered CV Builder**: Create professional CVs with AI assistance
- **Application Tracking**: Monitor your job applications and their progress
- **Company Insights**: Detailed company profiles with culture, tech stack, and benefits
- **Multi-language Support**: English, German, Dutch, and Turkish

### For Companies
- **Easy Job Posting**: Simple interface to post and manage job listings
- **Candidate Management**: Review applications and manage hiring pipeline
- **Analytics Dashboard**: Track application metrics and candidate insights
- **Visa Sponsorship Support**: Resources and guidance for hiring international talent

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/tunel-app.git
cd tunel-app
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
- Supabase URL and keys (for database)
- Optional: AI service keys, analytics, etc.

4. **Set up the database**

If using Supabase:
- Create a new project at [supabase.com](https://supabase.com)
- Run the SQL schema from `src/lib/supabase.ts`
- Update your environment variables

5. **Start the development server**
```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 🏗️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS v4, SCSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth + JWT for Admin
- **State Management**: React Context
- **Internationalization**: Custom i18n context
- **Admin Backend**: Cloudflare Workers with Hono framework
- **Deployment**: Cloudflare Pages (Frontend) + Cloudflare Workers (Admin API)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage
│   ├── jobs/              # Job listings
│   ├── companies/         # Company directory
│   ├── profile/           # CV builder
│   ├── dashboard/         # Company dashboard
│   └── my-applications/   # User applications
├── components/            # Reusable components
│   ├── auth/             # Authentication components
│   ├── cv/               # CV builder components
│   └── ...
├── contexts/             # React contexts
│   ├── AuthContext.tsx   # Authentication state
│   └── LanguageContext.tsx # Internationalization
├── lib/                  # Utilities and data
│   ├── supabase.ts       # Database configuration
│   ├── mockData.ts       # Development data
│   └── cvData.ts         # CV data structures
└── styles/               # Global styles
```

## 🔧 Configuration

### Database Setup (Supabase)

1. Create a new Supabase project
2. Run the SQL schema from `src/lib/supabase.ts` in the SQL editor
3. Set up Row Level Security (RLS) policies
4. Configure authentication providers if needed

### Environment Variables

See `.env.example` for all available configuration options.

### Internationalization

The app supports 4 languages:
- English (default)
- German (de)
- Dutch (nl)  
- Turkish (tr)

Add new translations in `src/contexts/LanguageContext.tsx`.

## 🚀 Deployment

### Cloudflare Pages (Current)

**Frontend Deployment:**
1. Connect GitHub repository to Cloudflare Pages
2. Build command: `npm run build`
3. Output directory: `out`
4. Automatic deployments from main branch

**Admin API Deployment:**
1. Admin API runs on Cloudflare Workers
2. Repository: https://github.com/ozgeahras/tunel-admin
3. Automatic deployment on push to main
4. Global edge deployment for optimal performance

### Environment Variables

**Frontend (Cloudflare Pages):**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

**Admin API (Cloudflare Workers):**
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD` 
- `JWT_SECRET`
- `NODE_ENV`

## 🛠️ Development

### Available Scripts

```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server

# Code Quality
pnpm lint         # Run ESLint
pnpm type-check   # Run TypeScript compiler

# Database
pnpm db:reset     # Reset database (if configured)
pnpm db:seed      # Seed with sample data
```

### Adding New Features

1. **Database**: Update schema in `src/lib/supabase.ts`
2. **Types**: Add TypeScript interfaces
3. **Components**: Create reusable components
4. **Pages**: Add new routes in `src/app/`
5. **Translations**: Update language files

## 📊 Features Roadmap

### Phase 1 (Current)
- [x] User authentication (individuals & companies)
- [x] Job search and filtering
- [x] CV builder with AI assistance
- [x] Company profiles and following
- [x] Application tracking
- [x] Multi-language support

### Phase 2 (Planned)
- [ ] Real-time notifications
- [ ] Video interviews integration
- [ ] Salary insights and benchmarking
- [ ] Professional networking features
- [ ] Mobile app (React Native)

### Phase 3 (Future)
- [ ] AI-powered job matching
- [ ] Visa application assistance
- [ ] Mentorship programs
- [ ] Community features and forums
- [ ] Integration with European job boards

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Guidelines

1. **Code Style**: Follow the existing patterns and use TypeScript
2. **Components**: Create reusable, well-documented components
3. **Testing**: Add tests for new features (when test setup is added)
4. **Accessibility**: Ensure components are accessible
5. **Performance**: Optimize for performance and SEO

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check this README and code comments
- **Issues**: Report bugs on [GitHub Issues](https://github.com/your-username/tunel-app/issues)
- **Discussions**: Join [GitHub Discussions](https://github.com/your-username/tunel-app/discussions)

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/) and [Tailwind CSS](https://tailwindcss.com/)
- Database powered by [Supabase](https://supabase.com/)
- Icons and inspiration from the European tech community
- Special thanks to Turkish developers working abroad for inspiration

---

**Made with ❤️ for the Turkish tech community in Europe**

*Tunel - Your bridge to European opportunities*