# Database Management Scripts

This directory contains scripts for managing the database in the Docker development environment.

## Scripts

### `start.sh`
The main startup script that runs when the application container starts. It:

- ⏳ Waits for the database to be ready
- 🔧 Generates the Prisma client
- 📝 Runs database migrations
- 🌱 Seeds the database if it's empty
- 🎯 Starts the Next.js application

### `reset-db.sh`
A utility script to completely reset the database. It:

- 🗑️ Drops all database tables
- 📝 Runs all migrations from scratch
- 🌱 Seeds the database with initial data

## Usage

### Automatic Startup
The `start.sh` script runs automatically when you start the Docker containers:

```bash
npm run docker:dev
```

### Manual Database Reset
To reset the database manually:

```bash
# Interactive reset (asks for confirmation)
npm run docker:db:reset

# Force reset (no confirmation)
npm run docker:db:reset:force
```

### Other Database Commands

```bash
# Run migrations only
npm run docker:db:migrate

# Seed database only
npm run docker:db:seed

# Open Prisma Studio
npm run docker:db:studio

# Restart just the app container
npm run docker:restart

# Complete rebuild
npm run docker:rebuild
```

## How It Works

### Startup Process
1. **Database Wait**: Script waits for PostgreSQL to be ready using `pg_isready`
2. **Prisma Generation**: Generates Prisma client with correct binary targets
3. **Migration Check**: Runs `prisma migrate deploy` to apply pending migrations
4. **Seed Check**: Checks if database has users, seeds if empty
5. **App Start**: Starts Next.js in development or production mode

### Database Reset Process
1. **Confirmation**: Asks for user confirmation (unless `--force` is used)
2. **Reset**: Runs `prisma migrate reset --force` to drop all tables
3. **Migration**: Reapplies all migrations
4. **Seed**: Seeds database with initial data

## Environment Variables

The scripts use these environment variables:

- `DATABASE_URL`: PostgreSQL connection string
- `NODE_ENV`: Application environment (development/production)

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL container is running: `docker ps`
- Check database logs: `docker logs nhung-postgres-dev`
- Verify DATABASE_URL is correct

### Migration Issues
- Check if migrations are up to date
- Run manual migration: `npm run docker:db:migrate`
- Reset database if needed: `npm run docker:db:reset`

### Seed Issues
- Check if seed file exists: `ls prisma/seed.ts`
- Run manual seed: `npm run docker:db:seed`
- Check database connection

## Development Workflow

### Starting Fresh
```bash
# Complete reset and start
npm run docker:rebuild
```

### Making Schema Changes
1. Update `prisma/schema.prisma`
2. Create migration: `npx prisma migrate dev --name your-change`
3. Restart containers: `npm run docker:restart`

### Adding Seed Data
1. Update `prisma/seed.ts`
2. Reset database: `npm run docker:db:reset`
3. Or just seed: `npm run docker:db:seed`
