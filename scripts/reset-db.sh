#!/bin/bash

# Exit on any error
set -e

echo "🔄 Resetting database..."

# Function to reset database
reset_database() {
    echo "🗑️ Dropping all tables..."
    
    # Reset the database (this will drop all tables and data)
    npx prisma migrate reset --force
    
    echo "✅ Database reset complete!"
    echo "🌱 Database has been reset and seeded with initial data"
}

# Function to show usage
show_usage() {
    echo "Usage: $0 [--force]"
    echo ""
    echo "Options:"
    echo "  --force    Skip confirmation prompt"
    echo ""
    echo "This will:"
    echo "  - Drop all database tables"
    echo "  - Run all migrations"
    echo "  - Seed the database with initial data"
    echo ""
    echo "⚠️  WARNING: This will delete ALL data in the database!"
}

# Main execution
main() {
    # Check if --help is passed
    if [[ "$1" == "--help" || "$1" == "-h" ]]; then
        show_usage
        exit 0
    fi
    
    # Check if --force is passed
    if [[ "$1" != "--force" ]]; then
        echo "⚠️  WARNING: This will delete ALL data in the database!"
        echo ""
        read -p "Are you sure you want to continue? (y/N): " -n 1 -r
        echo ""
        
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            echo "❌ Operation cancelled"
            exit 1
        fi
    fi
    
    # Reset database
    reset_database
}

# Run main function
main "$@"
