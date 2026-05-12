# Setup Guide - Backend Engineering Mastery OS

Complete guide to get the platform running on your machine.

## Prerequisites

### Required Software
- **Node.js 18+** - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)

### Optional
- **Docker** - For containerized deployment
- **PostgreSQL** - If you prefer PostgreSQL over SQLite

## Quick Start (Linux/Mac)

```bash
# Run the automated setup script
./setup.sh
```

The script will:
1. Check Node.js version
2. Install dependencies
3. Setup environment variables
4. Initialize database
5. Generate Prisma client

## Manual Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/backend-mastery-os.git
cd backend-mastery-os
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Setup

Create a `.env` file:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# SQLite (default)
DATABASE_URL="file:./dev.db"

# Or PostgreSQL
# DATABASE_URL="postgresql://user:password@localhost:5432/backend_mastery_os"
```

### 4. Database Setup

```bash
# Generate Prisma Client
npx prisma generate

# Create database tables
npx prisma db push

# (Optional) Open Prisma Studio to view data
npx prisma studio
```

### 5. Start Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Docker Setup

### Using Docker Compose

```bash
# Build and start containers
docker-compose up -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down
```

### Manual Docker Build

```bash
# Build image
docker build -t backend-mastery-os .

# Run container
docker run -p 3000:3000 backend-mastery-os
```

## PostgreSQL Setup

If you want to use PostgreSQL instead of SQLite:

### 1. Install PostgreSQL

**Mac (Homebrew):**
```bash
brew install postgresql@15
brew services start postgresql@15
```

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

**Windows:**
Download from [postgresql.org](https://www.postgresql.org/download/windows/)

### 2. Create Database

```bash
# Connect to PostgreSQL
psql postgres

# Create database and user
CREATE DATABASE backend_mastery_os;
CREATE USER backend_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE backend_mastery_os TO backend_user;
\q
```

### 3. Update Prisma Schema

Edit `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

### 4. Update .env

```env
DATABASE_URL="postgresql://backend_user:your_password@localhost:5432/backend_mastery_os"
```

### 5. Push Schema

```bash
npx prisma db push
```

## Troubleshooting

### Port Already in Use

```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>

# Or use different port
PORT=3001 npm run dev
```

### Database Connection Issues

**SQLite:**
- Ensure write permissions in project directory
- Check `prisma/dev.db` exists

**PostgreSQL:**
- Verify PostgreSQL is running: `pg_isready`
- Check connection string in `.env`
- Ensure user has proper permissions

### Prisma Issues

```bash
# Reset Prisma
npx prisma migrate reset

# Regenerate client
npx prisma generate

# Format schema
npx prisma format
```

### Node Module Issues

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Issues

```bash
# Clear Next.js cache
rm -rf .next

# Rebuild
npm run build
```

## Development Tips

### Hot Reload Not Working

Increase file watcher limit (Linux):

```bash
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

### TypeScript Errors

```bash
# Check TypeScript
npx tsc --noEmit

# Fix common issues
npm install --save-dev @types/node @types/react @types/react-dom
```

### Linting

```bash
# Run ESLint
npm run lint

# Fix auto-fixable issues
npm run lint -- --fix
```

## Production Deployment

### Build for Production

```bash
npm run build
npm start
```

### Environment Variables

Set these in production:

```env
NODE_ENV=production
DATABASE_URL="your_production_database_url"
```

### Deployment Platforms

**Vercel (Recommended):**
```bash
npm i -g vercel
vercel
```

**Docker:**
```bash
docker build -t backend-mastery-os .
docker run -p 3000:3000 \
  -e DATABASE_URL="your_database_url" \
  backend-mastery-os
```

**VPS (Ubuntu):**
```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone and setup
git clone your-repo
cd backend-mastery-os
npm install
npm run build

# Use PM2 for process management
npm install -g pm2
pm2 start npm --name "backend-mastery-os" -- start
pm2 save
pm2 startup
```

## Update Instructions

```bash
# Pull latest changes
git pull origin main

# Install new dependencies
npm install

# Update database schema
npx prisma db push

# Rebuild
npm run build
```

## Performance Optimization

### Enable Caching

Add to `next.config.js`:

```javascript
module.exports = {
  compress: true,
  poweredByHeader: false,
}
```

### Database Optimization

```bash
# Add indexes
npx prisma studio

# Analyze query performance
# Use Prisma's query logging
```

## Common Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run linting

# Database
npx prisma studio    # Open database GUI
npx prisma db push   # Push schema changes
npx prisma generate  # Generate client
npx prisma format    # Format schema

# Docker
docker-compose up    # Start containers
docker-compose down  # Stop containers
docker-compose logs  # View logs
```

## Getting Help

- **Documentation:** Check README.md
- **Issues:** [GitHub Issues](https://github.com/yourusername/backend-mastery-os/issues)
- **Discussions:** [GitHub Discussions](https://github.com/yourusername/backend-mastery-os/discussions)

## Next Steps

Once setup is complete:

1. Create your user account
2. Explore the Dashboard
3. Start with DSA Tracker
4. Follow the learning roadmap
5. Build projects
6. Track your progress

Happy learning! 🚀
