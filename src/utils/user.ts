"use server";

import { PrismaClient } from '@prisma/client'
import { cookies } from 'next/headers'
import { useRouter } from 'next/navigation';

export async function handleRegister(username, password) {
    //👇 Add your logic here
    const prisma = new PrismaClient()
    const user = await prisma.user.create({
        data: {
            name: "",
            username: username,
            password: password,
            age: null,
            keywords: []
        }
    })
    return user
}

export async function handleLogin(username, password) {
    //👇 Add your logic here
    const prisma = new PrismaClient()
    const user = await prisma.user.findUnique({
        where: {
            username: username,
            password: password
        }
    })
    if (!user) {
        return null
    }
    cookies().set('currentUser', `${user.id}`)
    return user
}
