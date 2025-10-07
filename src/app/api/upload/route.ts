import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { promises as fs } from 'fs'
import path from 'path'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email || session.user.email !== 'nhungconsultancy@gmail.com') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const formData = await req.formData()
  const file = formData.get('file') as File | null
  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })
  if (file.size > 2 * 1024 * 1024) return NextResponse.json({ error: 'File too large' }, { status: 400 })

  const ext = path.extname(file.name).toLowerCase()
  const allowed = ['.png', '.jpg', '.jpeg', '.svg', '.webp']
  if (!allowed.includes(ext)) return NextResponse.json({ error: 'Unsupported type' }, { status: 400 })

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
  await fs.mkdir(uploadsDir, { recursive: true })
  const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.\-]/g, '_')}`
  const target = path.join(uploadsDir, fileName)
  await fs.writeFile(target, buffer)

  const publicPath = `/uploads/${fileName}`
  return NextResponse.json({ path: publicPath })
}


