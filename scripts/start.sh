#!/bin/bash

# Exit on any error
set -e

echo "🚀 Starting Nhung Consultancy Application..."

# Function to wait for database
wait_for_database() {
    echo "⏳ Waiting for database to be ready..."
    
    # Extract database host and port from DATABASE_URL
    DB_HOST=$(echo $DATABASE_URL | sed -n 's/.*@\([^:]*\):.*/\1/p')
    DB_PORT=$(echo $DATABASE_URL | sed -n 's/.*:\([0-9]*\)\/.*/\1/p')
    
    # Default values if parsing fails
    DB_HOST=${DB_HOST:-postgres}
    DB_PORT=${DB_PORT:-5432}
    
    echo "🔍 Checking database connection at $DB_HOST:$DB_PORT"
    
    # Wait for database to be ready
    until pg_isready -h "$DB_HOST" -p "$DB_PORT" -U postgres; do
        echo "⏳ Database is unavailable - sleeping for 2 seconds..."
        sleep 2
    done
    
    echo "✅ Database is ready!"
}

# Function to run database setup
setup_database() {
    echo "🗄️ Setting up database..."
    
    # Generate Prisma client
    echo "🔧 Generating Prisma client..."
    npx prisma generate
    
    # Run migrations
    echo "📝 Running database migrations..."
    npx prisma migrate deploy
    
    # Check if we need to seed the database
    echo "🔍 Checking if database needs seeding..."
    
    # Try to seed the database (it will handle checking if data exists)
    echo "🌱 Attempting to seed database..."
    if npx ts-node --compiler-options '{"module":"CommonJS"}' prisma/seed.ts; then
        echo "✅ Database seeding completed!"
    else
        echo "ℹ️ Database seeding skipped (may already have data)"
    fi
    
    echo "✅ Database setup complete!"
}

# Function to start the application
start_application() {
    echo "🎯 Starting Next.js application..."
    
    if [ "$NODE_ENV" = "production" ]; then
        echo "🏭 Starting in production mode..."
        npm start
    else
        echo "🛠️ Starting in development mode..."
        # Use the Docker database URL for development
        NEXTAUTH_URL=http://localhost:3000 \
        NEXT_PUBLIC_APP_URL=http://localhost:3000 \
        NEXTAUTH_SECRET=dev-secret-please-change \
        DATABASE_URL=postgresql://postgres:postgres@postgres:5432/nhung?schema=public \
        RESEND_API_KEY=test_dummy \
        EMAIL_FROM='Nhung Consultancy <contact@nhungconsultancy.com>' \
        npx next dev -p 3000
    fi
}

# Main execution
main() {
    echo "📋 Environment: $NODE_ENV"
    echo "🔗 Database URL: ${DATABASE_URL:0:30}..."
    
    # Wait for database
    wait_for_database
    
    # Setup database
    setup_database
    
    # Start application
    start_application
}

# Run main function
main "$@"
