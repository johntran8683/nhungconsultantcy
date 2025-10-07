import { PrismaClient } from '../src/generated/prisma'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const email = 'nhungconsultancy@gmail.com'
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    console.log('Admin user already exists')
    return
  }

  const passwordHash = await bcrypt.hash('password123', 12)
  await prisma.user.create({
    data: {
      email,
      passwordHash,
      mustChangePassword: true,
      role: 'admin',
      name: 'Admin',
    },
  })
  console.log('Seeded admin user')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
}).finally(async () => {
  await prisma.$disconnect()
})


