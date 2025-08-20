# Hands of St. Luke Pantry - Volunteer & Food Logistics App

A production-ready volunteer scheduling and food logistics web application built with Next.js 14, designed specifically for older church volunteers with an emphasis on accessibility and simplicity.

## 🎯 Features

> **📋 See [CURRENT_SYSTEMS_ANALYSIS.md](./CURRENT_SYSTEMS_ANALYSIS.md) for detailed context on what St. Luke's currently uses and why we're building this unified platform.**

- **Simple Task Management**: One-tap signup for pick up and delivery tasks
- **Mobile-First Design**: Optimized for phone use with large touch targets
- **Accessibility Focused**: Large text mode, high contrast, and clear navigation
- **Automated Communications**: Weekly tasks email and day-before reminders
- **Comprehensive Reporting**: Track food collected and delivered with export capabilities
- **Role-Based Access**: Admin and volunteer interfaces with appropriate permissions

## 🔄 Brand Update – Hands of St. Luke Pantry

**Updated**: January 2025  
**Previous Name**: House of St Luke / HOSL  
**New Name**: Hands of St. Luke Pantry  
**Parish Reference**: St. Luke Parish, Long Valley, NJ  

### Files Updated
- `lib/org.ts` - New organization configuration
- `app/layout.tsx` - App title and metadata
- `app/page.tsx` - Home page branding and copy
- `components/navigation.tsx` - Navigation branding
- `app/opportunities/page.tsx` - Intro text and terminology
- `components/opportunities-list.tsx` - Task titles and locations
- `components/volunteer-dashboard.tsx` - Dashboard terminology
- `components/admin-tasks-manager.tsx` - Admin interface locations
- `components/admin-reports.tsx` - Reports branding and CSV names
- `scripts/seed.ts` - Demo data with realistic NJ locations
- `components/large-text-toggle.tsx` - Default large text mode on

### Key Changes
- **Terminology**: "pick up" instead of "pickup" (verb usage)
- **Button Text**: Sentence case ("Sign in", "I can take this")
- **Location Names**: Realistic NJ store and organization names
- **Demo Users**: Pete Mahoney (admin), Martha G. and Bill S. (volunteers)
- **Task Schedule**: Tuesday/Thursday mornings (8:30-10:30 AM)
- **Large Text Mode**: Defaults to ON for first-time visitors

### Future Brand Updates
To update organization names in the future, modify `lib/org.ts` and run a find-and-replace for any remaining hardcoded references.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- PostgreSQL database
- Supabase account (for auth and database)
- Resend account (for email)

### 1. Clone and Install

```bash
git clone <repository-url>
cd hosl-volunteer-app
pnpm install
```

### 2. Environment Setup

Copy the environment template and fill in your values:

```bash
cp env.example .env.local
```

Required environment variables:

```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/hosl_volunteer_app"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# Email (Resend)
RESEND_API_KEY="your-resend-api-key"

# App Configuration
TIMEZONE="America/New_York"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Organization Configuration
ORG_DISPLAY_NAME="Hands of St. Luke Pantry"
ORG_PUBLIC_URL="https://stlukelv.org/hands-of-st-luke-pantry"
```

Optional integrations:

```bash
# SMS (Twilio)
ENABLE_TWILIO=true
TWILIO_ACCOUNT_SID="your-twilio-account-sid"
TWILIO_AUTH_TOKEN="your-twilio-auth-token"
TWILIO_FROM_NUMBER="+1234567890"

# HubSpot Integration
HUBSPOT_API_KEY="your-hubspot-api-key"
```

### 3. Database Setup

```bash
# Generate Prisma client
pnpm db:generate

# Push schema to database
pnpm db:push

# Seed with demo data
pnpm db:seed
```

### 4. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 🗄️ Database Schema

The app uses Prisma with PostgreSQL and includes these main entities:

- **Users**: Admin and volunteer accounts with role-based permissions
- **VolunteerProfiles**: Contact info, preferences, and vehicle details
- **Sources**: Food donation locations (stores, warehouses)
- **Recipients**: Food distribution points (pantries, shelters)
- **Tasks**: Pick up and delivery assignments with scheduling
- **Signups**: Volunteer task commitments
- **FoodLogs**: Tracking of food collected and delivered
- **Announcements**: Communication system for volunteers
- **AuditLogs**: Administrative activity tracking

## 🔐 Authentication

The app uses Supabase for authentication with magic link email sign-in. Users are assigned roles (ADMIN or VOLUNTEER) which determine their access levels and interface options.

## 📱 User Flows

### Volunteer Experience
1. **View Opportunities**: Browse available tasks filtered by day, type, and location
2. **Claim Tasks**: One-tap signup for preferred time slots
3. **Manage Profile**: Update contact info, preferences, and availability
4. **Track Impact**: View completed tasks and food delivered

### Admin Experience
1. **Task Management**: Create weekly schedules, duplicate previous weeks
2. **Volunteer Management**: Invite new volunteers, view preferences and activity
3. **Reporting**: Generate monthly totals, source/recipient breakdowns
4. **Communications**: Send announcements and manage automated reminders

## 🎨 UI Components

Built with shadcn/ui components and Tailwind CSS:

- **Accessibility First**: Large text mode, high contrast, focus states
- **Mobile Optimized**: Touch-friendly buttons, responsive layouts
- **Professional Design**: Clean, church-appropriate styling without emojis
- **Consistent Patterns**: Familiar interface elements across all pages

## 📧 Email Automation

The app includes automated email workflows:

- **Weekly Tasks Email**: Sunday 6 AM - Summary of upcoming week's open tasks
- **Day-Before Reminders**: 10 AM - Reminders for claimed tasks
- **Admin Alerts**: Daily 6 PM - Unfilled tasks for next 48 hours

Email templates are built with React Email and sent via Resend.

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

## 🧪 Testing

```bash
# Type checking
pnpm type-check

# Linting
pnpm lint

# Build verification
pnpm build
```

## 📊 Demo Data

The seed script creates:

- **3 Sources**: ShopRite, Stop & Shop, Walmart
- **3 Recipients**: Food Pantry, Homeless Shelter, Senior Center
- **1 Admin User**: admin@hosl.org
- **3 Volunteer Users**: volunteer1@example.com, volunteer2@example.com, volunteer3@example.com
- **2 Weeks of Tasks**: Mix of pickup and delivery assignments
- **Sample Signups and Food Logs**: For testing reporting features

## 🔧 Development

### Project Structure

```
hosl-volunteer-app/
├── app/                    # Next.js App Router pages
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   └── ...               # Custom components
├── lib/                  # Utilities and configurations
├── prisma/               # Database schema and migrations
├── scripts/              # Database seeding and utilities
├── emails/               # React Email templates
└── public/               # Static assets
```

### Key Technologies

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Supabase Auth
- **Email**: Resend with React Email templates
- **State Management**: TanStack Query for server state
- **Validation**: Zod schemas for type safety

## 🚧 Roadmap

### Phase 2 (Next Release)
- [ ] SMS notifications via Twilio
- [ ] PWA manifest for home screen installation
- [ ] Offline task caching
- [ ] Admin printable PDF reports

### Phase 3 (Future)
- [ ] HubSpot contact synchronization
- [ ] SignUpGenius CSV import tool
- [ ] Advanced analytics dashboard
- [ ] Multi-location support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes with accessibility in mind
4. Test on mobile devices
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For technical support or questions about the application:

- Check the [Issues](../../issues) page for known problems
- Review the [Wiki](../../wiki) for detailed documentation
- Contact the development team for urgent issues

---

**Built with ❤️ for Hands of St. Luke Pantry and the volunteer community - Ready for production! 🚀**
