import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

// GET /api/auth/register
// Required query parameters: name, username, password
// Optional query parameters: profilePic, bio, age, gender, keywords
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const prisma = new PrismaClient()

  // Ensure this is a GET request
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { name, username, password, profilePic, bio, age, gender, keywords } = req.query

  // Validate required query parameters
  if (!name || !username || !password) {
    return res.status(400).json({ message: 'Name, username, and password are required' })
  }

  try {
    // Create a new user with the provided data
    const newUser = await prisma.user.create({
      data: {
        name: name as string,
        username: username as string,
        password: password as string,
        profilePic: profilePic ? (profilePic as string) : null,
        bio: bio ? (bio as string) : null,
        age: age ? parseInt(age as string, 10) : null,
        gender: gender ? (gender as string) : null,
        keywords: keywords ? (keywords as string).split(',') : [],
      },
    })

    return res.status(201).json(newUser)
  } catch (error) {
    if (error.code === 'P2002') { // Prisma error code for unique constraint violation
      return res.status(409).json({ message: 'Username already exists' })
    }
    return res.status(500).json({ message: 'Something went wrong', error })
  } finally {
    await prisma.$disconnect()
  }
}
