import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { ChatOpenAI } from "@langchain/openai";

// GET /api/auth/login
// Required query parameters: username, password
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    let prisma = new PrismaClient();

    const id = searchParams.get('id')

  async function matchApi(id: number) {
    let allUsers = await prisma.user.findMany({
        where: {
            NOT: {
                id: id
            }
        }
    })
    let currentUser = await prisma.user.findUnique({
        where: {
            id: id
        }
    })
    let allUsersInterests = allUsers.map((user) => user.keywords);
    let allUsersIds = allUsers.map((user) => user.id);
    
    const llm = new ChatOpenAI({
        model: "gpt-4o",
        temperature: 0.8,
        streaming: true,
    });

    let message = await llm.invoke(`Find a user with matching interests. Here is the current user's interests: ${currentUser?.keywords.join(', ')}. Here are the ids of all other users: ${allUsersIds} and their interests: ${allUsersInterests.join(', ')}. Respond with ONLY ONE number which would be the user id of the matched user`);
    // Get user's name from id
    let matchedUser = await prisma.user.findUnique({
        where: {
            id: Number(message["content"])
        }
    })
    return matchedUser;
}

  

  if (!id) {
    return NextResponse.json({ message: 'Username and password are required' }, { status: 400 })
  }

  try {
    let user = matchApi(Number(id))
    if (user) {
      return NextResponse.json(user, { status: 200 })
    }
    else {
        return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }
    // something
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Something went wrong', error }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
