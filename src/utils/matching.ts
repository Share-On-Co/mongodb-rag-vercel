"use server"
import { ChatOpenAI } from "@langchain/openai";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";

export default async function matchUser() {
    let prisma = new PrismaClient();
    let allUsers = await prisma.user.findMany({
        where: {
            NOT: {
                id: Number(cookies().get('currentUser')?.value)
            }
        }
    })
    let currentUser = await prisma.user.findUnique({
        where: {
            id: Number(cookies().get('currentUser')?.value)
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
    