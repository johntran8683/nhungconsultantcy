#!/usr/bin/env node

/**
 * Migration script to move hardcoded projects from portfolio page to database
 * Run this script to populate the database with existing projects
 */

const { PrismaClient } = require('../src/generated/prisma')

const prisma = new PrismaClient()

// Original hardcoded projects from portfolio page
const originalProjects = [
  {
    title: 'Southeast Asia Energy Transition Partnership',
    client: 'UNOPS',
    duration: 'July 2024 - Present',
    overview: 'Lead M&E activities for 50+ energy transition programs across Southeast Asia with $30M+ in funding, ensuring gender-responsive monitoring and data-driven programming.',
    role: [
      'Designed and implemented gender-responsive monitoring frameworks',
      'Led data collection and validation of 50 result-based monitoring frameworks quarterly',
      'Collaborated with multiple stakeholders to strengthen data-driven programming',
      'Produced annual/semiannual reports and data visualization for 12 funders'
    ],
    impact: [
      '100% compliance with donor reporting requirements',
      'Enhanced gender integration across all 50+ programs',
      'Improved data quality and data-driven decision making',
      'Strengthened stakeholder engagement and collaboration'
    ],
    templateId: 'blue-energy',
    statsValue: '$30M+',
    statsLabel: 'Portfolio Value',
    status: 'ongoing',
    progress: 85,
    sortOrder: 1,
    published: true
  },
  {
    title: 'Pacific Private Sector Development Initiative',
    client: 'Asian Development Bank',
    duration: 'August 2024 - Present',
    overview: 'Lead multiple evaluations of women\'s economic empowerment initiatives across 14 Pacific countries for an 18-year, $88M technical assistance program.',
    role: [
      'Developed comprehensive evaluation tools and methodologies',
      'Collected and analyzed data from multiple Pacific countries',
      'Drafted detailed case studies and evaluation reports',
      'Presented findings and recommendations to senior management'
    ],
    impact: [
      'Informed strategic decisions for PSDI Phase V development',
      'Enhanced understanding of women\'s economic empowerment impacts',
      'Strengthened evidence base for future programming',
      'Improved program effectiveness across 14 countries'
    ],
    templateId: 'purple-innovation',
    statsValue: '$88M',
    statsLabel: 'Program Value',
    status: 'ongoing',
    progress: 75,
    sortOrder: 2,
    published: true
  },
  {
    title: 'IFC Gender Strategy Implementation',
    client: 'International Finance Corporation',
    duration: 'July 2018 - June 2024',
    overview: 'Ensure 100% quality compliance with World Bank Group standards across 100-120 gender-flagged advisory projects annually, spanning multiple industries and regions.',
    role: [
      'Advised operational teams on project design and M&E frameworks',
      'Conducted quality assurance reviews of project governance documents',
      'Delivered capacity building training for clients and staff',
      'Managed global data collection platform serving 100+ surveys'
    ],
    impact: [
      '100% quality compliance rate maintained consistently',
      'Enhanced project governance across 30+ gender advisory programs',
      'Improved client satisfaction and program effectiveness',
      'Strengthened IFC\'s gender inclusion capabilities globally'
    ],
    templateId: 'green-sustainability',
    statsValue: '100%',
    statsLabel: 'Compliance Rate',
    status: 'completed',
    progress: null,
    sortOrder: 3,
    published: true
  },
  {
    title: 'Vietnam Development Impact Evaluations',
    client: 'Mekong Development Research Institute',
    duration: 'April 2014 - May 2018',
    overview: 'Lead 6-9 donor-funded impact evaluation projects annually on diverse development topics including poverty reduction, education, agriculture, and gender.',
    role: [
      'Managed 20+ large-scale surveys with sample sizes up to 30,000',
      'Developed technical and financial proposals for competitive bidding',
      'Led impact evaluation projects with budgets up to $2.5M',
      'Managed partnerships with donors, NGOs, and government agencies'
    ],
    impact: [
      'Won 8-10 new projects annually worth over $2M total',
      'Achieved excellent performance ratings from all clients',
      'Enhanced evidence base for development policy in Vietnam',
      'Strengthened local research capacity and partnerships'
    ],
    templateId: 'orange-social',
    statsValue: '30K+',
    statsLabel: 'Survey Sample',
    status: 'completed',
    progress: null,
    sortOrder: 4,
    published: true
  }
]

async function migrateProjects() {
  console.log('🚀 Starting project migration...')
  
  try {
    // Check if projects already exist
    const existingProjects = await prisma.project.count()
    if (existingProjects > 0) {
      console.log(`⚠️  Found ${existingProjects} existing projects in database.`)
      const shouldContinue = process.argv.includes('--force')
      if (!shouldContinue) {
        console.log('❌ Migration aborted. Use --force flag to override existing data.')
        process.exit(1)
      }
      console.log('🔄 Force mode enabled, continuing with migration...')
      
      // Delete existing projects
      await prisma.project.deleteMany()
      console.log('🗑️  Cleared existing projects.')
    }

    // Insert new projects
    console.log('📝 Inserting projects into database...')
    
    for (const project of originalProjects) {
      const created = await prisma.project.create({
        data: project
      })
      console.log(`✅ Created project: "${created.title}"`)
    }

    console.log(`🎉 Migration completed successfully! Created ${originalProjects.length} projects.`)
    
    // Verify the migration
    const finalCount = await prisma.project.count()
    const publishedCount = await prisma.project.count({ where: { published: true } })
    
    console.log('\n📊 Migration Summary:')
    console.log(`   Total projects: ${finalCount}`)
    console.log(`   Published projects: ${publishedCount}`)
    console.log(`   Draft projects: ${finalCount - publishedCount}`)
    
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the migration
migrateProjects()
