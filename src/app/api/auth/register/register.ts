import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

// GET /api/auth/register
// Required query parameters: name, username, password
// Optional query parameters: profilePic, bio, age, gender, keywords
export async function GET(req: Request) {
  const prisma = new PrismaClient()

  const { searchParams } = new URL(req.url)
  const name = searchParams.get('name')
  const username = searchParams.get('username')
  const password = searchParams.get('password')
  const profilePic = searchParams.get('profilePic')
  const bio = searchParams.get('bio')
  const age = searchParams.get('age')
  const gender = searchParams.get('gender')
  const keywords = searchParams.get('keywords')

  // Validate required query parameters
  if (!name || !username || !password) {
    return NextResponse.json({ message: 'Name, username, and password are required' }, { status: 400 })
  }

  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        username,
        password,
        profilePic: profilePic || null,
        bio: bio || null,
        age: age ? parseInt(age, 10) : null,
        gender: gender || null,
        keywords: keywords ? keywords.split(',') : [],
      },
    })

    return NextResponse.json(newUser, { status: 201 })
  } catch (error: any) {
    if (error.code === 'P2002') { // Unique constraint violation
      return NextResponse.json({ message: 'Username already exists' }, { status: 409 })
    }
    return NextResponse.json({ message: 'Something went wrong', error }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
