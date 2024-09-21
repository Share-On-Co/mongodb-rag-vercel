import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

// POST /api/reply

export async function POST(req: Request) {
  const prisma = new PrismaClient()
  
    const { content, userId, postId } = await req.json()

    if (!content) {
        return NextResponse.json({ message: 'Content is required' }, { status: 400 })
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
        const post = await prisma.post.findUnique({
            where: {
                id: postId
            },
        })
        if (!post) {
            return NextResponse.json({ message: 'Post not found' }, { status: 404 })
        }

        const reply = await prisma.reply.create({
            data: {
                content,
                authorId: userId,
                postId: postId,
                author: {
                    connect: {
                        id: userId
                    }
                },
                post: {
                    connect: {
                        id: postId
                    }
                }
            },
        })
        return NextResponse.json(reply, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: 'Something went wrong', error }, { status: 500 })
    }
    finally {
        await prisma.$disconnect()
    }
}
