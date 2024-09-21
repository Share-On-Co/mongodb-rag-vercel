import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

// POST /api/post

export async function POST(req: Request) {
  const prisma = new PrismaClient()
  
    const { title, content, userId } = await req.json()


  if (!title || !content) {
    return NextResponse.json({ message: 'Title and content are required' }, { status: 400 })
  }

  try {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        },
    })
    if (!user) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }
    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId: userId,
        author: {
            connect: {
                id: userId
            }
        }
      },
    })

    return NextResponse.json(post, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Something went wrong', error }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}