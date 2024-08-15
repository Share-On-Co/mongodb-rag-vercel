"use server";

import { PrismaClient } from '@prisma/client'
import { cookies } from 'next/headers'
import { useRouter } from 'next/navigation';
import calculateAge from './calculateAge';

export async function handleRegister(username: string, password: string) {
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
    cookies().set('currentUser', `${user.id}`)
    return user
}

export async function handleLogin(username: string, password: string) {
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

export async function handlefinishProfile(firstName: string, lastName: string, dob: string, gender: string, bio: string, interest: string[], profilePicture: string) {
    //👇 Add your logic here
    const prisma = new PrismaClient()
    const user = await prisma.user.update({
        where: {
            id: Number(cookies().get('currentUser')?.value)
        },
        data: {
            name: `${firstName} ${lastName}`,
            age: calculateAge(dob),
            gender: gender,
            bio: bio,
            keywords: interest,
            profilePic: profilePicture
        }
    })
    return user
}

