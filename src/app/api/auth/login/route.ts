import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

// GET /api/auth/login
// Required query parameters: username, password
export async function GET(req: Request) {
  const prisma = new PrismaClient()
  
  const { searchParams } = new URL(req.url)
  const username = searchParams.get('username')
  const password = searchParams.get('password')

  if (!username || !password) {
    return NextResponse.json({ message: 'Username and password are required' }, { status: 400 })
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
        password,
      },
    })

    if (user) {
      return Response.json(user, { status: 200 })
    } else {
      return Response.json({ message: 'User not found' }, { status: 404 })
    }
  } catch (error) {
    return Response.json({ message: 'Something went wrong', error }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
